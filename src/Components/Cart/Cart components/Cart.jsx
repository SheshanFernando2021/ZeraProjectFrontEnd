import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5167/api/cart/usercart",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch cart items: ${response.status} ${errorText}`
          );
        }

        const data = await response.json();
        setCartItems(data.cartItems.$values);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.cartItemId}>
                <img
                  src={item.product.imageURL}
                  alt={item.product.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product.productName}</h3>
                  <p>{item.product.description}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
