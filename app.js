var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds.js"),
    flash = require("connect-flash"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user")
    
//requiring routes 
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
    

mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database


//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "this is my secret message",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})



app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp started");
});