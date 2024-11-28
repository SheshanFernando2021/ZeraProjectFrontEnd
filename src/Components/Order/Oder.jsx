import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";

const API_URL_CART = "https://zera.azurewebsites.net/api/cart";
const API_URL_ORDER = "https://zera.azurewebsites.net/api/order";

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cartId, setCartId] = useState("");
  const [cartUniqueId, setCartUniqueId] = useState("");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [paypalEmail, setPaypalEmail] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL_CART}/usercart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming cartItems and the unique cart Id are included in the response.
        setCartItems(response.data.cartItems.$values);
        const total = response.data.cartItems.$values.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotalAmount(total);

        setCartId(response.data.cartId);
        setCartUniqueId(response.data.id);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cart items. Please try again later.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleSubmitOrder = async () => {
    const token = localStorage.getItem("token");
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (paymentMethod === "Credit Card") {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv ||
        !cardDetails.nameOnCard
      ) {
        setError("Please fill in all credit card details.");
        return;
      }
    }

    if (paymentMethod === "PayPal") {
      if (!paypalEmail) {
        setError("Please enter your PayPal email.");
        return;
      }
    }

    try {
      const orderPayload = {
        OrderDate: new Date().toISOString(),
        ShippingDate: new Date().toISOString(),
        ShippingAddress: "User Address Here",
        TotalAmount: totalAmount,
        status: "Pending",
        PaymentMethod: paymentMethod,
      };

      const orderId = Math.floor(Math.random() * 1000);
      console.log(`Order #${orderId} created locally.`);

      if (!cartId || !cartUniqueId) {
        setError("Cart ID not found. Please try again.");
        return;
      }

      const response = await axios.delete(`${API_URL_CART}/Delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { cartId: cartId, Id: cartUniqueId }, // Send both cartId (email) and Id (unique cart ID)
      });

      console.log("Cart deletion response:", response);

      setSuccessMessage(
        `Order #${orderId} successfully submitted. Cart cleared.`
      );
      setCartItems([]);
      setTotalAmount(0);
    } catch (err) {
      setError("Failed to submit the order. Please try again later.");
      console.error(err);
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-container">
      <h2>Order Summary</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="order-items">
            {cartItems.map((item) => (
              <div className="order-item" key={item.cartItemId}>
                <h3>{item.product.productName}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="order-total">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>

          <div className="payment-method">
            <label htmlFor="payment-method">Payment Method:</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {/* Render Credit Card Inputs */}
          {paymentMethod === "Credit Card" && (
            <div className="credit-card-details">
              <h3>Credit Card Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
              />
              <input
                type="text"
                placeholder="CVV"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
              />
              <input
                type="text"
                placeholder="Name on Card"
                name="nameOnCard"
                value={cardDetails.nameOnCard}
                onChange={handleCardDetailsChange}
              />
            </div>
          )}

          {/* Render PayPal Email Input */}
          {paymentMethod === "PayPal" && (
            <div className="paypal-details">
              <h3>PayPal Email</h3>
              <input
                type="email"
                placeholder="PayPal Email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
              />
            </div>
          )}

          <button onClick={handleSubmitOrder} className="submit-order-btn">
            Submit Order
          </button>
        </>
      )}

      {successMessage && (
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>{successMessage}</p>
          <p>
            Your order is on its way. You'll receive a confirmation email
            shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;
