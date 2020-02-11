import React from "react";
import "./../Card.css";

const FlightInfoCardContainer = props => (
  <div className="card">
    <div className="card-image">
      <img id="flight-img" alt=""></img>
      <span className="card-title" id="flight-name"></span>
      <a
        className="btn-floating halfway-fab waves-effect waves-light red"
        id="more-flights"
        value="flights"
      >
        <i className="material-icons">airplanemode_active</i>
      </a>
    </div>
    <div className="card-content" id="flight-results">
      <h5>Flight Information</h5>

      <form id="flightNumber-form">
        <div htmlFor="flight-input">Enter Your Flight Number: </div>
        <br />

        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          id="search"
          placeholder="ie: AA1234"
        />
        <br />
        <br />

        <button
          onClick={props.handleFormSubmit}
          id="select-flight"
          type="button"
          className="btn btn-primary"
        >
          {" "}
          Search
        </button>
      </form>

      <table className="striped">
        <thead>
          <tr>
            <th>Airline Code</th>
            <th>Arrival</th>
            <th>Departure</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{props.airline}</td>
            <td>{props.arrival}</td>
            <td>{props.departure}</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th>Registration</th>
            <th>Status</th>
            <th>Altitude</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{props.registration}</td>
            <td>{props.status}</td>
            <td>{props.altitude}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="card-action">
      <a href="#"></a>
    </div>
  </div>
);

export default FlightInfoCardContainer;
