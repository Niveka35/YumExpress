import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Brand.css";
import { CartContext } from "../context/CartContext";

const Brand = () => {
  const { brandName } = useParams(); 
  const [items, setItems] = useState([]);
  const { cartItems, updateQty, addToCart } = useContext(CartContext);
 const handleDecrease = (item) => {
    const existing = cartItems.find((i) => i._id === item._id);
    if (existing) {
      const newQty = existing.qty - 1;
      updateQty(item._id, newQty);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/items?brand=${brandName}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [brandName]);

  return (
    <div className="brand-page">
    <h1>Brand-{brandName}</h1>
      <div className="item-grid">
        {items.length === 0 ? (
          <p class="no">No items found in this category.</p>
        ) : (
          items.map((item) => {
            const qty = cartItems.find((i) => i._id === item._id)?.qty || 0;
          return (
          <div className="item-card" key={item._id}>
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.quantity} &nbsp;&nbsp; Rs. {item.price}</p>
            <div className="qty-box">
              <button  onClick={() => handleDecrease(item)}>−</button>
              <span>{qty}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          </div>
          )}
        ))}
         </div>
  </div>
  );
};

export default Brand;

      

  