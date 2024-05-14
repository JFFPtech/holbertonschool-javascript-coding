#!/usr/bin/node
const fs = require('fs');
const fpath = process.argv[2];

fs.readFile(fpath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});