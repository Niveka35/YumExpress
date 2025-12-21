const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/Auth");
app.use("/api/auth", authRoutes);
const itemRoutes = require("./routes/Items");
app.use("/items", itemRoutes);
const reviewRoutes = require("./routes/Reviews");
app.use("/reviews", reviewRoutes);
const placeOrderRoutes = require("./routes/PlaceOrder");
app.use("/api/place-order", placeOrderRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
