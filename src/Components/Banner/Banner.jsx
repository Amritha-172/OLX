import React from "react";

import "./Banner.css";
import Arrow from "../../assets/Arrow";
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow>
          </div>
          <div className="otherQuickOptions d-flex">
            <span className="ms-3">Cars</span>
            <span className="ms-3">Motorcy</span>
            <span className="ms-3">Mobile </span>
            <span className="ms-3">For Sale:Houses & Apart</span>
            <span className="ms-3">Scoot</span>
            <span className="ms-3">Commercial & Other </span>
            <span className="ms-3">For Rent: House & Apartment</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
