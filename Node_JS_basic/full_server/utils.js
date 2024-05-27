import fs from 'fs';

export const readDatabase = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject('Cannot load the database');
            } else {
                const students = {};
                data.split('\n').slice(1).forEach(line => {
                    if (line.length > 0) {
                        const [firstName, , , field] = line.split(',');
                        if (!students[field]) students[field] = [];
                        students[field].push(firstName.trim());
                    }
                });
                resolve(students);
            }
        });
    });
};
