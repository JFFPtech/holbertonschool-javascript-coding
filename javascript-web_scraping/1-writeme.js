#!/usr/bin/node
const fs = require('fs');
const fpath = process.argv[2];
const fcontent = process.argv[3];

fs.writeFile
(fpath, fcontent, 'utf8', (err) => {
  if (err) {
    console.error(err);
  }
});
