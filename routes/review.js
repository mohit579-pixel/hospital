const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controller/reviews.js");
const {isLoggedIn } = require("../utils/middleware.js");


router.route('/review')
.get(reviewController.renderReview)
.post(isLoggedIn,reviewController.addReview);



module.exports = router;