import React, { useState, useEffect } from "react";
import {
  GetCartByUserId,
  CreateCartItem,
  RemoveItem,
  UpdatecartItem,
} from "../Carts/GetAllCarts";

const Cart = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the cart when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const fetchedCart = await getCartByUserId(userId);
        setCart(fetchedCart);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cart.");
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleAddItem = async (productId, quantity) => {
    if (!cart) return;
    try {
      const addedItem = await addItemToCart(cart.cartId, productId, quantity);
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: [...prevCart.cartItems, addedItem],
      }));
    } catch (error) {
      setError("Failed to add item to cart.");
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeItemFromCart(cartItemId);
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.filter(
          (item) => item.cartItemId !== cartItemId
        ),
      }));
    } catch (error) {
      setError("Failed to remove item from cart.");
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      setError("Failed to update item quantity.");
    }
  };

  if (loading) return <div>Loading your cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart && cart.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.cartItemId}>
                <div>
                  <h3>{item.product.name}</h3>
                  <p>Price: ${item.product.price}</p>
                  <p>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleUpdateQuantity(item.cartItemId, e.target.value)
                      }
                    />
                  </p>
                  <button onClick={() => handleRemoveItem(item.cartItemId)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Example for adding an item */}
      <button onClick={() => handleAddItem(1, 2)}>Add Product 1 to Cart</button>
    </div>
  );
};

export default Cart;
