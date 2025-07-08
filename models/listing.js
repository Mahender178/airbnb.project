const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  location: {
    type: String,
    default: "Unknown Location", // Optional: Add default value for location
  },
  country: {
    type: String,
    default: "Unknown Country", // Optional: Add default value for country
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); // Fix: Use _id to delete related reviews
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
