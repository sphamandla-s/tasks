const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
var pjson = require('./package.json')
const port = 3010;

var task = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/task', (req, res) => {
    res.status(200).json(task)
})

app.post('/task', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    task[id] = {
        id, title
    }


    res.status(200).json(task)
})

app.listen(port, () => {
    console.log(`Server version ${pjson.version} started at port ${port}`)
})