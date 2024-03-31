const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    first: {
        type: String,
        // required: true,
    },
    last: String,
    time:Number,
    gender:String,
    date:String,
    phone: Number,
    description: String,
    image: {
        url:String,
        filename:String,
    },
   
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
