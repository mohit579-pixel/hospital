// const Listing = require("../models/user");
const User = require("../models/user");



module.exports.renderSignup = (req, res) => {
    let check = true;
    res.render("users/signup.ejs", { check });
};

module.exports.signup = async (req, res) => {
    try {
        let { first, last, username, email, password, address } = req.body;
        const newUser = new User({ first, last, username, email, address });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/home");
        });
    } catch (e) {
        console.log(e);
        res.redirect("/signup");
    }
};


module.exports.renderLogin = (req, res) => {
    let check = true;
    res.render("users/login.ejs", { check });
};



module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust ! You are logged in!");
    let rediretUrl = res.locals.redirectUrl || "/home";
    res.redirect(rediretUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        // req.flash("success", "you are logged out !");
        res.redirect("/home");
    })
};