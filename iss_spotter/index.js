const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('142.113.108.3', (error, coords) => {
  if (error) {
    console.log('Something went wrong:', error);
    return;
  }
  console.log('It worked!! Returned Coords: ', coords);
});