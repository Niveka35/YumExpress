const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');


router.get('/', getProducts);
router.post('/', createProduct); // small admin convenience to add products


module.exports = router;