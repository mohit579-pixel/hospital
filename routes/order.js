const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const orderController = require("../controller/orders.js");
const {isLoggedIn } = require("../utils/middleware.js");


router.route('/add')
.get(isLoggedIn)
.post(isLoggedIn,orderController.addOrder);

router.route('/cart')
.get(isLoggedIn,orderController.carts);

module.exports = router;