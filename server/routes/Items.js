const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// ADD ITEM
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET ITEMS WITH OPTIONAL FILTERS
router.get("/", async (req, res) => {
  try {
    const { category, brand } = req.query;

    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = new RegExp(`^${category}$`, "i"); // case-insensitive
    }

    // Filter by brand if provided
    if (brand) {
      query.brand = new RegExp(`^${brand}$`, "i"); // case-insensitive
    }

    const items = await Item.find(query);
    res.json(items); // Return filtered items
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
