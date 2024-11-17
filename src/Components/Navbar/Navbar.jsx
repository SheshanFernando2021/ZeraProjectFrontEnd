import React from "react";
import Menu from "../../assets/menu1.svg";
import Close from "../../assets/Close.svg";
import Account from "../../assets/Account.svg";
import Cart from "../../assets/Cart.svg";
import Contact from "../../assets/Contact.svg";
import Login from "../../assets/Login.svg";
import Logout from "../../assets/Logout.svg";
import shop from "../../assets/shop.svg";
import us from "../../assets/us.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="NavbarContainer">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="Logo">ZERA</h1>
      </Link>
      <img
        className="MenuIcon"
        src={open ? Menu : Close}
        alt=""
        onClick={toggle}
      />
      {!open && (
        <ul className="MenuVertical">
          <li>
            <Link
              to="/shop"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Shop <img src={shop} alt="" />
            </Link>
          </li>
          <li>
            About <img src={us} alt="" />
          </li>
          <li>
            Contact <img src={Contact} alt="" />
          </li>
          <li>
            Cart
            <img src={Cart} alt="" />
          </li>
          <li>
            Account <img src={Account} alt="" />
          </li>
          <li>
            Log Out
            <img src={Logout} alt="" />
          </li>
          <li>
            Login <img src={Login} alt="" />
          </li>
        </ul>
      )}
      <ul className="MenuFlat">
        <li>
          <Link to="/shop" style={{ color: "inherit", textDecoration: "none" }}>
            Shop
          </Link>
        </li>
        <li>About</li>
        <li>Contact</li>
        <li>Login</li>
        <li>Cart</li>
        <li>Account</li>
      </ul>
    </div>
  );
};

export default Navbar;
