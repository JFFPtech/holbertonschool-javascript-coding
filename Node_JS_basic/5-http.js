const http = require('http');
const fs = require('fs').promises;

function countStudents(path) {
    return fs.readFile(path, { encoding: 'utf8' })
        .then(data => {
            const lines = data.split('\\n').filter(line => line);
            if (lines.length === 0) {
                throw new Error('No data in file');
            }

            const students = lines.slice(1).map(line => {
                const [firstName, field] = line.split(',');
                return { firstName, field };
            }).filter(student => student.firstName && student.field);

            const totalStudents = students.length;
            const fieldSummary = students.reduce((acc, { firstName, field }) => {
                if (!acc[field]) {
                    acc[field] = [];
                }
                acc[field].push(firstName);
                return acc;
            }, {});

            let response = `Number of students: ${totalStudents}\\n`;
            Object.entries(fieldSummary).forEach(([field, names]) => {
                response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\\n`;
            });
            return response;
        })
        .catch(() => {
            throw new Error('Cannot load the database');
        });
}