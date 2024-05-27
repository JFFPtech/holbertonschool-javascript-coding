const http = require('http');
const fs = require('fs').promises;

function countStudents(path) {
    return fs.readFile(path, { encoding: 'utf8' })
        .then(data => {
            const lines = data.split('\n').filter(line => line); // Make sure to split on '\n'
            if (lines.length <= 1) { // Check if there's more than just the header
                throw new Error('No data in file');
            }

            const students = lines.slice(1).map(line => {
                const parts = line.split(',').map(part => part.trim()); // Split and trim each part
                return { firstName: parts[0], field: parts[3] }; // Ensure you're accessing the correct index for 'field'
            }).filter(student => student.firstName && student.field);

            console.log("Students processed:", students); // Debugging output

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
        })
        .catch((error) => {
            console.error("Error processing file:", error);
            throw new Error('Cannot load the database');
        });
}

const databasePath = process.argv[2]; 

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
        countStudents(databasePath)
            .then((data) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`This is the list of our students\\n${data}`);
            })
            .catch((error) => {
                res.writeHead(500);
                res.end(error.message);
            });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

app.listen(1245);

module.exports = app;