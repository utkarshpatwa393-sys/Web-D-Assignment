const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: true
    },
    company: String,
    model: String,
    price: Number,
    color: String
});

module.exports = mongoose.model("Vehicle", vehicleSchema);