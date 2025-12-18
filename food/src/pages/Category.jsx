{["Fruits", "Vegetables", "Dairy", "Beverages", "Snacks"].map((cat) => (
    <div key={cat}>
      <h3>{cat}</h3>

      <div className="item-grid">
        {filterByCategory(cat).map((item) => (
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