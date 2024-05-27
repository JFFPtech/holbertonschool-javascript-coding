import { readDatabase } from '../utils.js';

class StudentsController {
    static async getAllStudents(req, res) {
        try {
            const students = await readDatabase('Node_JS_basic/database.csv');
            let response = 'This is the list of our students\n';
            Object.keys(students).sort().forEach((field) => {
                response += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
            });
            return res.send(response);
        } catch (error) {
            return res.status(500).send('Cannot load the database');
        }
    }

    static async getAllStudentsByMajor(req, res) {
        const { major } = req.params;
        if (!['CS', 'SWE'].includes(major)) {
            return res.status(500).send('Major parameter must be CS or SWE');
        }

        try {
            const students = await readDatabase('Node_JS_basic/database.csv');
            if (students[major]) {
                return res.status(200).send(`List: ${students[major].join(', ')}`);
            } else {
                return res.status(404).send(`No students found for major ${major}`);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Cannot load the database');
        }
    }
}

export default StudentsController;