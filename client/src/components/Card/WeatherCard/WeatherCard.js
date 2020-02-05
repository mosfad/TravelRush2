//Card component to hold weather

import React from "react";
import "./../Card.css";
import moment from "moment";

//import MaterialTable from "material-table";

const WeatherCard = props => {
  console.log(props.day);
  console.log(moment(props.day).format());
  return (
    <div className="card">
      <div className="card-image">
        <img id="weather-img" src={props.img} alt=""></img>
        <span className="card-title" id="weather-name"></span>
        <a
          className="btn-floating halfway-fab waves-effect waves-light red"
          id="more-weather"
          value="weather"
        >
          <i className="material-icons">brightness_5</i>
        </a>
      </div>
      <div className="card-content" id="weather-results">
        <p>
          Weather <br />
        </p>
        <br />
        <p id="weather-day">{moment(props.day).format("MMM DD")}</p>
        <table className="striped">
          <thead>
            <tr>
              <th>TIME</th>
              <th>DESCRIPTION</th>
              <th>TEMP</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {moment(props.day).format("ddd h A")}{" "}
                <img
                  src={"http://openweathermap.org/img/w/" + props.icon + ".png"}
                />
              </td>
              <td>{props.description} </td>
              <td>{props.temperature}F</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>WIND</th>
              <th>HUMIDITY</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{props.wind} mph</td>
              <td>{props.humidity}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-action">
        <a href="#"></a>
      </div>
    </div>
  );
};

export default WeatherCard;
