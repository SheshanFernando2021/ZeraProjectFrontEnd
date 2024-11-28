import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setSuccessMessage("Please fill in all fields.");
    } else {
      setSuccessMessage("Your message has been sent to us. Thank you!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="containerContact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Contact;
