#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request(url, { json: true }, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log(body.title);
});
