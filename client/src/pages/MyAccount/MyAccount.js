import React, { Component, Fragment } from "react";
import FavoritesCard from "../../components/Card/FavoritesCard/FavoritesCard";
import FlightInfoCard from "../../components/Card/FlightInfoCard/FlightInfoCard";
import { currentUser, getFavorites, removeFavorite } from "../../utils/API";

class MyAccount extends Component {
  //if stat is user is logged in, user will be able to view the page
  // ELSE
  //user will be redirected to LOGIN
  state = {
    restaurant: [],
    coffee: [],
    hotel: [],
    owner: ""
  };

  componentDidMount() {
    //Make request to get id of current user
    // const { id } = this.getCurrentUser();
    // this.setState({ owner: id }, () => console.log(this.state));
    this.getCurrentUser();
  }

  // componentDidUpdate() {
  //   this.getCurrentUser();
  // }
  // setStateHelper(dbUser) {
  //   console.log("The restaurant array is : ");
  //   console.log(dbUser);
  //   this.setState(
  //     {
  //       restaurant: dbUser.data.restaurant,
  //       coffee: dbUser.data.coffee,
  //       hotel: dbUser.data.hotel
  //     },
  //     () => console.log(this.state)
  //   );
  //    //this.setState({ coffee: user.coffee }, () => console.log(this.state));
  //    //this.setState({ hotel: user.hotel }, () => console.log(this.state));
  // }

  getCurrentUser() {
    const authToken = localStorage.getItem("tokenKey");
    console.log(authToken);
    currentUser(authToken)
      .then(user => {
        //console.log(user)
        this.setState({ owner: user.data.id }, () => {
          console.log(this.state);
          this.getAllFavorites();
        });
      })
      .catch(err => console.log(err));
  }
  getAllFavorites() {
    if (this.state.owner !== "") {
      getFavorites(this.state.owner)
        .then(dbUser => {
          console.log("The restaurant array is : ");
          console.log(dbUser);
          this.setState(
            {
              restaurant: dbUser.data.restaurant,
              coffee: dbUser.data.coffee,
              hotel: dbUser.data.hotel
            },
            () => console.log(this.state)
          );
        })
        .catch(err => console.log(err));
    }
  }

  handleOnDelete = (category, name, location) => {
    //delete favorite from user's account
    console.log("I am inside ondlelete function");
    //console.log(this.e.target);
    console.log(category);
    console.log(name);
    console.log(location);
    console.log(this.state);
    if (this.state.owner !== "") {
      removeFavorite({
        owner: this.state.owner,
        category: category,
        name: name,
        location: location
      })
        .then(dbUser => {
          this.getCurrentUser();
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    return [
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>My Account</h3>
        </div>
      </div>,
      <div className="card">
        <div className="card-content">
          <p>
            <h5>Favorite Restaurants</h5>
          </p>
        </div>
        <div className="collection">
          {this.state.restaurant.map((restaurants, index) => (
            <FavoritesCard
              category="restaurant"
              name={restaurants.name}
              location={restaurants.location}
              onClickDelete={this.handleOnDelete}
            />
          ))}
        </div>
      </div>,
      <div className="card">
        <div className="card-content">
          <p>
            <h5>Favorite Coffee</h5>
          </p>
        </div>
        <div className="collection">
          <div className="collection">
            {this.state.coffee.map((coffee, index) => (
              <FavoritesCard
                category="coffee"
                name={coffee.name}
                location={coffee.location}
                onClickDelete={this.handleOnDelete}
              />
            ))}
          </div>
        </div>
      </div>,

      <div className="card">
        <div className="card-content">
          <p>
            <h5>Favorite Hotels</h5>
          </p>
        </div>
        <div className="collection">
          {this.state.hotel.map((hotel, index) => (
            <FavoritesCard
              category="hotel"
              name={hotel.name}
              location={hotel.location}
              onClickDelete={this.handleOnDelete}
            />
          ))}
        </div>
      </div>,
      <div>
        <FlightInfoCard></FlightInfoCard>
      </div>
    ];
  }
}

export default MyAccount;
