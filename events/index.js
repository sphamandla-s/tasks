const express = require('express');
const app = express();
const pjson = require("./package.json");
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3015;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/events', async (req, res) => {
    const event = req.body;
    await axios.post('http://tasks-clusterip-srv:3010/events', event);
    // await axios.post('http://localhost:3011/events', event);
    // await axios.post('http://localhost:3012/events', event);

    res.send({})
})


app.listen(port, () => {
    console.log(`Server version ${pjson.version} started at port ${port}`)
})