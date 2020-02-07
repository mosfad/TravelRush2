import React, { Component } from "react";
// import Home from ""
// import LogIn from ""
import SignUp from "../components/SignUp/signUp";
import SearchContainer from "../components/SearchContainer";
import CardContainer from "../components/Card/YelpCard/cardContainer";
import WeatherCardContainer from "../components/Card/WeatherCard/Weather";
import ModalContainer from "../components/Modal/modalContainer";

import MyAccount from "./MyAccount/MyAccount";

class PageContainer extends Component {
  state = {
    currentPage: "Home",
    airportInfo: "",
    clickedButton: false,
    hasResponse: null
    /*searchParams: {}*/
  };
  //HOW DO I STOP THE PRELOADER????............................................

  // componentDidUpdate() {
  //   this.setState(state => {
  //     return { clickedButton: !state.clickedButton };
  //   });
  // }

  callbackFunction = searchContainInput => {
    console.log(searchContainInput.coordLoc.lat + "= Lat");
    console.log(searchContainInput.coordLoc.long + "= Long");
    //this.componentDidMount(searchContainInput);
    this.setState({
      searchLocation: searchContainInput
    });
  };

  handleMadeRequest = clicked => {
    this.setState({ clickedButton: clicked });
  };

  handleHasResponse = response => {
    this.setState({ hasResponse: response });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <div></div>;
      // } else if (this.state.currentPage === "Login") {
      //   return <Login />;
    } else if (this.state.currentPage === "Sign Up") {
      return <SignUp />;
    } else if (this.state.currentPage === "My Account") {
      return <MyAccount />;
    }
  };
  // this.state.searchLocation !== undefined
  render() {
    let transModal = "";
    if (this.props.location.state !== undefined) {
      transModal = this.props.location.state.fromModal;
    }
    console.log("Airport info in PageContainer is " + this.state.airportInfo);
    console.log(this.state.clickedButton + "(was button clicked?)");
    console.log(this.state.hasResponse + "(was response returned?)");
    let preloader =
      this.state.clickedButton && !this.state.hasResponse ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        ""
      );

    return (
      <div>
        {/* <NavTabs
              currentPage={this.state.currentPage}
              handlePageChange={this.handlePageChange}
            /> */}

        <SearchContainer
          appcb={this.callbackFunction}
          pageContMadeRequest={this.handleMadeRequest}
        />
        {transModal === true ? <ModalContainer openModal={transModal} /> : ""}
        <div className="row">
          <WeatherCardContainer parentState={this.state.searchLocation} />
          <CardContainer
            parentState={this.state.searchLocation}
            pageContGotResponse={this.handleHasResponse}
          />
          {this.renderPage()}
        </div>
        {preloader}
      </div>
    );
  }
}

export default PageContainer;
