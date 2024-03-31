const Order = require("../models/order");
const User = require("../models/user");
const { format } = require('date-fns');

module.exports.carts=async (req, res) => {
    const ownerToFind = req.user.email;
    console.log(ownerToFind);

    let details = await Order.aggregate([
        {
            $match: {
                email: ownerToFind,
            },
        },
    ]);
console.log(details);
        res.render('listings/cart.ejs',{details});
    
};

module.exports.addOrder=async (req, res) => {
    const owner = req.user._id;
    const total = req.body.total;
    const quantity = req.body.quantity;
    const email=req.user.email;
    const address=req.user.address;
    const date = format(new Date(), 'dd/MM/yyyy');
    const newCart = new Order({ owner, total, date,quantity ,address,email});
    await newCart.save();
    res.redirect('/cart');
};