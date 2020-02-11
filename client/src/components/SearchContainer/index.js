import React, { Component } from "react";
import SearchForm from "../SearchForm";
import DropDown from "../DropDown";
import AutocompleteFlight from "../AutocompleteFlight";

class SearchContainer extends Component {
  state = {
    travelChoice: "0",
    airport: "",
    address: "",
    date: "",
    coordLoc: { long: 0, lat: 0 }
  };

  handleOnchange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value }).catch(err => console.log("error"));
  };

  render() {
    return (
      <div>
        <DropDown
          searchContaincb={this.props.appcb}
          searchContMadeRequest={this.props.pageContMadeRequest}
        ></DropDown>
      </div>
    );
  }
}

export default SearchContainer;
