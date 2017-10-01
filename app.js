const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT, function(){
  console.log("Server Listening on Port: " + process.env.PORT);
});

app.get("/", function(req, res){
  res.render("index");
});

app.get("/journal", function(req, res){
  console.log(req.query.title);
  console.log(req.query.entry);
});
