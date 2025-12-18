{["Anchor", "Nestle", "Munchee", "Maliban", "Smak"].map((brand) => (
    <div key={brand}>
      <h3>{brand}</h3>

      <div className="item-grid">
        {filterByBrand(brand).map((item) => (
          <div className="item-card" key={item._id}>
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
            <span>Rs. {item.price}</span>

            <div className="qty-box">
              <button onClick={() => decreaseQty(item._id)}>−</button>
              <span>{quantities[item._id] || 0}</span>
              <button onClick={() => increaseQty(item._id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}