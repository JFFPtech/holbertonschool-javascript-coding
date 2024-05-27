import fs from 'fs';

export const readDatabase = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database')); // Use Error object for better stack tracing
    } else {
      const students = {};
      data.split('\n').slice(1).forEach((line) => {
        if (line) {
          const [firstname, , , field] = line.split(',');
          const cleanField = field.trim(); // Ensure field names are trimmed
          if (!students[cleanField]) {
            students[cleanField] = [];
          }
          students[cleanField].push(firstname.trim());
        }
      });
      resolve(students);
    }
  });
});
