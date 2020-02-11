import React from "react";
import M from "materialize-css";

// This file exports the various inputs and FormBtn components
export function InputFlight(props) {
  return (
    <div>
      <div className="input-field col s6">
        <i className="material-icons prefix">flight_land</i>
        <input
          {...props}
          id="airport"
          type="text"
          className="autocomplete validate"
        ></input>
        <label htmlFor="autocomplete-airport"></label>
      </div>
    </div>
  );
}

export function InputDrive(props) {
  return (
    <div>
      <div className="input-field col s6">
        <i className="material-icons prefix">directions_car</i>
        <input {...props} id="address" type="text" className="validate"></input>
        <label htmlFor="address"></label>
      </div>
    </div>
  );
}

export function InputDate(props) {
  return (
    <div>
      <div className="input-field col s6">
        <i className="material-icons prefix">date_range</i>

        {/* <DatePicker
          label="Basic example"
          value={Date()}

          animateYearScrolling
        /> */}
        <input id="date" {...props} type="text" className="datepicker"></input>
      </div>
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      className="btn waves-effect waves-light"
      type="submit"
      name="action"
    >
      Submit
      <i className="material-icons right">send</i>
    </button>
  );
}
