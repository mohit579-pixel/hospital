const Listing = require("../models/listing");







  module.exports.show=async (req, res) => {
    let allisting = await Listing.find({});
    let userEmail = req.user ? req.user.email : null; // Accessing the email property
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    console.log("hello");
    res.render("listings/menu.ejs", { allisting });
};

module.exports.add=async (req, res) => {
    let data = req.body.listing;
    let url=req.file.path;
    let filename=req.file.filename;
    


    const newListing = new Listing(req.body.listing);
    newListing.image={url,filename};
    await newListing.save();
    console.log(newListing);
    res.redirect('/menu');
};

module.exports.remove=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect('/menu');
};

module.exports.update=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    await listing.save();
    res.redirect('/menu');
};


module.exports.newlist=(req, res) => {
    if (req.isAuthenticated()) {
        res.render("listings/new.ejs");
    }
};


module.exports.showupdate=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
};