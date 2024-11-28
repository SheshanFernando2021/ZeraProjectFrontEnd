import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios

import Menu from "../../assets/menu1.svg";
import Close from "../../assets/Close.svg";
import Account from "../../assets/Account.svg";
import Cart from "../../assets/Cart.svg";
import Contact from "../../assets/Contact.svg";
import Login from "../../assets/Login.svg";
import Logout from "../../assets/Logout.svg";
import shop from "../../assets/shop.svg";
import us from "../../assets/us.svg";

import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggle = () => {
    setOpen(!open);
  };

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      // Check if a token exists in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true); // If token exists, the user is logged in
      } else {
        setIsLoggedIn(false); // No token, the user is not logged in
      }
    };

    checkLoginStatus();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Handle logout
  const handleLogout = async () => {
    try {
      // Remove the token from localStorage to log the user out
      localStorage.removeItem("token");
      setIsLoggedIn(false);

      // Redirect to the login page after logout
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="NavbarContainer">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="Logo">ZERA</h1>
      </Link>
      <img
        className="MenuIcon"
        src={open ? Menu : Close}
        alt="menu"
        onClick={toggle}
      />
      {!open && (
        <ul className="MenuVertical">
          <li>
            <Link
              to="/shop"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Shop <img src={shop} alt="shop" />
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contact <img src={Contact} alt="contact" />
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Cart <img src={Cart} alt="cart" />
            </Link>
          </li>

          {isLoggedIn ? (
            <li onClick={handleLogout}>
              Log Out <img src={Logout} alt="logout" />
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login <img src={Login} alt="login" />
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register <img src={Login} alt="register" />
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
      <ul className="MenuFlat">
        <li>
          <Link to="/shop" style={{ color: "inherit", textDecoration: "none" }}>
            Shop
          </Link>
        </li>

        <li>
          {" "}
          <Link
            to="/contact"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Contact
          </Link>
        </li>
        {isLoggedIn ? (
          <li onClick={handleLogout}>Log Out</li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
