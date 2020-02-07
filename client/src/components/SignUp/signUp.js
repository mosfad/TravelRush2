// The state of the app is changed when the user clicks prompt
// User is redirected to sign-in page
// if login modal is scrapped, we will likely have another state change for the login page too
import React, { Component } from "react";
import Logo from "../assets/images/teeny_logo.png";
// import { BrowserRouter } from "react-router-dom";
import { Router, Route, Link } from "react-router-dom";
import "./signUp.css";
import { registerUser } from "../../utils/API";
import classnames from "classnames";
import ModalContainer from "../Modal/modalContainer";
import Modal from "../Modal/modal";
import PageContainer from "../../pages/PageContainer";

//Make this a stateful component because it is a form?
class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    isValid: {},
    errors: {}
  };

  componentDidMount() {}

  handleOnChange = event => {
    const {
      target: { name, value }
    } = event;
    //console.log("I am inside onchange event");
    //console.log(name);
    //console.log(value);
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.addUser(this.state);
  };

  //Helper function to register new user
  addUser = userInput => {
    registerUser(userInput)
      .then(response => {
        //If email already exist, set state errors object
        if (response.data.email === "Email already exists") {
          //set the state for the isValid property
          this.setState({ errors: response.data }, () => {
            //console.log(this.state);
          });
        } else {
          //set the state for the isValid property
          this.setState({ isValid: response.data }, () => {
            //console.log(this.state.isValid.msg);
            this.props.history.push("/myaccount");
          });
        }
      })
      .catch(err => {
        this.setState({ errors: err.response.data }, () => {});
      });
  };

  render() {
    const { errors } = this.state;
    const { isValid } = this.state;

    return (
      <div className="container">
        <img
          src={Logo}
          className="responsive-img"
          alt="Logo"
          style={{ maxWidth: "200px" }}
        />
        <h2 id="transition-modal-title">Create User Account</h2>
        <p id="transition-modal-description">
          Please create account credentials below.
        </p>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-user" />
              </span>
            </div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              onChange={this.handleOnChange}
              className={classnames("form-control input_user", {
                validate: errors.name
              })}
              id="nameInput"
              placeholder="Name"
            />
            {errors.name && !isValid.Success && (
              <span className="helper-text red-text" data-error={errors.name}>
                {errors.name}
              </span>
            )}
          </div>

          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              type="text"
              name="email"
              onChange={this.handleOnChange}
              className={classnames("form-control input_user", {
                validate: errors.email
              })}
              id="emailInput"
              placeholder="Email address"
            />
            {errors.email && !isValid.Success && (
              <span className="helper-text red-text" data-error={errors.email}>
                {errors.email}
              </span>
            )}
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              type="password"
              name="password"
              onChange={this.handleOnChange}
              className={classnames("form-control input_user", {
                validate: errors.password
              })}
              id="passwordInput"
              placeholder="Password"
            />
            {errors.password && !isValid.Success && (
              <span
                className="helper-text red-text"
                data-error={errors.password}
              >
                {errors.password}
              </span>
            )}
          </div>

          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              type="password"
              name="password2"
              onChange={this.handleOnChange}
              className={classnames("form-control input_user", {
                validate: errors.password2
              })}
              id="passwordInput"
              placeholder="Confirm password"
            />
            {errors.password2 && !isValid.Success && (
              <span
                className="helper-text red-text"
                data-error={errors.password2}
              >
                {errors.password2}
              </span>
            )}
          </div>

          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <label htmlFor="textarea1">Address</label>
            <textarea
              id="textarea1"
              name="address"
              onChange={this.handleOnChange}
              className={classnames("materialize-textarea", {
                validate: errors.address
              })}
              placeholder="Enter your address"
            ></textarea>
            {errors.address && !isValid.Success && (
              <span
                className="helper-text red-text"
                data-error={errors.address}
              >
                {errors.address}
              </span>
            )}
          </div>

          <button
            type="button"
            name="button"
            id="loginButton"
            className="btn submit_btn"
            onClick={this.handleFormSubmit}
          >
            Submit
          </button>
        </form>

        <div className="d-flex justify-content-center links">
          Already have an account?{" "}
          {/* <Link to="/login">
            Login here!
            {isValid.Success && <h5 className="black-text">{isValid.msg}</h5>}
          </Link> */}
          <br />
          <Link
            to={{
              pathname: "/",
              state: {
                fromModal: true
              }
            }}
          >
            LOGIN HERE
          </Link>
          {/*<ModalContainer />*/}
          <div className="d-flex justify-content-center links"></div>
          {/*<Route exact path="/login" component={TransitionsModal} />*/}
        </div>
      </div>
    );
  }
}

export default Signup;
