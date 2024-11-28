import React from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import ProductList from "./Components/Product/ProductListfolder/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart/Cart components/Cart";
import Register from "./Components/User/Register/Register";
import Login from "./Components/User/Login/Login";
import Order from "./Components/Order/Oder";
import Contact from "./Components/Contact/Contact";
const ShopLayout = () => (
  <>
    <Navbar />
    <ProductList />
  </>
);
const RegisterLayout = () => (
  <>
    <Navbar />
    <Register />
  </>
);
const LoginLayout = () => (
  <>
    <Navbar />
    <Login />
  </>
);
const HomeLayout = () => (
  <>
    <Navbar />
    <Home />
    <NewArrivals />
  </>
);
const CartLayout = () => (
  <>
    <Navbar />
    <Cart />
  </>
);
const OrderLayout = () => (
  <>
    <Navbar />
    <Order />
  </>
);
const ContactLayout = () => (
  <>
    <Navbar />
    <Contact />
  </>
);
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/shop" element={<ShopLayout />} />
        <Route path="/cart" element={<CartLayout />} />
        <Route path="/register" element={<RegisterLayout />} />
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/order" element={<OrderLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
