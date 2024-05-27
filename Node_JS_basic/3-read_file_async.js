const fs = require('fs').promises;

function countStudents(path) {
    return fs.readFile(path, 'utf8')
        .then(data => {
            const lines = data.split('\n').filter((line) => line);
            if (lines.length === 0) {
                throw new Error('No data to parse');
            }

            const students = lines.slice(1).map(line => {
                const [firstName, field] = line.split(',');
                return { firstName, field };
            }).filter(student => student.firstName && student.field);

            const totalStudents = students.length;
            console.log(`Number of students: ${totalStudents}`);

            const fieldSummary = students.reduce((acc, { firstName, field }) => {
                if (!acc[field]) {
                    acc[field] = [];
                }
                acc[field].push(firstName);
                return acc;
            }, {});

            Object.entries(fieldSummary).forEach(([field, names]) => {
                console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
            });
    
    
        }


            
}