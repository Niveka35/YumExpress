import React from "react";
import axios from "axios";

const PlaceOrder = ({ cartItems, total, onClose }) => {
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

    try {
      await axios.post("http://localhost:5000/api/place-order", {
        email: user.email,
        items: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          total: item.price * item.qty,
        })),
        total,
      });

      alert("Order placed successfully! Check your email for confirmation.");
      onClose(); 
    } catch (err) {
      console.error(err);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <button className="place-order-btn" onClick={handlePlaceOrder}>
      Place Order
    </button>
  );
};

export default PlaceOrder;
