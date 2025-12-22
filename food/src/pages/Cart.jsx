import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const email = localStorage.getItem("email");
export default function Cart() {
  const { cartItems, updateQty, total } = useContext(CartContext);
  const navigate = useNavigate();

  const payment = "cash";

  const placeOrder = async () => {
    try {
      await axios.post("/checkout", {
        items: cartItems,
        total,
        paymentMethod: "Cash on Pickup",
        email: email,
      });

      alert("Order Confirmed! Check your email for details.");
    } catch (error) {
      console.log(error);
      alert("Error placing order.");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Basket</h2>
      <div className="item-list">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div>
                <h4>{item.name}</h4>
                <p>Price: Rs. {item.price}</p>
              </div>

              <input
                type="number"
                className="qty-input"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item._id, Number(e.target.value))}
              />
            </div>
          ))
        )}
      </div>
      <h3 className="total">Total: Rs. {total}</h3>

      <div className="payment-box">
        <h4>Payment Method</h4>
        <p className="cash-only">Cash on Pickup Only ✔</p>
      </div>

      <div className="btn-row">
        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
