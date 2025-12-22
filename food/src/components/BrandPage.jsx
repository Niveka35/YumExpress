import React from "react";
import { Link } from "react-router-dom";
import "../pages/Home.css";
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
import local from "../assets/brands/local.png";
import kist from "../assets/brands/kist.png";

const BrandPage = () => {
  return (
    <section className="section" id="brands">
      <h2>Groceries by Brand</h2>
      <div className="brand-grid">
        <Link to="/brand/Anchor" className="brand-card">
          <img src={anchor} alt="anchor" />
        </Link>
        <Link to="/brand/nestle" className="brand-card">
          <img src={nestle} alt="nestle" />
        </Link>
        <Link to="/brand/munchee" className="brand-card">
          <img src={munchee} alt="munchee" />
        </Link>
        <Link to="/brand/maliban" className="brand-card">
          <img src={maliban} alt="maliban" />
        </Link>
        <Link to="/brand/smak" className="brand-card">
          <img src={smak} alt="smak" />
        </Link>
        <Link to="/brand/md" className="brand-card">
          <img src={md} alt="md" />
        </Link>
        <Link to="/brand/mas" className="brand-card">
          <img src={mas} alt="mas" />
        </Link>
        <Link to="/brand/elephant" className="brand-card">
          <img src={elephant} alt="elephant" />
        </Link>
        <Link to="/brand/prima" className="brand-card">
          <img src={prima} alt="prima" />
        </Link>
        <Link to="/brand/ritzbury" className="brand-card">
          <img src={ritzbury} alt="ritzbury" />
        </Link>
        <Link to="/brand/local" className="brand-card">
          <img src={local} alt="local" />
        </Link>
        <Link to="/brand/kist" className="brand-card">
          <img src={kist} alt="kist" />
        </Link>
      </div>
    </section>
  );
};

export default BrandPage;
