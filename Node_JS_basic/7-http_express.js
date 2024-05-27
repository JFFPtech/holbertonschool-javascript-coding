const express = require('express');
const fs = require('fs').promises;
const app = express();

const databasePath = process.argv[2];

async function readStudents(path) {
  try {
    const data = await