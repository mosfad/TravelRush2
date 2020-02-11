//adding API queries for app here
import axios from "axios";

//URL and API key for google API
const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const googleKEY = "AIzaSyAur7oZgFWLDt_n5NWMl4dMjRDiqiirq-Q";

//google api query export
export const googleSearch = formattedAddress => {
  return axios.get(googleURL + formattedAddress + "&key=" + googleKEY);
};

//URL and API key for airportFinder API
const airportFinderURL =
  "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=50&lng=";
const config = {
  headers: {
    "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "f60e32620bmsh0545e1c4b416f30p1425cdjsn99e5174ad055"
  }
};

//airportFinder api query export
//note to Dupe - had to change the placeholders for longitude and latitude from coordLoc.long and coordLoc.lat to just long and lat, so coordLoc.long and coordLoc.lat will have to have to be saved in long and lat vars
export const airportFinderSearch = (long, lat) => {
  return axios.get(airportFinderURL + long + "&lat=" + lat, config);
};

//URL and API key for yelp API
const yelpURL =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=";
const yelpAPIKey =
  "NNn_iZkgwcsoXyb1LwNcwgRAiCL8c3RkazAkRcQueV0e5b0lZNV-SGGIeosL3AiABzN0_PsQasfbyA8BkbNTjHr-RiTH3sKFAPyB8SCmQInth1SBzlW1uhiuBsr5XHYx";
//   "NNn_iZkgwcsoXyb1LwNcwgRAiCL8c3RkazAkRcQueV0e5b0lZNV-SGGIeosL3AiABzN0_PsQasfbyA8BkbNTjHr-RiTH3sKFAPyB8SCmQInth1SBzlW1uhiuBsr5XHYx";
const configYelp = {
  headers: {
    Authorization: "Bearer " + yelpAPIKey
  }
};

export const yelpSearch = (term, long, lat) => {
  return axios.get(
    yelpURL + term + "&latitude=" + lat + "&longitude=" + long + "&limit=10",
    configYelp
  );
};

//URL and API key for openweathermap API
const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=";
const weatherAPIKey = "61fb0fbf5b4af7a73cbae239fe1b3fbf";

export const weatherSearch = (long, lat) => {
  return axios.get(
    weatherURL +
      lat +
      "&lon=" +
      long +
      "&units=imperial&mode=json&appid=" +
      weatherAPIKey
  );
};

// Gets all airports list that will be used for the autocomplete. NOT WORKING YET!!!
export const airportsList = () => {
  return axios.get("/api/airport");
};

// Route to sign up users
export const registerUser = formData => {
  return axios.post("/api/users/register", formData);
};

// Route to log in users
export const loginUser = formData => {
  return axios.post("/api/users/login", formData);
};

//Route to add favorite search result
export const addFavorite = searchResults => {
  return axios.post(
    "/api/users/" + searchResults.owner + "/addfavorite",
    searchResults
  );
};

//Route to get favorite results for a specific user
export const getFavorites = owner => {
  return axios.get("/api/users/" + owner + "/getfavorite");
};

//Route to remove favorite results for a specific user
export const removeFavorite = favorite => {
  return axios.put(
    "/api/users/" + favorite.owner + "/removefavorite",
    favorite
  );
};

// // Route for current user(access to a protected route for the user, using jwt token.)
export const currentUser = authToken => {
  return axios({
    method: "get",
    url: "/api/users/current",
    headers: {
      Authorization: authToken
    }
  });
};

const APIKey = "ebe432-13fff1";

const queryURL =
  "https://aviation-edge.com/v2/public/flights?key=" + APIKey + "&flightIata=";

export default {
  search: function(query) {
    return axios.get(queryURL + query);
  }
};
