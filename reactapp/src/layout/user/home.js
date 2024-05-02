import "./home.css";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Carousel, Tabs } from "antd";
import { FaShippingFast } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineSupport } from "react-icons/md";
import { ProductCard } from "./productCard";
import { HomeAPI } from "../../pages/censor/api/home/homeApi";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
const contentStyle = {
  height: "450px",
  color: "#fff",
  background: "#364d79",
};
const { TabPane } = Tabs;
export const Home = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);

  const getNew = () => {
    HomeAPI.getAllNewSanPham()
      .then((res) => {
        setNewProducts(res.data);
      })
  }

  const getHot = () => {
    HomeAPI.getHotSale()
      .then((res) => {
        setHotProducts(res.data);
      })
  }
      var stomp = null;
      const socket = new SockJS("http://localhost:8080/ws");
      stomp = Stomp.over(socket);
        useEffect(() => {
          const connectWebSocket = () => {
            const socket = new SockJS("http://localhost:8080/ws");
            stomp = Stomp.over(socket);
            stomp.connect(
              {},
              () => {
                console.log("connect websocket");

                stomp.subscribe("/topic/KH/hoa-don", (mes) => {
                  try {
                    const pare = JSON.parse(mes.body);
                    console.log(pare);
                    getHot();
                    getNew();
                  } catch (e) {
                    console.log("lỗi mẹ ròi xem code di: ", e);
                  }
                });
              },
              (error) => {
                console.error("Failed to connect to WebSocket:", error);
                // Thử kết nối lại sau một khoảng thời gian
                setTimeout(connectWebSocket, 1000);
              }
            );
          };
          connectWebSocket();
          return () => {
            stomp.disconnect();
          };
        }, []);
  useEffect(() => {
    getHot();
    getNew();
  }, [])

  return (

    <div className="container">
      <Carousel style={contentStyle}>
        <div>
          <img
            src="https://d-themes.com/react/molla/demo-10/images/home/sliders/slide-1.jpg"
            height={"450px"}
            width={"1296px"}

          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Ưu đãi và Khuyến mãi</h3>
              <h1 class="intro-title text-white">Chỉ có tại MiShoes</h1>
              <div class="intro-price text-white">giảm tới 500.000 VNĐ</div>
              <a
                class="btn btn-white-primary btn-round"
                href="/san-pham"
              >
                <span>Mua Ngay</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://d-themes.com/react/molla/demo-10/images/home/sliders/slide-3.jpg"
            height={"450px"}
            width={"1296px"}
          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Ưu đãi và khuyến mãi</h3>
              <h1 class="intro-title text-white">Can’t-miss Clearance:</h1>
              <div class="intro-price text-white">starting at 60% off</div>
              <a
                class="btn btn-white-primary btn-round"
                href="/san-pham"
              >
                <span>Mua Ngay</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <img
            src="http://res.cloudinary.com/dm0w2qws8/image/upload/v1706200379/rry3semtlkngaf9ktaqw.jpg"
            height={"450px"}
            width={"1296px"}
          />
          <div class="intro-content">
            <div class="css-sanqhm">
              <h3 class="intro-subtitle text-white">Trending Now</h3>
              <h1 class="intro-title text-white">This Week's Most Wanted</h1>
              <div class="intro-price text-white">from $49.99</div>
              <a
                class="btn btn-white-primary btn-round"
                href="/san-pham"
              >
                <span>Mua Ngay</span>
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
                <img src="https://d-themes.com/react/molla/demo-10/images/home/banners/banner-1.jpg" width={"420px"}
                  height={"250px"} />
                <div class="banner-content ">
                  <h4 class="banner-subtitle ms-5">Trải Nghiệm Mới</h4>
                  <h3 class="banner-title text-white ms-5">
                    Các Mẫu
                    <br /> Sneaker
                  </h3>
                  <a class="btn btn-outline-white banner-link btn-round ms-5 mt-3" href="/san-pham">
                    Khám Phá Ngay
                  </a>
                </div>
              </div>
              <div className="col-sm-6 banner-group p-2">
                <img
                  src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706366863/dzdho3purfpnaryldhqz.jpg"
                  width={"420px"}
                  height={"250px"}
                />
                <div class="banner-content-left ">
                  <h4 class="banner-subtitle text-dark">Hè Siêu Sale</h4>
                  <h3 class="banner-title text-dark">Nike</h3>
                  <div class="banner-text">giảm tới 30%</div>
                  <a class="btn btn-outline-dark btn-round banner-link mt-3" href="/san-pham">
                    Mua Ngay
                  </a>
                </div>
              </div>
            </div>
            <div className="banner-group">
              <img
                src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706367750/py3zfnmo5nlc2tl7hkrw.jpg"
                width={"855px"}
                height={"255px"}
              />
              <div class="banner-content-middle mt-3">
                <h4 class="banner-subtitle text-dark">Sale Sốc</h4>
                <h3 class="banner-title text-dark">Các Mẫu Sneaker </h3>
                <div class="banner-text">giảm tới 30%</div>
                <a class="btn btn-outline-dark btn-round banner-link mt-3" href="/san-pham">
                  Mua Ngay
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 banner-group p-2">
            <img
              src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369319/z5112262374541_8cb528ffa3d8249cb5bc7f9016e6d84a_geadua.jpg"
              width={"410px"}
              height={"520px"}
            />
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
                  <h3 class="icon-box-title">Miễn Phí Vận Chuyển</h3>
                  <p>Cho đơn từ 2 triệu</p>
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
                <h3 class="icon-box-title">Trả Hàng Tại Cửa Hàng</h3>
                <p>Trong vòng 7 ngày</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 border-box">
            <div class="icon-box icon-box-side">
              <span class="icon-box-icon text-primary">
                <IoIosInformationCircleOutline size={40} color="#445f84" />
              </span>
              <div class="icon-box-content">
                <h3 class="icon-box-title">Nhận Nhiều Ưu Đãi</h3>
                <p>Khi đăng ký tài khoản</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="icon-box icon-box-side">
              <span class="icon-box-icon text-primary">
                <MdOutlineSupport size={40} color="#445f84" />
              </span>
              <div class="icon-box-content">
                <h3 class="icon-box-title">Hỗ Trợ</h3>
                <p>Dịch vụ tuyệt vời 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm */}

      <div className="container mt-5">
        <h3 className="text-center">Sản phẩm</h3>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Sản phẩm bán chạy" key="1">
            <div class="container">
              <div className="row">
                {hotProducts.map((product, index) => {
                  return (
                    <div className="col-md-3" >
                      <ProductCard key={index} product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Sản phẩm mới" key="2">
            <div class="container">
              <div className="row">
                {newProducts.map((product, index) => {
                  return (
                    <div className="col-md-3" >
                      <ProductCard key={index} product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
