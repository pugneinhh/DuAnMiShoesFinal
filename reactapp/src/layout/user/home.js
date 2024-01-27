import "./home.css";
import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "400px",
  color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
  background: "#364d79",
};
export const Home = ({ children }) => {
  return (
    <>
      <Carousel style={contentStyle}>
        <div>
          <img
            src="https://d-themes.com/react/molla/demo-10/images/home/sliders/slide-1.jpg"
            height={"450px"}
            width={"1400px"}
          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Deals and Promotions</h3>
              <h1 class="intro-title text-white">Sneakers & Athletic Shoes</h1>
              <div class="intro-price text-white">from $9.99</div>
              <a
                class="btn btn-white-primary btn-round "
                href="/react/molla/demo-10/shop/sidebar/list/"
              >
                <span>SHOP NOW</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://d-themes.com/react/molla/demo-10/images/home/sliders/slide-3.jpg"
            height={"450px"}
            width={"1400px"}
          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Deals and Promotions</h3>
              <h1 class="intro-title text-white">Can’t-miss Clearance:</h1>
              <div class="intro-price text-white">starting at 60% off</div>
              <a
                class="btn btn-white-primary btn-round"
                href="/react/molla/demo-10/shop/sidebar/list/"
              >
                <span>SHOP NOW</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <img
            src="http://res.cloudinary.com/dm0w2qws8/image/upload/v1706200379/rry3semtlkngaf9ktaqw.jpg"
            // height={"400px"}
            // width={"1152px"}
            height={"450px"}
            width={"1400px"}
          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Trending Now</h3>
              <h1 class="intro-title text-white">This Week's Most Wanted</h1>
              <div class="intro-price text-white">from $49.99</div>
              <a
                class="btn btn-white-primary btn-round"
                href="/react/molla/demo-10/shop/sidebar/list/"
              >
                <span>SHOP NOW</span>
              </a>
            </div>
          </div>
        </div>
      </Carousel>
      <br></br> <br></br>
      hihi
    </>
  );
};
