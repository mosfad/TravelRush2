import React, { Component, Fragment } from "react";
import FavoritesCard from "../../components/Card/FavoritesCard/FavoritesCard";
import FlightInfoCard from "../../components/Card/FlightInfoCard/FlightInfoCard";
import { currentUser, getFavorites, removeFavorite } from "../../utils/API";
import { Router, Route, Link } from "react-router-dom";
import history from "../../utils/history";
import "./myaccount.css";

class MyAccount extends Component {
  //if stat is user is logged i, user will be able to view the page
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
    this.getCurrentUser();
  }

  getCurrentUser() {
    const authToken = localStorage.getItem("tokenKey");
    currentUser(authToken)
      .then(user => {
        this.setState({ owner: user.data.id }, () => {
          this.getAllFavorites();
        });
      })
      .catch(err => console.log(err));
  }
  getAllFavorites() {
    if (this.state.owner !== "") {
      getFavorites(this.state.owner)
        .then(dbUser => {
          this.setState({
            restaurant: dbUser.data.restaurant,
            coffee: dbUser.data.coffee,
            hotel: dbUser.data.hotel
          });
        })
        .catch(err => console.log(err));
    }
  }

  handleOnDelete = (category, name, location) => {
    //delete favorite from user's account
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
          <div>
            <h5>Favorite Restaurants</h5>
          </div>
        </div>
        <div className="collection">
          {this.state.restaurant.map((restaurants, index) => (
            <FavoritesCard
              key={"rest" + index}
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
          <div>
            <h5>Favorite Coffee</h5>
          </div>
        </div>
        <div className="collection">
          <div className="collection">
            {this.state.coffee.map((coffee, index) => (
              <FavoritesCard
                key={"coffee" + index}
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
          <div>
            <h5>Favorite Hotels</h5>
          </div>
        </div>
        <div className="collection">
          {this.state.hotel.map((hotel, index) => (
            <FavoritesCard
              key={"hotel" + index}
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
