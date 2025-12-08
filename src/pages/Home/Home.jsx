import React from "react";
import "./Home.css";
import heroImg from "../../assets/img/hero_img.png";
import heroElement1 from "../../assets/img/hero-element_1.png";
import heroElement2 from "../../assets/img/hero-element_2.png";
import bauble1 from "../../assets/icon/bauble_1.svg";
import bauble2 from "../../assets/icon/bauble_2.svg";
import bauble3 from "../../assets/icon/bauble_3.svg";

const Home = () => {
  return (
    <div className="home-container">
      {/* Top banner med hero-element 1 */}
      <div className="banner top-banner">
        <img src={heroElement1} alt="Top decoration" className="banner-img" />
      </div>

      {/* Main content med hero_img som overlay */}
      <div className="main-content">
        <img
          src={heroImg}
          alt="Background decoration"
          className="hero-overlay"
        />

        {/* Snowfall animation */}
        <div className="snowfall"></div>

        {/* Title section */}
        <div className="title-section">
          {/* Baubles above title */}
          <div className="baubles">
            <img src={bauble1} alt="Decoration" className="bauble" />
            <img src={bauble2} alt="Decoration" className="bauble" />
            <img src={bauble3} alt="Decoration" className="bauble" />
          </div>

          <h1 className="main-title">Julie Jeopardy</h1>
          <h2 className="subtitle">En festlig quiz for hele familien</h2>
        </div>

        {/* Opstilling knap */}
        <button className="opstilling-button">Opstilling</button>
      </div>

      {/* Bottom banner med hero-element 2 */}
      <div className="banner bottom-banner">
        <img
          src={heroElement2}
          alt="Bottom decoration"
          className="banner-img"
        />
      </div>
    </div>
  );
};

export default Home;
