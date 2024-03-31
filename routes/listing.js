const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controller/listings.js");
const {isLoggedIn ,isAuthorized} = require("../utils/middleware.js");
// const {validateListing } = require("./middleware.js");
const {storage}=require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({ storage })




router.route('/')
.get(wrapAsync(listingController.show))
.post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.add))


router.route('/new')
.get(isLoggedIn,isAuthorized,listingController.newlist)
router.route('/:id')
.get(isLoggedIn,isAuthorized,wrapAsync(listingController.showupdate))
.put(isLoggedIn,isAuthorized,wrapAsync(listingController.update))
.delete(isLoggedIn,isAuthorized,wrapAsync(listingController.remove));

module.exports = router;







