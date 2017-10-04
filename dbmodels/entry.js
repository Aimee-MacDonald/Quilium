const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  uid: {type: String, required: true},
  username: {type: String, required: true},
  title: {type: String, required: true},
  date: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model("Entry", schema);
