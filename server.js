const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Get all tasks
app.get('/tasks', (req, res) => {
    const data = fs.readFileSync('tasks.json');
    res.json(JSON.parse(data));
});

// Add task
app.post('/tasks', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync('tasks.json'));
    tasks.push(req.body);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    res.send("Task Added");
});

// Delete task
app.delete('/tasks/:index', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync('tasks.json'));
    tasks.splice(req.params.index, 1);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    res.send("Task Deleted");
});

app.listen(3000, () => console.log("Server running on port 3000"));