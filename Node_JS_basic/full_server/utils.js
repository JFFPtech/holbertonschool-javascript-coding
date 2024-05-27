import fs from 'fs';

export const readDatabase = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject('Cannot load the database');
