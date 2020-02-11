import React, { Component } from "react";
import "./../../Card/Card.css";
import WeatherCard from "./WeatherCard";
import { weatherSearch } from "../../../utils/API";
import moment from "moment";

class WeatherCardContainer extends Component {
  state = {
    response: [],
    submit: "",
    isLoaded: false,
    error: null
  };

  componentDidUpdate() {
    if (this.props.parentState && !this.state.search) {
      const { searchContainInput } = this.props.parentState;
      this.setState({ search: this.props.parentState }, () => {
        this.searchWeather();
      });
    }
  }

  getIndexForWeather = apiResponse => {
    //returns relevant index for appropriate date, which will help identify correct weather info.
    const indicesTarget = [];
    const date = moment(this.props.parentState.date).format("YYYY-MM-DD");
    for (let i = 0; i < apiResponse.length; i++) {
      if (apiResponse[i].dt_txt.includes(date + " 15:00:00"))
        indicesTarget.push(i);
    }
    console.log(date);
    console.log(indicesTarget);
    return indicesTarget;
  };

  searchWeather = search => {
    var call1 = weatherSearch(
      this.state.search.coordLoc.long,
      this.state.search.coordLoc.lat
    );
    call1.then(response => {
      const arrIndices = this.getIndexForWeather(response.data.list);
      if (arrIndices.length === 0) {
        alert("Please enter a date within the next 5 days.");
      } else {
        var weatherInfo = {
          dt_txt: response.data.list[arrIndices[0]].dt_txt,
          description: response.data.list[arrIndices[0]].weather[0].description,
          icon: response.data.list[arrIndices[0]].weather[0].icon,
          temp: Math.round(response.data.list[arrIndices[0]].main.temp),
          speed: response.data.list[arrIndices[0]].wind.speed,
          humidity: response.data.list[arrIndices[0]].main.humidity
        };
        console.log(response);
        this.setState({ response: weatherInfo });
      }
    });
  };

  render() {
    if (this.state.response.length == 0) {
      return (
        <div>
          <div className="col s12 m4 l3">
            <div className="card">
              <div className="card-image">
                <img id="weather-img" alt=""></img>
                <span className="card-title" id="weather-name"></span>
                <a
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  id="more-weather"
                  value="weather"
                >
                  <i className="material-icons">brightness_5</i>
                </a>
              </div>
              <div className="card-content" id="weather-results">
                <p>Weather</p>{" "}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return [
      <div>
        <WeatherCard
          day={this.state.response.dt_txt}
          description={this.state.response.description}
          icon={this.state.response.icon}
          temperature={this.state.response.temp}
          wind={this.state.response.speed}
          humidity={this.state.response.humidity}
        ></WeatherCard>
      </div>
    ];
  }
}

export default WeatherCardContainer;

//        if (this.state.result.length > 0)
//console.log(this.state.result[1].weather[0].description);
