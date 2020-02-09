//container to render the first Card component once the api call is made to display the 0 index card
//container needs to be loaded on searchForm click event - need to pull latitude and longitude from searchForm
import React, { Component } from "react";
import Card from "./Card";
import EmptyCard from "./emptyCard";
import CollectionCard from "./collectionCard";
import { yelpSearch, addFavorite, currentUser } from "../../../utils/API";

class CardContainer extends Component {
  state = {
    response1: {},
    response2: {},
    response3: {},
    responsedetail1: [],
    responsedetail2: [],
    responsedetail3: [],
    collectionClicked: false,
    owner: "",
    city: "",
    statecode: "",
    responseStatus: { restaurant: false, coffee: false, hotel: false }
  };

  componentDidMount() {
    //Get the current user's info as soon as this component mounts,
    //so that the auth user can bookmark a search result.
    this.getCurrentUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.parentState && !this.state.search) {
      const { searchContainInput } = this.props.parentState;
      this.setState({ search: this.props.parentState }, () => {
        this.searchYelp();
      });
    }
    //Toggles flag which indicates the responses are complete via the progress bar in PageContainer.
    if (
      prevState &&
      (prevState.responseStatus.restaurant !==
        this.state.responseStatus.restaurant ||
        prevState.responseStatus.coffee !== this.state.responseStatus.coffee ||
        prevState.responseStatus.hotel !== this.state.responseStatus.hotel)
    ) {
      if (
        this.state.responseStatus.restaurant &&
        this.state.responseStatus.coffee &&
        this.state.responseStatus.hotel
      ) {
        this.props.pageContGotResponse(true);
      } else {
        this.props.pageContGotResponse(false);
      }
    }
  }

  //Uses Yelp API and search info to retreive search results.
  searchYelp = search => {
    var call1 = yelpSearch(
      "hotels",
      this.state.search.coordLoc.long,
      this.state.search.coordLoc.lat
    );
    var call2 = yelpSearch(
      "restaurants",
      this.state.search.coordLoc.long,
      this.state.search.coordLoc.lat
    );
    var call3 = yelpSearch(
      "coffee",
      this.state.search.coordLoc.long,
      this.state.search.coordLoc.lat
    );

    call3.then(response3 => {
      var coffeeInfo = {
        name: response3.data.businesses[0].name,
        image: response3.data.businesses[0].image_url,
        url: response3.data.businesses[0].url,
        price: response3.data.businesses[0].price,
        rating: response3.data.businesses[0].rating,
        title: response3.data.businesses[0].categories[0].title
      };
      this.setState({
        response3: coffeeInfo,
        responsedetail3: response3.data.businesses,
        responseStatus: { ...this.state.responseStatus, coffee: true }
      });
    });

    call1.then(response1 => {
      var hotelsInfo = {
        name: response1.data.businesses[0].name,
        image: response1.data.businesses[0].image_url,
        url: response1.data.businesses[0].url,
        price: response1.data.businesses[0].price,
        rating: response1.data.businesses[0].rating,
        title: response1.data.businesses[0].categories[0].title
      };
      this.setState({
        response1: hotelsInfo,
        responsedetail1: response1.data.businesses,
        city: response1.data.businesses[0].location.city,
        statecode: response1.data.businesses[0].location.state,
        responseStatus: { ...this.state.responseStatus, hotel: true }
      });
    });

    call2.then(response2 => {
      var restaurantsInfo = {
        name: response2.data.businesses[0].name,
        image: response2.data.businesses[0].image_url,
        url: response2.data.businesses[0].url,
        price: response2.data.businesses[0].price,
        rating: response2.data.businesses[0].rating,
        title: response2.data.businesses[0].categories[0].title
      };
      this.setState({
        response2: restaurantsInfo,
        responsedetail2: response2.data.businesses,
        responseStatus: { ...this.state.responseStatus, restaurant: true }
      });
    });
  };

  //Tracks whether user has selected card details for one of the categories.
  handleCollection = event => {
    event.preventDefault();
    this.setState({ collectionClicked: true });
  };

  //Retrieves and stores auth user's info for future API requests.
  getCurrentUser() {
    const authToken = localStorage.getItem("tokenKey");

    if (authToken !== undefined || authToken !== "") {
      currentUser(authToken)
        .then(user => {
          this.setState({ owner: user.data.id });
        })
        .catch(err => {
          this.setState({ owner: "" });
        });
    }
  }

  //Use API to bookmark an auth user's search results.
  addToFaves = (
    favCategory,
    favName,
    favUrl,
    favPrice,
    favDist,
    favLocation
  ) => {
    //event.preventDefault();

    if (typeof Storage !== "undefined") {
      //Add favorites for logged in user
      if (localStorage.getItem("tokenKey") && this.state.owner !== "") {
        addFavorite({
          owner: this.state.owner,
          category: favCategory,
          name: favName,
          url: favUrl,
          price: favPrice,
          distance: favDist,
          location: favLocation
        });
        //
      } else {
        //Alert user is not logged in
        alert("Please login to bookmark search results.");
      }
    } else {
      // Sorry! No Web Storage support..
      alert("Sorry your browser does not have Web Storage support..");
    }

    //alert("Please login to save items to your Favorites");
    //if logged in then add new fave
    //testing if I can extract the collection data clicked before making a request......
    console.log(`${favCategory} is business selected.`);
    console.log(`${favName} is business selected.`);
    console.log(`${favUrl} is business selected.`);
    console.log(`${favPrice} is business selected.`);
    console.log(`${favDist} is business selected.`);
  };

  updateCard = () => {
    if (!this.state.search) {
      return [
        <EmptyCard
          key="empty-rest"
          name="Restaurants"
          img="restaurant-img"
          cardTitle="restaurant-name"
          value="restaurants"
          btnName="restaurant"
          contentID="restaurant-info"
          title="restaurant-title"
          rating="restaurant-rating"
          price="restaurant-price"
          url="restaurant-url"
        ></EmptyCard>,
        <EmptyCard
          key="empty-coffee"
          name="Coffee"
          img="coffee-img"
          cardTitle="coffee-name"
          value="coffee"
          btnName="free_breakfast"
          contentID="coffee-info"
          title="coffee-title"
          rating="coffee-rating"
          price="coffee-price"
          url="coffee-url"
        ></EmptyCard>,
        <EmptyCard
          key="empty-hotel"
          name="Hotels"
          img="hotel-img"
          cardTitle="hotel-name"
          value="hotels"
          btnName="hotel"
          contentID="hotel-info"
          title="hotel-title"
          rating="hotel-rating"
          price="hotel-price"
          url="hotel-url"
        ></EmptyCard>
      ];
    } else if (this.state.collectionClicked === true) {
      return [
        [
          <div className="card">
            <div className="collection">
              {this.state.responsedetail2.map((businesses, index) => (
                <CollectionCard
                  key={index}
                  urlplaceholder={businesses.url}
                  name={businesses.name}
                  price={businesses.price}
                  distance={
                    Math.round(businesses.distance * 0.000621371192 * 10) / 10
                  }
                  onClick={() => {
                    let businessesDistance =
                      Math.round(businesses.distance * 0.000621371192 * 10) /
                      10;
                    this.addToFaves(
                      "restaurant",
                      businesses.name,
                      businesses.url,
                      businesses.price,
                      businessesDistance,
                      this.state.city + ", " + this.state.statecode
                    );
                  }}
                ></CollectionCard>
              ))}
            </div>
          </div>,

          <div className="card">
            <div className="collection">
              {this.state.responsedetail3.map((businesses, index) => (
                <CollectionCard
                  key={index}
                  urlplaceholder={businesses.url}
                  name={businesses.name}
                  price={businesses.price}
                  distance={
                    Math.round(businesses.distance * 0.000621371192 * 10) / 10
                  }
                  onClick={() => {
                    let businessesDistance =
                      Math.round(businesses.distance * 0.000621371192 * 10) /
                      10;
                    this.addToFaves(
                      "coffee",
                      businesses.name,
                      businesses.url,
                      businesses.price,
                      businessesDistance,
                      this.state.city + ", " + this.state.statecode
                    );
                  }}
                ></CollectionCard>
              ))}
            </div>
          </div>,

          <div className="card">
            <div className="collection">
              {this.state.responsedetail1.map((businesses, index) => (
                <CollectionCard
                  key={index}
                  urlplaceholder={businesses.url}
                  name={businesses.name}
                  price={businesses.price}
                  distance={
                    Math.round(businesses.distance * 0.000621371192 * 10) / 10
                  }
                  onClick={() => {
                    let businessesDistance =
                      Math.round(businesses.distance * 0.000621371192 * 10) /
                      10;
                    this.addToFaves(
                      "hotel",
                      businesses.name,
                      businesses.url,
                      businesses.price,
                      businessesDistance,
                      this.state.city + ", " + this.state.statecode
                    );
                  }}
                ></CollectionCard>
              ))}
            </div>
          </div>
        ]
      ];
    } else {
      return [
        <Card
          name={this.state.response2.title}
          img="restaurant-img"
          imgsrc={this.state.response2.image}
          cardTitle="restaurant-name"
          nameEntry={this.state.response2.name}
          value="restaurants"
          btnName="restaurant"
          contentID="restaurant-info"
          title="restaurant-title"
          rating="restaurant-rating"
          ratingEntry={this.state.response2.rating}
          price="restaurant-price"
          priceEntry={this.state.response2.price}
          url="restaurant-url"
          urlEntry={this.state.response2.url}
          onClick={this.handleCollection}
        ></Card>,

        <Card
          name={this.state.response3.title}
          img="coffee-img"
          imgsrc={this.state.response3.image}
          cardTitle="coffee-name"
          nameEntry={this.state.response3.name}
          value="coffee"
          btnName="free_breakfast"
          contentID="coffee-info"
          title="coffee-title"
          rating="coffee-rating"
          ratingEntry={this.state.response3.rating}
          price="coffee-price"
          priceEntry={this.state.response3.price}
          url="coffee-url"
          urlEntry={this.state.response3.url}
          onClick={this.handleCollection}
        ></Card>,

        <Card
          name={this.state.response1.title}
          img="hotel-img"
          imgsrc={this.state.response1.image}
          cardTitle="hotel-name"
          nameEntry={this.state.response1.name}
          value="hotels"
          btnName="hotel"
          contentID="hotel-info"
          title="hotel-title"
          rating="hotel-rating"
          ratingEntry={this.state.response1.rating}
          price="hotel-price"
          priceEntry={this.state.response1.price}
          url="hotel-url"
          urlEntry={this.state.response1.url}
          onClick={this.handleCollection}
        ></Card>
      ];
    }
  };

  render() {
    return <div>{this.updateCard()}</div>;
  }
}
export default CardContainer;
