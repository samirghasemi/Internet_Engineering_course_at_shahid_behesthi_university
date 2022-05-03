const data = require('./data.json');
const express = require('express');
const app = express();
// app.use(express.static(__dirname + '/static'));

app.get('/stuff/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data);
});


app.get('/stuff/:id/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data[req.params.id]);
});

app.listen(9176);
