#!usr/bin/node
const fs = require('fs');
const fpath = process.argv[2];

fs.readFile(fpath, 'utf-8', (err, data) => {
  if (err) {
    console.err(err);
  } else {
    console.log(data);
  }
});