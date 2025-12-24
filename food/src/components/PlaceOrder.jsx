import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../pages/Cart.css";

const PlaceOrder = ({ cartItems, total, onOrderSuccess }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const { clearCart } = useContext(CartContext);

  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      alert("Please login to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://nivekastore.onrender.com/api/place-order", {
        email: user.email,
        items: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          total: item.price * item.qty,
        })),
        total,
      });

      clearCart();
      setOrderPlaced(true);
      if (onOrderSuccess) onOrderSuccess();
    } catch (err) {
      console.error(err);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
    </>
  );
};
export default PlaceOrder;
