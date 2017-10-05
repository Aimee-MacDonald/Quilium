const express = require("express");
const router = express.Router();
const path = require("path");
const Entry = require(path.join(__dirname, "../dbmodels/entry"));

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
