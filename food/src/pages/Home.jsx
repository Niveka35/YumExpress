import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "./Home.css";
import CategoryPage from "../components/CategoryPage.jsx";
import BrandPage from "../components/BrandPage.jsx";
import Reviews from "./Reviews";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, updateQty, addToCart } = useContext(CartContext);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const scrollToSearch = () => {
    document.getElementById("search").scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleDecrease = (item) => {
    const existing = cartItems.find((i) => i._id === item._id);
    if (existing) {
      const newQty = existing.qty - 1;
      updateQty(item._id, newQty);
    }
  };

  return (
    <div className="home-body home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Niveka Store</h1>
          <h2>
            Order Your Daily
            <br />
            Groceries
          </h2>
          <p className="hero-sub">Home order-Quick pickup-Zero waiting</p>
          <div className="scroll-arrow" onClick={scrollToSearch}>
            ↓{" "}
          </div>
        </div>
      </section>
      <section className="section" id="search">
        <h2>All Groceries</h2>
        <div className="hero-search" id="popular">
          <input
            type="text"
            placeholder="Search your daily groceries"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => scrollToSection("popular")}>Search</button>
        </div>
        <div className="item-grid">
          {items
            .filter((item) => {
              const term = search.toLowerCase();

              return (
                item.name.toLowerCase().includes(term) ||
                item.brand?.toLowerCase().includes(term) ||
                item.category?.toLowerCase().includes(term)
              );
            })
            .map((item) => {
              const qty = cartItems.find((i) => i._id === item._id)?.qty || 0;
              return (
                <div className="item-card" key={item._id}>
                  <img src={item.img} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>
                    {item.quantity} &nbsp;&nbsp; Rs. {item.price}
                  </p>
                  <div className="qty-box">
                    <button onClick={() => handleDecrease(item)}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <CategoryPage />
      <BrandPage />
      <Reviews />
    </div>
  );
}
