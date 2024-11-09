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
import "./Navbar.css";
const Navbar = () => {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="NavbarContainer">
      <h1 className="Logo">ZERA</h1>
      <img
        className="MenuIcon"
        src={open ? Menu : Close}
        alt=""
        onClick={toggle}
      />
      {!open && (
        <ul className="MenuVertical">
          <li>
            Shop <img src={shop} alt="" />
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
        <li>Shop</li>
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
