import React from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import ProductList from "./Components/Product/ProductListfolder/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart/Cart components/Cart";
const ShopLayout = () => (
  <>
    <Navbar />
    <ProductList />
  </>
);
const HomeLayout = () => (
  <>
    <Navbar />
    <Home />
    <NewArrivals />
  </>
);
const CartLayout =()=>(
  <>
    <Navbar />
    <Cart />
  </>
);
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/shop" element={<ShopLayout />} />
        <Route path="/cart" element={<CartLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
