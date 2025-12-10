const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
cart: [
{
productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
name: String,
price: Number,
quantity: Number
}
],
phone: String,
address: String,
coords: { lat: Number, lng: Number },
subtotal: Number,
deliveryFee: Number,
total: Number,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', OrderSchema);