import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${response.status} ${errorText} Please Re-Login`);
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

  const updateCartItem = async (id, quantity) => {
    const token = localStorage.getItem("token");

    // Find the cart item to retrieve productId
    const cartItem = cartItems.find((item) => item.cartItemId === id);
    if (!cartItem) {
      console.error("Cart item not found.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5167/api/cartitem/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItemId: id,
          quantity,
          price: cartItem.price,
          cartId: cartItem.cartId,
          productId: cartItem.product.productId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update cart item: ${response.status}`);
      }

      // Update cart state locally after successful response
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === id ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteCartItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5167/api/cartitem/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete cart item: ${response.status}`);
      }

      // Remove item from local state after successful response
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cartItemId !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

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
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateCartItem(item.cartItemId, item.quantity - 1)
                      }
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItem(item.cartItemId, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => deleteCartItem(item.cartItemId)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <button
            className="place-order-btn"
            onClick={() => navigate("/order")}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
