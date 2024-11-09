import React from "react";
import "./Home.css";
import men from "../../assets/men.png";
import women from "../../assets/women.png";
const Home = () => {
  return (
    <div className="HomeContainer">
      <div className="headline">
        <h1>Welcome to ZERA - Unleash Your Inner Fashionista!</h1>
        <p>
          Step into a world of elegance and sophistication with our exclusive
          clothing line designed just for you.
        </p>
      </div>
      <div className="left">
        <img src={men} alt="" />
      </div>
      <div className="right">
        <img src={women} alt="" />
      </div>
    </div>
  );
};

export default Home;
