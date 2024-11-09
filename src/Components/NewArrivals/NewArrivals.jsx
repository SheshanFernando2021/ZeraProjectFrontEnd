import React from "react";
import "./NewArrivals.css";
import w1 from "../../assets/Women/w1.jpg";
import w2 from "../../assets/Women/w2.jpg";
import w3 from "../../assets/Women/w3.jpg";
import w4 from "../../assets/Women/w4.jpg";
import w5 from "../../assets/Women/w5.jpg";
import w6 from "../../assets/Women/w6.jpg";
import w7 from "../../assets/Women/w7.jpg";
import w8 from "../../assets/Women/w8.jpg";
import w9 from "../../assets/Women/w9.jpg";
import w10 from "../../assets/Women/w10.jpg";

const NewArrivals = () => {
  return (
    <div className="NewArrivalsContainer">
      <div className="NewArrivalsItemContainer">
        <div className="item1">
          <img src={w1} alt="" />
          <div className="label">
            <h4>SHORT PLAIN KNIT DRESS | </h4>
            <p>29.79£</p>
          </div>
        </div>
        <div className="item2">
          <img src={w2} alt="" />
          <div className="label">
            <h4>KNIT WRAP MINI DRESS |</h4>
            <p>39.79£</p>
          </div>
        </div>
        <div className="item3">
          <img src={w3} alt="" />
          <div className="label">
            <h4>JACQUARD MIDI DRESS |</h4>
            <p>39.99£</p>
          </div>
        </div>
        <div className="item4">
          <img src={w4} alt="" />
          <div className="label">
            <h4>SHORT BUTTON-UP DRESS |</h4>
            <p>29.99£</p>
          </div>
        </div>
        <div className="item5">
          <img src={w5} alt="" />
          <div className="label">
            <h4>MLT BTTN DRSS 14 |</h4>
            <p>109.00£</p>
          </div>
        </div>
        <div className="item6">
          <img src={w6} alt="" />
          <div className="label">
            <h4>SOFT BELTED DRESS |</h4>
            <p>25.79£</p>
          </div>
        </div>
        <div className="item7">
          <img src={w7} alt="" />
          <div className="label">
            <h4>SHORT SATIN DRESS |</h4>
            <p>29.79£</p>
          </div>
        </div>
        <div className="item8">
          <img src={w8} alt="" />
          <div className="label">
            <h4>SHORT PLAIN KNIT DRESS |</h4>
            <p>25.79£</p>
          </div>
        </div>
        <div className="item9">
          <img src={w9} alt="" />
          <div className="label">
            <h4>SHORT PLAIN KNIT DRESS |</h4>
            <p>38.79£</p>
          </div>
        </div>
        <div className="item10">
          <img src={w10} alt="" />
          <div className="label">
            <h4>ASYMMETRIC DRESS |</h4>
            <p>25.79£</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
