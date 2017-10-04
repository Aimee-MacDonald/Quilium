const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcryptjs");

var Entry = require(path.join(__dirname, "/dbmodels/entry"));
var User = require(path.join(__dirname, "/dbmodels/user"));

var api = require(path.join(__dirname, "/routes/api"));

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
  secret: "4nzd9GNI24OQ",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", api);

app.listen(process.env.PORT, function(){
  console.log("Server Listening on Port: " + process.env.PORT);
});

app.get("/", function(req, res){
  if(req.isAuthenticated()){
    res.render("index");
  } else {
    res.redirect("/login");
  }
});

app.get("/entries", function(req, res){
  if(req.isAuthenticated()){
    res.render("read");
  } else {
    res.redirect("/login");
  }
});

app.post("/journal", function(req, res){
  if(req.isAuthenticated()){
    var entry = new Entry({
      uid: req.session.passport.user,
      title: req.body.title,
      date: Date.now(),
      content: req.body.entry
    });

    entry.save(function(err){
      if(err){
        console.log("Could not Save the Entry");
      } else {
        console.log("Entry Saved Successfully");
      }
    });

    res.redirect("/entries");
  } else {
    res.redirect("/login");
  }
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/reg", function(req, res){
  var user = new User({
    email: req.body.em,
    username: req.body.un,
    password: req.body.pw
  });

  user.save(function(err){
    if(err){
      console.log("Could not Store User");
    } else {
      console.log("User Successfully Created");
    }
  });

  res.redirect("/");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/lgn", function(req, res){
  User.find({email: req.body.em}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.pw, docs[0].password, function(err, resp){
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, function(err){
            if(err) throw err;
          });
          res.redirect("/entries");
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
