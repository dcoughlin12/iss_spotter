const request = require('request');

let args = process.argv;
args = args.slice(2);


request(`https://api.thecatapi.com/v1/breeds/search?q=${args}`, (error, response, body) => {
  // console.log(typeof body)
  if (error) {
    return error;
  }
  let data = JSON.parse(body);
  // console.log(data[0])
  if (!data[0]) {
    console.log('invalid breed');
  }
  console.log(data[0].description);
});

