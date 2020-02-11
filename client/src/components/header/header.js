import React, { Component } from "react";
import Logo from "../assets/images/teeny_logo.png";
//import Modal from "../Modal/modal";
import ModalContainer from "../Modal/modalContainer";
import NewSearchLink from "../NewSearch";
import Logout from "../Logout";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "./header.css";
import Account from "../Account";

//I am using materialize to create the hamburger icons. I also need to use media queries to fix logo and font sizes?
class Header extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
  }
  //Add the jsx for the sidenav last...
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              <img
                src={Logo}
                className="responsive-img"
                alt="A tiny blue suitcase with a sock and heart boxers bursting out represents the logo of travelRush"
                style={{ maxWidth: "150px" }}
              />
            </Link>
            <Link to="/" className="brand-logo center">
              travelRush
            </Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/">
                  <NewSearchLink />
                </Link>
              </li>
              <li>
                <Link to="/myaccount">
                  <Account />
                </Link>
              </li>

              <li>
                <Link to="">
                  <ModalContainer />{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Logout />
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/">
              <NewSearchLink />
            </Link>
          </li>
          <li>
            <Link to="/myaccount">
              <Account />
            </Link>
          </li>

          <li>
            <Link to="">
              <ModalContainer />{" "}
            </Link>
          </li>
          <li>
            <Link to="/">
              <Logout />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
