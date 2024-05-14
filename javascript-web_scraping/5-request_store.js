#!/usr/bin/node
const fs = require('fs');
const request = require('request');
const url = process.argv[2];
const fpath = process.argv[3];

function write_file (content) {
  fs.writeFile(fpath, content, 'utf8', (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Content written to ${fpath}');
  });
}
