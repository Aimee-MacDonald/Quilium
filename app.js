const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

var Entry = require(path.join(__dirname, "/dbmodels/entry"));

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

app.listen(process.env.PORT, function(){
  console.log("Server Listening on Port: " + process.env.PORT);
});

app.get("/", function(req, res){
  res.render("index");
});

app.get("/entries", function(req, res){
  Entry.find(function(err, docs){
    if(err){
      res.redirect("/");
    } else {
      res.render("read", {entries: docs});
    }
  });
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
