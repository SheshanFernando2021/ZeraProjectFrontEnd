import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Login.css";

const Login = () => {
  // State variables to store form data
  const [userName, setUserName] = useState(""); // userName (email)
  const [password, setPassword] = useState(""); // password
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const navigate = useNavigate(); // useNavigate hook for redirection

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous error

    // Create the login data object
    const loginData = {
      UserName: userName,
      Password: password,
    };

    try {
      // Send POST request to the backend API for login
      const response = await axios.post(
        "https://zera.azurewebsites.net/api/auth/login", // Make sure this matches the backend route
        loginData
      );

      if (response.status === 200) {
        // Assuming the response contains the token
        const { token } = response.data;

        // Store the JWT token in localStorage
        localStorage.setItem("token", token);

        alert("Login successful!");

        // Optionally set Authorization header for subsequent requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirect to the shop page after successful login
        navigate("/shop");
      }
    } catch (err) {
      // Display error message on failure
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <h2>Login</h2>

        {/* Show error message if any */}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* UserName (Email) input */}
          <div>
            <label>Email (Username):</label>
            <input
              type="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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

          {/* Submit button */}
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
