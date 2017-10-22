const express = require("express");
const router = express.Router();
const path = require("path");
const Entry = require(path.join(__dirname, "../dbmodels/entry"));

router.get("/write", function(req, res, next){
  if(req.isAuthenticated()){
    res.render("journal/write", {csrfToken: req.csrfToken()});
  } else {
    res.redirect("/auth/login");
  }
});

router.get("/read", function(req, res, next){
  if(req.isAuthenticated()){
    res.render("journal/read");
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/entry", function(req, res, next){
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

    res.redirect("/journal/read");
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
