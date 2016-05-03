var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    route: String,
    driver_name: String,
    date: {type: Date, default: Date.now },
    vehicle_nbr: Number,
    starting_mileage: Number
})

module.exports = mongoose.model('DriverLogs', LogSchema);