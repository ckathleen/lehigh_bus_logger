var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dburl = require('./config.js');
var expressValidator = require('express-validator');
var DriverLog = require('./models/log.js');
var Headcount = require('./models/headcount.js');
var errorhandler = require('errorhandler');

mongoose.connect(dburl, function(err) {
  if(err) {
    console.log('Error connecting to MongoDB', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

var app = express();
app.use(bodyParser.json());       //support JSON-encoded bodies POST: {"name":"foo","color":"red"}  
app.use(bodyParser.urlencoded({     //support URL-encoded bodies POST: name=foo&color=red
  extended: true
})); 
app.use(expressValidator());
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(errorhandler());

app.post('/postHeadCount', function(req, res){
	 console.log("/postHeadCount");
    console.log('body: ' + JSON.stringify(req.body));
    req.checkBody('boarded', 'Boarded is not int').isInt()
	req.checkBody('departed', 'Departed is not int').isInt()
	DriverLog.findById(req.body.trip_id, function(err, log) {
		if (err) console.log(err);
		if (log) {
			var headcount = new Headcount({
    		    location: req.body.location,
    		    boarded: req.body.boarded,
    		    departed: req.body.departed,
    		    full: req.body.full,
    		    vehicle_nbr: req.body.vehicle_nbr
    		});
    		
    		headcount.save(function(err) {
    		    if(err) console.log(err);
    		    res.send(log);
    		});
		} else {
			console.log('Trip id not found. Headcount not saved.');
			res.send({_id: 0});
		}
	});

});

app.post('/postLog', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    req.checkBody('vehicle_nbr', 'Invalid vehicle number').isInt();
	req.checkBody('starting_mileage', 'Starting mileage not a number').isInt();
	var log = new DriverLog({
        route: req.body.route,
        driver_name: req.body.driver_name,
        vehicle_nbr: req.body.vehicle_nbr,
        starting_mileage: req.body.starting_mileage
    });
	console.log('validation complete');
    log.save(function(err) {
        if(err) console.log(err);
        res.send(log);
    });

});

app.post('/postEndOfDay', function(req, res) {
	console.log('body: ' + JSON.stringify(req.body));
	req.checkBody('ending_mileage', 'Ending mileage not a number').isInt();
	DriverLog.findById(req.body.trip_id, function(err, log) {
		if (err) console.log(err);
		if (log) {
			log.ending_mileage = req.body.ending_mileage;
			log.save(function(err) {
				if (err) console.log(err);
				console.log(JSON.stringify(log));
				res.send(log);
			});
		} else {
			console.log("trip_id does not exist. Feedback not saved.");
			res.send({'_id': 0});
		}
	});
});

//javascript pure
app.post('/headCountForm', function(req, res){
	console.log("/headCountForm");
    console.log(req.body);
});

app.listen(3000, function() {
    console.log("Express server listening on port 3000");
})
