//Card component to hold weather

import React from "react";
import "./../Card.css";
import moment from "moment";

//import MaterialTable from "material-table";

const WeatherCard = props => {
  return (
    <div className="col s12 m4 l3">
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

        <div className="card-content" id="weather-border">
          <h5>
            Weather
            <br />
          </h5>
        </div>
        <div className="divider"></div>
        <div className="card-content" id="weather-results">
          {/* <div id="weather-border">
            <h5>
              Weather
              <br />
            </h5>
          </div> */}

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
                    src={
                      "http://openweathermap.org/img/w/" + props.icon + ".png"
                    }
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
    </div>
  );
};

export default WeatherCard;
