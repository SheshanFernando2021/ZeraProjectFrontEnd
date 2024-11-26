import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5167/api/cartitem";

const CartNav = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const getCartIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email;
  };

  const cartId = getCartIdFromToken();

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        if (!cartId) {
          setError("Please log in to create a cart.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/${cartId}`);
        setCartItems(response.data);
        setLoading(false);
        setLoggedIn(true);
      } catch (err) {
        setError("Failed to fetch cart items. Please try again.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cartId]);

  if (loading) return <div>Loading your cart...</div>;

  if (!loggedIn) {
    return (
      <div>
        <h2>Cart</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="cartNavContainer">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.cartItemId}>
                <div>
                  <h3>{item.product?.name}</h3>{" "}
                  {/* Optional chaining to avoid errors */}
                  <p>Price: ${item.price}</p>{" "}
                  {/* Display the price as needed */}
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartNav;
