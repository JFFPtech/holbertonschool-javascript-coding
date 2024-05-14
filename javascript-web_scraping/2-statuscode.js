#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

requests(url, (err, res) => {
  if (err) {
    console.error('Error:', error);
  } else {
    console.log('code:', res.statusCode);
  }
});
