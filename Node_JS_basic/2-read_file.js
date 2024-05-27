const fs = require('fs');

function countStudents(path) {
    try {
        const data = fs.readFileSync(path, { encoding: 'utf8' });
        const lines =data.split('\n').filter(line => line);

        if (lines.length === 0) {
            throw new Error('No data to parse');
        }
}