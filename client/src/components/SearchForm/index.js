import React, { Component } from "react";
import { InputFlight, InputDrive, InputDate, FormBtn } from "../Form";
import DropDown from "../DropDown";
import { airportFinderSearch, googleSearch } from "../../utils/API.js";
import InputAutoFlight from "../InputAutoFlight";
import AutocompleteFlight from "../AutocompleteFlight";
import "./searchform.css";

class SearchForm extends Component {
  state = {
    airport: "",
    address: "",
    date: "",
    coordLoc: { long: 0, lat: 0 },
    airportList: [],
    requestMade: false
  };

  componentDidMount() {
    const datePicker = document.getElementById("date");
    //handle change for the date
    datePicker.addEventListener("change", () => {
      this.setState({ date: datePicker.value });
    });
  }

  handleOnClick = event => {
    //prevent default behavior
    const airport = this.state.airport;
    const address = this.state.address;
    const date = this.state.date;
    const travelMode = this.props.travelMode;
    event.preventDefault();
    if (travelMode !== "0" && date !== "") {
      if (travelMode === "1" && airport !== "") {
        //airport
        this.getCoordinates("airport");
        this.props.dropMadeRequest(true);
      } else if (travelMode === "2" && address !== "") {
        //address
        this.getCoordinates("address");
        this.props.dropMadeRequest(true);
      } else {
        alert("Please enter both your destination and travel date!");
      }
    } else {
      if (travelMode === "0" || date === "") {
        alert("Please enter both your destination and travel date!");
      } else {
        alert("Please enter both your destination and travel date!.");
      }
    }
  };
  //handles address input by extracting and updating its coordinates
  handleOnBlur = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  };

  handleOnChange = event => {};

  //Handles the date input
  handleDateChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value }, () => {});
  };

  //Helper function to get the coordinates for an address or airport.
  getCoordinates = (transportMode, cb) => {
    let formattedAddress;
    if (transportMode === "airport") {
      formattedAddress = this.state.airport.replace(" ", "+");
    } else {
      formattedAddress = this.state.address.replace(" ", "+");
    }

    googleSearch(formattedAddress)
      .then(response => {
        let coordLat = response.data.results[0].geometry.location.lat;
        let coordLong = response.data.results[0].geometry.location.lng;
        this.setState({ coordLoc: { long: coordLong, lat: coordLat } }, () => {
          this.props.dropcb(this.state);
        });
      })
      .catch(err => console.log(err));
  };

  //Call back function passes airport input from the Autocomplete component(child to parent data flow).
  callbackFunction = autocompleteInput => {
    this.setState({ airport: autocompleteInput });
  };

  render() {
    return (
      <div>
        <form>
          <div className="row">
            {this.props.travelMode === "1" ? (
              <div className="col s6">
                <AutocompleteFlight
                  searchFormcb={this.callbackFunction}
                ></AutocompleteFlight>
              </div>
            ) : (
              <InputDrive
                address={this.state.address}
                onBlur={this.handleOnBlur}
                name="address"
              ></InputDrive>
            )}
            <InputDate
              date={this.state.date}
              value={this.state.date}
              onChange={this.handleDateChange}
              name="date"
            ></InputDate>
          </div>
          <div className="row">
            <div className="col s12" style={{ textAlign: "center" }}>
              <FormBtn onClick={this.handleOnClick}></FormBtn>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
