
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (let pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('Something went Wrong', error);
  }
  printPassTimes(passTimes);
});







// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// //retrieving the coordinates given IP
// fetchCoordsByIP('142.113.108.3', (error, coords) => {
//   if (error) {
//     console.log('Something went wrong:', error);
//     return;
//   }
//   console.log('It worked!! Returned Coords: ', coords);
// });

// fetchISSFlyOverTimes({ latitude: '43.63190', longitude: '-79.37160' }, (error, flyBy) => {
//   if (error) {
//     console.log('Something went Wrong: ', error);
//     return
//   }
//   console.log('It worked! Returned flyover times:', flyBy);
// })