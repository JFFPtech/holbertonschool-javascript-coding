#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, { json: true }, (error, response, todos) => {
    if (error) {
        return console.error('Error:', error);
    }

    if (response.statusCode !== 200) {
        return console.error('Failed to fetch data from API');
    }

    const completedTasks = {};

    todos.forEach(todo => {
        if (todo.completed) {
            if (completedTasks[todo.userId]) {
                completedTasks[todo.userId]++;
            } else {
                completedTasks[todo.userId] = 1;
            }
        }
    });

    console.log(completedTasks);
});
