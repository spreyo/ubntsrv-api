var express = require('express');
var app = express();
const fs = require('fs')
const cors = require('cors');
const bodyParser = require('body-parser');
const e = require('express');


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var pingHour = null;
var pingMinute = null;

app.get('/ping', (req, res, next)=>{
    res.send({hours: pingHour, minutes: pingMinute});
    console.log(pingHour, pingMinute);
    res.status(200);
    
})

app.post('/ping', (req, res, next)=>{
    pingHour = req.body.hours;
    pingMinute = req.body.minutes;
    res.sendStatus(200);

})

app.delete('/delete/', (req,res)=>{
})


app.listen(3001, ()=>{
    console.log('server running');
})

module.exports = app;