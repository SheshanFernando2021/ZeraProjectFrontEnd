import React from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import ProductList from "./Components/Product/ProductListfolder/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  </>
);
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/shop" element={<ShopLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
