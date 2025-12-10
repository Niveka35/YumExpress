const Order = require('../models/Order');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));


// Haversine distance in km
function haversineDistance(lat1, lon1, lat2, lon2) {
function toRad(x) { return x * Math.PI / 180; }
const R = 6371; // km
const dLat = toRad(lat2 - lat1);
const dLon = toRad(lon2 - lon1);
const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
Math.sin(dLon/2) * Math.sin(dLon/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
return R * c;
}


async function geocodeAddress(address) {
const base = process.env.NOMINATIM_URL || 'https://nominatim.openstreetmap.org/search';
const params = new URLSearchParams({ q: address, format: 'json', limit: 1 });
const url = `${base}?${params.toString()}`;
try {
const res = await fetch(url, { headers: { 'User-Agent': 'grocery-app' } });
const json = await res.json();
if (json && json[0]) {
return { lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) };
}
return null;
} catch (err) {
console.error('geocode error', err);
return null;
}
}


// Map distance to fee rules (example)
function mapDistanceToFee(distanceKm) {
if (distanceKm <= 3) return 100;
if (distanceKm <= 6) return 200;
if (distanceKm <= 10) return 300;
return 500; // far away
}


exports.createOrder = async (req, res) => {
try {
const { cart, phone, address } = req.body;
if (!cart || !Array.isArray(cart) || cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });
if (!phone || !address) return res.status(400).json({ message: 'Phone and address are required' });


// subtotal
const subtotal = cart.reduce((s, item) => s + (item.price * item.quantity), 0);


// geocode address
const coords = await geocodeAddress(address);
let deliveryFee;
if (coords && process.env.SHOP_LAT && process.env.SHOP_LNG) {
const dist = haversineDistance(parseFloat(process.env.SHOP_LAT), parseFloat(process.env.SHOP_LNG), coords.lat, coords.lng);
deliveryFee = mapDistanceToFee(dist);
} else {
// fallback fixed fee
deliveryFee = 150;
}


const total = subtotal + deliveryFee;


const order = new Order({ cart, phone, address, coords, subtotal, deliveryFee, total });
await order.save();


res.status(201).json({ orderId: order._id, subtotal, deliveryFee, total });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error while placing order' });
}
};