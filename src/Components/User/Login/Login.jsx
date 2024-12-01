import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  // State variables to store form data
  const [userName, setUserName] = useState("testuser@test.com"); // userName (email)
  const [password, setPassword] = useState("1234567890"); // password
  const [error, setError] = useState(""); // store error messages
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Create the login data object
    const loginData = {
      UserName: userName,
      Password: password,
    };

    try {
      // Send POST request to the backend API for login
      const response = await axios.post(
        "https://zera.azurewebsites.net/api/Auth/login",
        loginData
      );

      if (response.status === 200) {
        const { token } = response.data;

        // Store the JWT token in localStorage
        localStorage.setItem("token", token);

        alert("Login successful!");

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        navigate("/shop");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email (Username):</label>
            <input
              type="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

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
