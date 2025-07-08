const Listing = require("../models/listing");
const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listings");


// Show all listings
module.exports.index = async (req ,res) =>  {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
 }

 // Render New Listing Form
 module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" }
    })
    .populate("owner");

  const isOwner = req.user && listing.owner && listing.owner.equals(req.user._id);

  res.render("listings/show", { listing, isOwner });
};


module.exports.createListing = async(req, res, next) =>{
     let url = req.file.path;
     let filename = req.file.filename
     console.log(url , ".." , filename)
     const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id ;
     newListing.image = {url , filename};
     
 let savedListing =    await newListing.save();
 console.log(savedListing);
  req.flash("success" , "New Listing Created!");
    res.redirect("/listings");
 };

 module.exports.renderEditForm = async (req, res) => {
     let { id } = req.params;
     const listing = await Listing.findById(id);
     if(!listing) {
         req.flash("error" , "Listing you requested for does not exist!");
         res.redirect("/listings");
        }
         let originalImageUrl = null;
  if (listing.image && listing.image.url) {
    originalImageUrl = listing.image.url.replace("/upload", "/upload/h_300,w_250");
  }

        res.render("listings/edit.ejs", { listing , originalImageUrl });
      

 };

 module.exports.updateListing = async (req, res) => {
     let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing} , {new: true});

    if( typeof req.file !== "undefined") {
    let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {url , filename};
     await listing.save();
    }
     req.flash("success" , "Listing updated");
     res.redirect(`/listings/${id}`);
     }



module.exports.destroyListing = async (req, res) =>{
    let{ id } = req.params;
    let deletedListing = await  Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , "Listing deleted!");
    res.redirect("/listings");

}