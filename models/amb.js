const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
    first: String,
    last: String,
    age: Number,
    gender: String,
    phone: String,
    location: String
});

const Ambulance = mongoose.model("Ambulance", ambulanceSchema);
module.exports = Ambulance;