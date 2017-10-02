const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

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

app.use("/api", api);

app.listen(process.env.PORT, function(){
  console.log("Server Listening on Port: " + process.env.PORT);
});

app.get("/", function(req, res){
  res.render("index");
});

app.get("/entries", function(req, res){
  res.render("read");
});

app.post("/journal", function(req, res){
  var entry = new Entry({
    username: "Aimée",
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
  console.log(req.body.em);
  console.log(req.body.pw);
  res.redirect("/entries");
});
