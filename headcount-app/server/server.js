var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dburl = require('./config.js');
mongoose.connect(dburl, function(err) {
  if(err) {
    console.log('Error connecting to MongoDB', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

var app = express();

app.use(bodyParser.json());
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.post('/postHeadCount', function(req, res){
    console.log('body: ' + JSON.stringify(req.body));
    res.send(req.body); 
});

app.listen(3000, function() {
    console.log("Express server listening on port 3000");
})
