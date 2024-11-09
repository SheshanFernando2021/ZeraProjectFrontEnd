import React from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import NewArrivals from "./Components/NewArrivals/NewArrivals";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <NewArrivals />
    </div>
  );
};

export default App;
