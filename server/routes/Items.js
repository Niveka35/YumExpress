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

// GET ALL ITEMS
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;
