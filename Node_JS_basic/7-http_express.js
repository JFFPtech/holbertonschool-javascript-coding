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

    const students = lines.slice(1).map((line) => {
      const [firstName, , , field] = line.split(',').map((part) => part.trim());
      return { firstName, field };
    }).filter((student) => student.firstName && student.field);

    const totalStudents = students.length;
    const fieldSummary = students.reduce((acc, { firstName, field }) => {
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(firstName);
      return acc;
    }, {});

    let response = `Number of students: ${totalStudents}\n`;
    Object.entries(fieldSummary).forEach(([field, names]) => {
      response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    });
    return response;
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error('Cannot load the database');
  }
}
