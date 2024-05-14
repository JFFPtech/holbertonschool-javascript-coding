#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request(url, { json: true }, (err, res, body) => {
  if (err) {
    console.error('Error:', error);
  } else if (Response.statusCode !== 200) {
    console.error('Failed to fetch data from API');
  } else {
    console.log(body.title);
  }
});
