// Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Register.css";

const Register = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // Add password confirmation state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate if password and confirmation match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Create the user data object
    const userData = {
      Name: name,
      Email: email,
      Address: address,
      Password: password,
      PasswordConfirmation: passwordConfirmation, // Include password confirmation in the request body
    };

    try {
      // Send POST request to the backend
      const response = await axios.post(
        "https://zera.azurewebsites.net/api/account/registerUser",
        userData
      );

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerContainer">
      <div className="register">
        <h2>Register</h2>

        {/* Display error message if any */}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email input */}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Address input */}
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Password confirmation input */}
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
