var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var seedsDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var methodOverride = require('method-override');
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');
var flash = require('connect-flash');

//mongoose.connect("mongodb://localhost/yelp_camp");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(flash());
var Comment = require('./models/comments');
var Campground = require('./models/campgrounds');
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


app.use(require("express-session")({
    secret: "Cutest Dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', "ejs");

//seedsDB();
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
})