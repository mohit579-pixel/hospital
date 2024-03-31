const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require('dotenv').config();
const dbUrl = "mongodb+srv://22511291dypit:T2lSmNyTE70qyyDD@cluster0.kduxgmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual database URL
const Listing = require("./models/listing.js");
const Ambulance = require("./models/amb.js");
const user = require("./models/user.js");
const server = require('http').Server(app);
const {v4:uuidv4} = require("uuid")
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require('peer')
const peer = ExpressPeerServer(server, {
    debug: true
});
app.use('/peerjs', peer);

const multer = require('multer')
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn } = require("./utils/middleware.js")
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const userRout = require('./routes/user.js');

const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line for JSON parsing
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: "SECRET",
    },
    touchAfter: 24 * 3600,


});

store.on("error", () => {
    console.log("Error in Mongo STORE", err);
});

// Session Configuration
const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// Passport Configuration
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

// MongoDB Connection
main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error("Error connecting to DB:", err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

// Set local variables middleware
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    // res.locals.email = req.user ? req.user.email : null;
    // res.locals.success = req.flash("success");
    // res.locals.error = req.flash("error");
    next();
});



app.get('/home', (req, res) => {
    res.render('listings/home.ejs');
});
// app.get('/:room', (req, res) => {
// app.get('/chat', (req, res) => {
//     // res.send("Hello World")
//     res.redirect(`/${uuidv4()}`);
// })

// app.get('/:room', (req, res) => {
//     res.render("rooms.ejs", { roomId: req.params.room })
// })

// io.on("connection", (socket) => {
//     socket.on("join-room", (roomId, userId) => {
//         socket.join(roomId);
//         setTimeout(() => {
//             socket.to(roomId).broadcast.emit("user-connected", userId);
//         }, 1000)

//         socket.on("disconnect", () => {
//             console.log("User Disconnected");
//             io.emit("user-disconnected", userId)
//         })
//     });
// });


//login
app.get('/login', (req, res) => {
    res.render('users/login.ejs');
});
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        console.log("logged");
        res.redirect('/home');
    });

//logout

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/home");
    })
});


//signup

app.get('/signup', (req, res) => {
    res.render("users/signup.ejs");
});
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password, location } = req.body.user;
        // console.log(username);
        // const data =await https://documenter.getpostman.com/view/15230345/2s9XxyPsZS#24dfb751-5817-4765-9a6e-5eeef0551151;
        // const pass = req.body.user.password;
        const newUser = new User({ username, email, location });
        console.log(newUser);
        const registeredUser = await User.register(newUser, password);
        res.redirect("/home");
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).send("Fail: " + error.message);
    }
    //otp
});


//appointment

app.get('/appointment', (req, res) => {
    res.render('listings/appointment.ejs');
});
app.post('/appointment', isLoggedIn, upload.single('listing[image]'), wrapAsync(async (req, res) => {
    let data = req.body.listing;
    console.log(data);
    let url = req.file.path;
    console.log(url);
    let filename = req.file.filename;



    const newListing = new Listing(req.body.listing);
    newListing.image = { url, filename };
    await newListing.save();
    console.log(newListing);
    res.redirect('/home');
}));

app.get('/ambulance', (req, res) => {
    res.render('listings/ambulance.ejs');
});

app.post('/ambulance',async(req,res)=>{
    let data = req.body.listing;
    console.log(data);
    const newAmbulance = new Ambulance(req.body.listing);
    await newAmbulance.save();
    console.log(newAmbulance);
    res.redirect('/home');
});

// app.get()















// Home
app.get("/home", (req, res) => {
    res.render("listings/home1.ejs");
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});













// 404 Not Found Middleware
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Start the server
app.listen(8000, () => {
    console.log("Server is listening on port 3000");
});
