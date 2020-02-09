import React, { Component } from "react";
import SignUp from "../components/SignUp/signUp";
import SearchContainer from "../components/SearchContainer";
import CardContainer from "../components/Card/YelpCard/cardContainer";
import WeatherCardContainer from "../components/Card/WeatherCard/Weather";
import ModalContainer from "../components/Modal/modalContainer";
import Preloader from "../components/Preloader";
import "./pagecontainer.css";
import MyAccount from "./MyAccount/MyAccount";

class PageContainer extends Component {
  state = {
    // currentPage: "Home",
    airportInfo: "",
    clickedButton: false,
    hasResponse: null
  };

  //Search paramaters were 'lifted up' from  SearchForm component using this callback
  callbackFunction = searchContainInput => {
    //Save the 'lifted' parameters to this component's state.
    this.setState({
      searchLocation: searchContainInput
    });
  };

  //Updates state which tracks whether user has submitted requests.
  handleMadeRequest = clicked => {
    this.setState({ clickedButton: clicked });
  };

  //Update state which tracks whether all responses have been successfully returned.
  //Progress bar will use this state variable.
  handleHasResponse = response => {
    this.setState({ hasResponse: response });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // renderPage = () => {
  //   if (this.state.currentPage === "Home") {
  //     return <div></div>;
  //     // } else if (this.state.currentPage === "Login") {
  //     //   return <Login />;
  //   } else if (this.state.currentPage === "Sign Up") {
  //     return <SignUp />;
  //   } else if (this.state.currentPage === "My Account") {
  //     return <MyAccount />;
  //   }
  // };
  // this.state.searchLocation !== undefined
  render() {
    let transModal = "";
    //Checks whether prop was sent to indicate that the user wanted to login fron signup page.
    if (this.props.location.state !== undefined) {
      transModal = this.props.location.state.fromModal;
    }
    let preloader =
      this.state.clickedButton && !this.state.hasResponse ? <Preloader /> : "";

    return (
      <div>
        {/*
         <NavTabs
              currentPage={this.state.currentPage}
              handlePageChange={this.handlePageChange}
            /> */}

        <SearchContainer
          appcb={this.callbackFunction}
          pageContMadeRequest={this.handleMadeRequest}
        />
        {preloader}
        {transModal === true ? <ModalContainer openModal={transModal} /> : ""}
        <div className="row">
          <WeatherCardContainer parentState={this.state.searchLocation} />
          <CardContainer
            parentState={this.state.searchLocation}
            pageContGotResponse={this.handleHasResponse}
          />
          {/* {this.renderPage()} */}
        </div>
      </div>
    );
  }
}

export default PageContainer;
