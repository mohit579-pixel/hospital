const Review = require("../models/review");


module.exports.renderReview=async (req, res) => {
    let allisting = await Review.find({});
    res.render("listings/review.ejs",{allisting});
};

module.exports.addReview = async (req, res) => {
    try {
        const data = req.body.listing;
        console.log("data");
        // Save the review data to the database using the Review model
      await Review.create(data);
      res.redirect('/'); // Redirect to the home page or a thank-you page
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };