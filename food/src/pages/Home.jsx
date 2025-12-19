import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import "./Home.css";
import fruits from "../assets/categories/fruits.png";
import vegetables from "../assets/categories/vegetables.png";
import dairy from "../assets/categories/dairy.png";
import beverages from "../assets/categories/beverages.png";
import snacks from "../assets/categories/snacks.png";
import anchor from "../assets/brands/anchor.png";
import nestle from "../assets/brands/nestle.png";
import munchee from "../assets/brands/munchee.png";
import maliban from "../assets/brands/maliban.png";
import smak from "../assets/brands/smak.png";
import md from "../assets/brands/md.png";
import mas from "../assets/brands/mas.png";
import elephant from "../assets/brands/elephant.png";
import prima from "../assets/brands/prima.png";
import ritzbury from "../assets/brands/ritzbery.png";
import cans from "../assets/categories/cans.png";
import household from "../assets/categories/household.png";
import baby from "../assets/categories/baby.png";
import local from "../assets/brands/local.png";
import kist from "../assets/brands/kist.png";
import Reviews from "./Reviews";
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Fetch items from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-left">
          <span className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </span>
          <span
            className="location-icon"
            onClick={() =>
              window.open("https://maps.app.goo.gl/D4RLpoE5EyozvK2K8", "_blank")
            }
          >
            📍Location
          </span>
        </div>
        <div className="header-right">
          <span className="icon">🛒</span>
          <span className="icon">👤</span>
        </div>
        {menuOpen && (
          <div className={`menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
            <a onClick={() => scrollToSection("search")}>Search</a>
            <a onClick={() => scrollToSection("popular")}>All Groceries</a>
            <a onClick={() => scrollToSection("categories")}>Grocery Category</a>
            <a onClick={() => scrollToSection("brands")}>Brands</a>
            <a onClick={() => scrollToSection("reviews")}>Reviews</a>
          </div>
        )}
      </header>

      <main className="home-body">
        {/* HERO SECTION */}
<section className="hero-section">
  <div className="hero-content">
    <h1>Order Your Daily<br />Groceries</h1>
    <p className="hero-sub">Home order-Quick pickup-Zero waiting</p>

    <div className="hero-search">
      <input
        type="text"
        placeholder="Search your daily groceries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => scrollToSection("popular")}>Search</button>
    </div>
  </div>
</section>

        <section className="section" id="popular">
          <h2>All Groceries</h2>
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
              .map((item) => (
                <div className="item-card" key={item._id}>
                  <img src={item.img} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>{item.quantity} &nbsp;&nbsp; Rs. {item.price}</p>
                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item._id)}>−</button>
                    <span>{quantities[item._id] || 0}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>
                </div>
              ))}
          </div>
        </section>
        {/* SHOP BY CATEGORY */}
        <section className="section" id="categories">
          {" "}
          <h2>Groceries by Category</h2>{" "}
          <div className="category-grid">
            {" "}
            <div className="category-card">
              {" "}
              <img src={fruits} alt="Fruits"  /> <p>Fruits</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={vegetables} alt="Vegetables" /> <p>Vegetables</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={dairy} alt="Dairy" /> <p>Dairy</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={beverages} alt="Beverages" /> <p>Beverages</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={snacks} alt="Snacks" />
              <p>Snacks</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={cans} alt="cans" />
              <p>cans and jars</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={household} alt="household" />
              <p>Household & Cleaning</p>{" "}
            </div>{" "}
            <div className="category-card">
              {" "}
              <img src={baby} alt="baby" />
              <p>Baby Items</p>{" "}
            </div>{" "}
          </div>{" "}
        </section>
        {/* SHOP BY BRAND */}{" "}
        <section className="section" id="brands">
          {" "}
          <h2>Groceries by Brand</h2>{" "}
          <div className="brand-grid">
            {" "}
            <div className="brand-card">
              {" "}
              <img src={anchor} alt="Anchor" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={nestle} alt="Nestle" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={munchee} alt="Munchee" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={maliban} alt="Maliban" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={smak} alt="Smak" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={md} alt="md" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={mas} alt="mas" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={elephant} alt="elephant" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={prima} alt="prima" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={ritzbury} alt="ritzbury" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={kist} alt="kist" />{" "}
            </div>{" "}
            <div className="brand-card">
              {" "}
              <img src={local} alt="local" />{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <Reviews/>
      </main>
      <footer className="home-footer">
        <p>No waiting No queues Just quick pickup-That's our promise</p>
        <p>📞 +94 76 339 7481 ✉️ k.niveka03@gmail.com</p>
        <p>
          {" "}
          © 2025 Niveka Store | Designed with ❤️ by <span>Niveka</span>{" "}
        </p>
      </footer>
    </div>
  );
}
