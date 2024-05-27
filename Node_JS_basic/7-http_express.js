const express = require('express');
const fs = require('fs').promises;
const app = express();

const databasePath = process.argv[2];

async function readStudents(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    const lines = data.split('\n').filter((line) => line);
    if (lines.length <= 1) {
      throw new Error('No data in file');
    }

    const students = lines.slice(1).map(line => {
        const [firstName, , , field] = line.split(',').map(part => part.trim());
        return { firstName, field };
    }).filter(student => student.firstName && student.field);

    }