const express = require("express");
const path = require("path");
const Entry = require(path.join(__dirname, "../dbmodels/entry"));
const router = express.Router();

router.get("/get-entries", function(req, res, next){
  Entry.find({uid: req.session.passport.user}, function(err, docs){
    if(err){
      console.log("Something Bad! " + err);
    } else {
      res.status(200).send(docs);
    }
  });
});

module.exports = router;
