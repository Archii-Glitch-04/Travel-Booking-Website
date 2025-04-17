const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  departure: String,
  arrival: String,
  availability: Number,
  price: Number
});

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;
