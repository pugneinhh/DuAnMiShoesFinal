import "./home.css";
import React, { useState } from "react";
import { Carousel, Tabs } from "antd";
import { FaShippingFast } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineSupport } from "react-icons/md";
import {ProductCard} from "./productCard";
const contentStyle = {
  height: "400px",
  color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  background: "#364d79",
};
const { TabPane } = Tabs;
export const Home = ({ children }) => {
  const products = [
    {
      name: 'Product 1',
      price: '$29.99',
      image: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg',
      hoverImage: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369416/z5112244337734_c47ff61cb4fea73d3f86511d1cd98cd5_jmaz2r.jpg',
    },
    {
      name: 'Product 2',
      price: '$39.99',
      image: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg',
      hoverImage: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244328612_12aeebf03e6a619c5ece84623d562ee8_zh6isc.jpg',
    },
    {
      name: 'Product 3',
      price: '$49.99',
      image: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369417/z5112244347228_606242593e3dc68cd054f7b04dfe6011_umomep.jpg',
      hoverImage: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369418/z5112244349534_fae017512dfd31dc78d51f18b1721554_aokiwg.jpg',
    },
    {
      name: 'Product 4',
      price: '$59.99',
      image: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369418/z5112244357653_374000deb4a875eb0c274e45065f9875_popcgk.jpg',
      hoverImage: 'https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369416/z5112244329159_f5bc31899ed8c375a9132e4b43d18e8e_ewatzh.jpg',
    },
  ];
  return (

    <div className="container">

      <Carousel style={contentStyle}>
        <div>
          <img
            src="https://d-themes.com/react/molla/demo-10/images/home/sliders/slide-1.jpg"
         
            height={"400px"}
            width={"1152px"}

          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Deals and Promotions</h3>
              <h1 class="intro-title text-white">Sneakers & Athletic Shoes</h1>
              <div class="intro-price text-white">from $9.99</div>
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
            src="https://d-themes.com/react/molla/demo-10/images/home/sliders/slide-3.jpg"
            height={"400px"}
            width={"1152px"}

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
            height={"400px"}
            width={"1152px"}

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

      <div className="ms-1 mt-2">
        <div className="  row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-sm-6 banner-group p-2">
                <img src="https://d-themes.com/react/molla/demo-10/images/home/banners/banner-1.jpg" />
                <div class="banner-content ">
                  <h4 class="banner-subtitle">New Arrivals</h4>
                  <h3 class="banner-title text-white">
                    Sneakers &amp;
                    <br /> Athletic Shoes
                  </h3>
                  <a class="btn btn-outline-white banner-link btn-round">
                    Discover Now
                  </a>
                </div>
              </div>
              <div className="col-sm-6 banner-group p-2">
                <img
                  src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706366863/dzdho3purfpnaryldhqz.jpg"
                  width={"375px"}
                  height={"250px"}
                />
                <div class="banner-content-left ">
                  <h4 class="banner-subtitle text-dark">Clearance</h4>
                  <h3 class="banner-title text-dark">Nike</h3>
                  <div class="banner-text">up to 70% off</div>
                  <a class="btn btn-outline-dark btn-round banner-link ">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div className="banner-group p-2">
              <img
                src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706367750/py3zfnmo5nlc2tl7hkrw.jpg"
                width={"745px"}
                height={"235px"}
              />
              <div class="banner-content-middle">
                <h4 class="banner-subtitle text-dark">On Sale</h4>
                <h3 class="banner-title text-dark">Sneaker</h3>
                <div class="banner-text">up to 30% off</div>
                <a class="btn btn-outline-dark btn-round banner-link">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 banner-group p-2">
            <img
              src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369319/z5112262374541_8cb528ffa3d8249cb5bc7f9016e6d84a_geadua.jpg"
              width={"362px"}
              height={"500px"}
            />
            <div class="banner-content-middle ">
              <h4 class="banner-subtitle text-white">Clearance</h4>
              <h3 class="banner-title text-white">Nike</h3>
              <div class="banner-text text-white">from $39.00 </div>
              <a class="btn btn-outline-white btn-round banner-link">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container mb-2">
        <div class="row">
          <div class="col-sm-6 col-lg-3 border-box">
            <div class="css-mxanrf">
              <div class="icon-box icon-box-side">
                <span class="icon-box-icon text-primary">
                  <FaShippingFast size={40} color="#445f84" />
                </span>
                <div class="icon-box-content">
                  <h3 class="icon-box-title">Free Shipping</h3>
                  <p>Orders $50 or more</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 border-box ">
            <div class="icon-box icon-box-side">
              <span class="icon-box-icon text-primary">
                <TfiReload size={40} color="#445f84" />
              </span>
              <div class="icon-box-content">
                <h3 class="icon-box-title">Free Returns</h3>
                <p>Within 30 days</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 border-box">
            <div class="icon-box icon-box-side">
              <span class="icon-box-icon text-primary">
                <IoIosInformationCircleOutline size={40} color="#445f84" />
              </span>
              <div class="icon-box-content">
                <h3 class="icon-box-title">Get 20% Off 1 Item</h3>
                <p>When you sign up</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="icon-box icon-box-side">
              <span class="icon-box-icon text-primary">
                <MdOutlineSupport size={40} color="#445f84" />
              </span>
              <div class="icon-box-content">
                <h3 class="icon-box-title">We Support</h3>
                <p>24/7 amazing services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm */}

      <div className="container mt-5">
        <h3 className="text-center">New Arrivals</h3>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="ALL" key="1">
            <div class="container">
              <div className="row">
              {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
              </div>
            </div>
          </TabPane>
          <TabPane tab="MEN'S" key="2">
          <div class="container">
              <div className="row">
              {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
              </div>
            </div>
          </TabPane>
          <TabPane tab="WOMEN'S" key="3">
          <div class="container">
              <div className="row">
              {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
