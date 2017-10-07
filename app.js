const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const csurf = require("csurf");

var Entry = require(path.join(__dirname, "/dbmodels/entry"));
var User = require(path.join(__dirname, "/dbmodels/user"));

var api = require(path.join(__dirname, "/routes/api"));
var auth = require(path.join(__dirname, "/routes/auth"));
var journal = require(path.join(__dirname, "/routes/journal"));

mongoose.connect(process.env.DBURL, {
  useMongoClient: true
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(csurf());

app.use("/api", api);
app.use("/auth", auth);
app.use("/journal", journal);

app.listen(process.env.PORT, function(){
  console.log("Server Listening on Port: " + process.env.PORT);
});

app.get("/", function(req, res){
  if(req.isAuthenticated()){
    res.render("index", {csrfToken: req.csrfToken()});
  } else {
    res.redirect("/auth/login");
  }
});

passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
