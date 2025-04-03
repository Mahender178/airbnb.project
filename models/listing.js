const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
    required: true
},
    description: String,
    image: {
        filename: String,
        url: {
            type: String,  
            default: "https://images.unsplash.com/photo-XXXXX",
            set: v => v === "" ? "https://images.unsplash.com/photo-XXXXX" : v
        }
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    country: String,
});

    const Listing = mongoose.model("Listing" , listingSchema);

    module.exports= Listing;