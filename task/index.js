const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
var pjson = require('./package.json');
const axios = require('axios');
const port = 3010;

var task = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/task', (req, res) => {
    res.status(200).json(task)
})

app.post('/task/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    task[id] = {
        id, title
    }

    console.log(task)

    await axios.post('http://comments-clusterip-srv:3011/events', {
        type: 'task_posted',
        data: id, title, comments: []
    })

    res.status(200).json(task)
})


app.post('/events', (req, res) => {
    console.log('Received an events', req.body.type)
    res.status(200).json(task)
})

app.listen(port, () => {
    console.log('we are here the new version')
    console.log(`Server version ${pjson.version} started at port ${port}`)
})