const mongoose = require("mongoose");
const Item = require("./models/Item");
const items = require("./items.json");

mongoose.connect("mongodb://127.0.0.1:27017/groceryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("MongoDB connected");
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log("Items inserted from JSON file");
  process.exit();
})
.catch(err => console.error(err));
