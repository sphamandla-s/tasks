const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3012;
const pJson = require('./package.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const task = {};

app.get('/events', (req, res) => {
    res.send(task)
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'task_posted') {
        const { id, title } = data;
        task[id] = { id, title, comments: [] }
    }


    if (type === 'comment_created') {
        const { id, content, taskId } = data;
        const tasks = task[taskId];

        tasks.comments.push({ id, content })
    }



    res.send({})
})


app.listen(port, () => {
    console.log(`Server version ${pJson.version} started at ${port}`)
})