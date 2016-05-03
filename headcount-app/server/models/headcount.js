var mongoose = require('mongoose');

var HeadcountSchema = new mongoose.Schema({
    location: String,
    time: {type: date, default: Date.now() }
    boarded: Number,
    departed: Number,
    full: String
    vehicle_nbr: Number
})

module.exports = mongoose.model('Headcount', HeadcountSchema);