import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Modal from "../Modal/modal";
import history from "../../utils/history";

// class component created to handle click event of login form submit. Should redirect to My Account page by the /myaccount route
class ModalContainer extends React.Component {
  //event handler functionn on login, need to add in authentication verification (accept token) in handleLogin (need Dupe, holding for now)

  //Use the handler to always make the background home page
  // handleLogin = event => {
  //   event.preventDefault();
  //   //change background to home page before modal pops up.
  //   console.log("in login event handler");
  //   history.push("/");
  // };

  render() {
    //code to render My Account page using Redirect react router method. Scrapping for now and using history
    // if (this.state.toMyAccount === true) {
    //     console.log("login event updated state");
    // return <Redirect to='/myaccount' />
    // }

    return (
      <div>
        <Modal onSubmit={this.handleLogin} openModal={this.props.openModal} />
      </div>
    );
  }
}
export default ModalContainer;
