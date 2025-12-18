const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  quantity: String,
  category: String,
  brand: String,
});

module.exports = mongoose.model("Item", itemSchema);
