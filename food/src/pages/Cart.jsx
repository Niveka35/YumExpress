import { useContext,useState} from "react";
import { CartContext } from "../context/CartContext";
import PlaceOrder from "../components/PlaceOrder";
import "./Cart.css";
import empty from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, updateQty, total, clearCart } = useContext(CartContext);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      {orderSuccess && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="green-tick">&#10004;</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you! Your order will be ready for pickup.</p>
            <button className="close-btn" onClick={() => setOrderSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {cartItems.length === 0 && !orderSuccess ? (
        <div className="empty-cart-box">
          <img src={empty} alt="empty cart" />
          <p>Your cart is empty</p>
          <button className="close-btn" onClick={() => navigate("/home")}>
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            <h2>Confirm your pickup order</h2>
            {cartItems.map((item) => (
              <div className="cart-product" key={item._id}>
                <span>{item.name}</span>
                <div className="qty-controls">
                  <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                </div>
                <span className="price">Rs. {item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <h3>Total: Rs. {total}</h3>

          <div className="payment-box">
            <h4>Payment Method</h4>
            <p className="cash-only">Cash on Pickup Only ✔</p>
          </div>

          <PlaceOrder 
            cartItems={cartItems} 
            total={total} 
            onOrderSuccess={() => setOrderSuccess(true)}
          />

          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="close-btn" onClick={() => navigate("/home")}>
            Close
          </button>
        </>
      )}
    </div>
  );
}
