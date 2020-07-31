/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

//Retrieving IP address from API
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//retrieving coordinates given IP from API
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let coordinateData = JSON.parse(body).data;
    let coordinates = {latitude: coordinateData.latitude, longitude: coordinateData.longitude};
    // console.log(coordinates);
    callback(null, coordinates);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
//retrieving ISS Coordinates overhead given the coordinates
const fetchISSFlyOverTimes = function(coordinatesObj, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coordinatesObj.latitude}&lon=${coordinatesObj.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const flyBy = JSON.parse(body).response;
    callback(null, flyBy);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work at IP!" , error);
      return;
    }
    // console.log('It worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log('Something went wrong with coords:', error);
        return;
      }
      // console.log('It worked!! Returned Coords: ', coords);
      fetchISSFlyOverTimes(coords, (error, flyBy) => {
        if (error) {
          console.log('Something went Wrong at flyover: ', error);
          return;
        }
        // console.log('It worked! Returned flyover times:', flyBy);
        callback(null, flyBy);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };