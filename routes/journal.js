const express = require("express");
const router = express.Router();

router.get("/entries", function(req, res, next){
  if(req.isAuthenticated()){
    res.render("read");
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

    res.redirect("/journal/entries");
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
