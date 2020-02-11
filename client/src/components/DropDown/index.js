import React, { Component } from "react";
import SearchForm from "../SearchForm";
import M from "materialize-css";
//import "materialize-css/dist/css/materialize.min.css";

class DropDown extends React.Component {
  state = {
    travelChoice: "0"
  };

  componentDidMount() {
    //Initialize Materialize Dropdown component
    const elems = document.querySelectorAll(".dropdown-trigger");
    const instances = M.Dropdown.init(elems);
  }

  handleDropClick = event => {
    //prevent default behavior
    event.preventDefault();
    const travelMode = event.target.getAttribute("data-value");
    this.setState({ travelChoice: travelMode }, () => {
      //Initialize Materialize Datepicker component
      const elems = document.querySelectorAll(".datepicker");
      const instances = M.Datepicker.init(elems);
    });
  };

  render() {
    return (
      <div>
        <div className="row center">
          {this.state.travelChoice === "0" ? (
            <span>
              <h5 className="center-align">Search By:</h5>
            </span>
          ) : (
            ""
          )}

          <a
            className="dropdown-trigger btn"
            href="#"
            data-target="dropdown1"
            style={{ marginTop: "1rem" }}
          >
            Airport/Address
          </a>

          <ul id="dropdown1" className="dropdown-content">
            <li>
              <a href="#!" data-value="1" onClick={this.handleDropClick}>
                By airport
              </a>
            </li>
            <li className="divider" tabIndex="-1"></li>
            <li>
              <a href="#!" data-value="2" onClick={this.handleDropClick}>
                By address
              </a>
            </li>
          </ul>
        </div>
        {this.state.travelChoice === "0" ? (
          ""
        ) : (
          <SearchForm
            travelMode={this.state.travelChoice}
            dropcb={this.props.searchContaincb}
            dropMadeRequest={this.props.searchContMadeRequest}
          />
        )}
      </div>
    );
  }
}

export default DropDown;
