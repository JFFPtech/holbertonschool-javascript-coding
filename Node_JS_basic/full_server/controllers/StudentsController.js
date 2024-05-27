import { readDatabase } from '../utils.js';

class StudentsController {
    static async getAllStudents(req, res) {
        try {
            const students = await readDatabase('path/to/database.csv');
            let response = 'This is the list of our students\n';
            Object.keys(students).sort().forEach(field => {
                response += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
            });
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async getAllStudentsByMajor(req, res) {
        const major = req.params.major;
        if (major !== 'CS' && major !== 'SWE') {
            return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
        const students = await readDatabase('path/to/database.csv');
        if (students[major]) {
            res.status(200).send(`List: ${students[major].join(', ')}`);
        } else {
            res.status(500).send('Major parameter must be CS or SWE');
        }
    } catch (error) {
        res.status(500).send('Cannot load the database');
    }
}


export default StudentsController;