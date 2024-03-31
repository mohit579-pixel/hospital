const express = require("express");
const router = express.Router();


const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middleware.js");
const userController = require("../controller/users.js");





router.route('/login')
.get(userController.renderLogin)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login" }),userController.login);


router.route('/signup')
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));

router.route('/logout')
.get(userController.logout);


module.exports = router;


