const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/Auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String
});

const Review = mongoose.model("Review", reviewSchema);
const itemRoutes = require("./routes/Items");
app.use("/items", itemRoutes);

app.get("/reviews", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
