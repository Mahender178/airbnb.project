const express = require("express") ;
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js");

app.use(express.static("public"));

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnbweb";



main()
.then( () => {
    console.log("connected to DB");
})
.catch(err => {
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/" , (req, res) => {
    res.send("this your home page add something to it ");
});

// index route
app.get("/listings" ,async (req ,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index", { allListings });
});
// New Route

app.get("/listings/new" , (req, res) =>{
    res.render("listings/new.ejs");  
  });

// Show Route
app.get("/listings/:id" , async (req,res) =>{
    let{id}  = req.params;
   const listing =   await  Listing.findById(id);
   res.render("listings/show.ejs" , {listing});
});
 //Create Route
 app.post("/listings" , wrapAsync(async(req, res, next) =>{
    const newListing = new Listing(req.body);
  await newListing.save();
    res.redirect("/listings");
 })

);
  
  

 //Edit Route 
 app.get('/listings/:id/edit', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listings/edit', { listing });
});


//Update Rooute
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { $set: req.body.listing }, { new: true, runValidators: true });
    res.redirect(`/listings/${id}`);
});


//delete Route
app.delete("/listings/:id" , async (req, res) =>{
    let{ id } = req.params;
    let deletedListing = await  Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

}) ;

// app.get("/testListing" , async ( req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//         image: "https://unsplash.com/photos/low-angle-photo-of-hotel-lighted-signage-on-top-of-brown-building-during-nighttime-n_IKQDCyrG0",
//     });
//      await sampleListing.save();
//      console.log("sample was saved" );
//      res.send("Successful testing");

// });

app.listen(8080 , () => {
    console.log("server is listen on port 8080");
});