var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    driver_name: String,
    date: {type: date, default: Date.now() }
    vehicle_number: Number,
    starting_mileage: Number
})

module.exports = mongoose.model('DriverLogs', LogSchema);