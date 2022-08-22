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


var channelTree = {
    "UBNT": {

    },
    "TPLINK": {

    }
}

app.post('/communicate', (req, res, next)=>{
    channelName = req.body.channel;
    for(var i = 0; i<= Object.keys(channelTree).length; i++){
        if(Object.keys(channelTree)[i] === req.body.channel){ // check if the requested channel exists, if yes update it
                console.log("channel exists")
                
                // update the hours
                channelTree[channelName]["hours"] = req.body.hours; 
                
                // update the minutes
                channelTree[channelName]["minutes"] = req.body.minutes;
                break;
        }
        else{
            console.log("channel does not exist, creating one")
            channelTree[channelName] = {}; // create the channel object
            channelTree[channelName]["hours"] = req.body.hours; // add channel hours
            channelTree[channelName]["minutes"] = req.body.minutes; // add channel minutes
            break; // prevent creating multiple objects
        }    
        }
    res.send(200);
    })

app.get("/communicate", (req, res, next)=>{
    res.send(channelTree); // obtain channel tree object
    res.status(200);
})

    


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