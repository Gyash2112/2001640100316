const mongoose = require("mongoose");

const trainSchema = mongoose.Schema({
        trainName: {
                type: String
        },
        trainNumber: {
                type: String
        },
        departureTime: {
                Hours: Number,
                Minutes: Number,
                Seconds: Number
        },
        seatsAvailable: {
                sleeper: Number,
                AC: Number
        },
        price: {
                Sleeper: Number,
                AC: Number
        },
        delayedBy: Number
});

const trainModel = mongoose.model("Train", trainSchema);
module.exports = trainModel;