import React, { Component } from "react";
import "./../../Card/Card.css";
import FlightInfoCardContainer from "../FlightInfoCard/FlightInfoCardContainer";
import API from "../../../utils/API";

class FlightInfoCard extends Component {
  state = {
    result: {},
    search: "",
    isLoaded: false,
    airlineIataCode: "",
    arrivalIataCode: "",
    departureIataCode: "",
    aircraftRegNumber: "",
    status: "",
    geographyAltitude: ""
  };

  componentDidMount() {
    this.searchFlight();
  }

  searchFlight = query => {
    API.search(query)
      .then(res => {
        this.setState({
          result: res.data,
          isLoaded: true,
          airlineIataCode: res.data[0].airline.iataCode,
          arrivalIataCode: res.data[0].arrival.iataCode,
          departureIataCode: res.data[0].departure.iataCode,
          aircraftRegNumber: res.data[0].aircraft.regNumber,
          status: res.data[0].status,
          geographyAltitude: res.data[0].geography.altitude
        });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      isLoaded: true
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchFlight(this.state.search);
  };

  render() {
    return (
      <FlightInfoCardContainer
        airline={this.state.airlineIataCode}
        arrival={this.state.arrivalIataCode}
        departure={this.state.departureIataCode}
        registration={this.state.aircraftRegNumber}
        status={this.state.status}
        altitude={this.state.geographyAltitude}
        value={this.state.search}
        handleInputChange={this.handleInputChange}
        handleFormSubmit={this.handleFormSubmit}
      ></FlightInfoCardContainer>
    );
  }
}

export default FlightInfoCard;
