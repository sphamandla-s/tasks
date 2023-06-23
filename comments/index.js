const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto')
const axios = require('axios');
const app = express();
const port = 3011;

var pjson = require('./package.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var comment_by_id = {}

app.get('/task/:id/comments', (req, res) => {
    res.status(200).json(comment_by_id)
})


app.post('/task/:id/comments', async (req, res) => {
    comment_id = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = comment_by_id[req.params.id] || [];
    comments.push({ id: comment_id, content })

    comment_by_id[req.params.id] = comments;


    await axios.post('http://localhost:3015/events,', {
        type: 'comment_created',
        data: {
            id: comment_by_id,
            content,
            taskId : req.params.id
        }
    })

    res.status(200).json(comment_by_id)
})


app.post('/events', (req, res) => {
    // console.log('Received an events', req.body.type)
    console.log('Ikdjfdsnfad dfnka')
    res.status(200).json({})
})


app.listen(port, () => {
    console.log(`Server version ${pjson.version} started at port ${port}`)
});