const Product = require('../models/Product');


exports.getProducts = async (req, res) => {
try {
const products = await Product.find().sort({ createdAt: -1 });
res.json(products);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


exports.createProduct = async (req, res) => {
try {
const { name, description, price, image } = req.body;
const p = new Product({ name, description, price, image });
await p.save();
res.status(201).json(p);
} catch (err) {
res.status(500).json({ message: 'Cannot create product' });
}
};