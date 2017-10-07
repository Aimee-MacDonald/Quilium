const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");

const User = require(path.join(__dirname, "../dbmodels/user"));

router.get("/register", function(req, res){
  res.render("register", {csrfToken: req.csrfToken()});
});

router.post("/register", function(req, res){
  var user = new User({
    email: req.body.em,
    username: req.body.un,
    password: req.body.pw
  });

  user.save(function(err){
    if(err) throw err;

    req.login(user._id, function(err){
      if(err) throw err;
    });

    res.redirect("/");
  });
});

router.get("/login", function(req, res, next){
  res.render("login", {csrfToken: req.csrfToken()});
});

router.post("/login", function(req, res, next){
  User.find({email: req.body.em}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.pw, docs[0].password, function(err, resp){
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, function(err){
            if(err) throw err;
          });
          res.redirect("/journal/entries");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
});

module.exports = router;
