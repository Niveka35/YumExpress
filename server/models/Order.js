const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    }
  ],
  total: Number,
  paymentMethod: {
    type: String,
    default: "Cash on Pickup",
  },
  email: String, // customer email
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", OrderSchema);
