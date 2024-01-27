import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./shop.css";
import { Button, Card, Col, Collapse, Input, Popover, Row, Space } from "antd";

import ModalDetailSP from "./modalDetailSP";
export const Shop = ({ children }) => {
    const [openModalDetailSP, setOpenModalDetailSP] = useState(false);
 const [hoveredCard, setHoveredCard] = useState(null);

 const handleMouseEnter = (cardId) => {
   setHoveredCard(cardId);
 };

 const handleMouseLeave = () => {
   setHoveredCard(null);
 };


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <div>
      <div className="banner-san-pham-shop">
        <img src="https://d-themes.com/react/molla/demo-10/images/page-header-bg.jpg?fbclid=IwAR1a29UEcWcX-xX8mdyf6lSt9-lm8LB4tzbz4wscKg5yBPhlzyzWfIcjmF0"></img>
        <h1 className="text-center" style={{ marginTop: -130 }}>
          Sản phẩm
        </h1>
      </div>
      <br></br> <br></br>
      <div className="row mt-5">
        {/* lọc filter */}
        <Space direction="vertical" className="col-md-3">
          <Collapse
            collapsible="header"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Giá",
                children: (
                  <div>
                    <div>
                      <a>Cao - Thấp</a>
                    </div>

                    <a>Thấp - Cao</a>
                  </div>
                ),
              },
            ]}
          />
          <Collapse
            collapsible="header"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Sản phẩm",
                children: <a>Sản phẩm 1</a>,
              },
            ]}
          />
          <Collapse
            collapsible="icon"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Màu sắc",
                children: (
                  <div>
                    <div className="row">
                      <div className="col-md-2 ">
                        <Button
                          className="mt-2 "
                          style={{
                            backgroundColor: "red", //`${listSanPham.tenMauSac}`
                            borderRadius: 20,
                            width: 30,
                            height: 30,
                          }}
                        ></Button>
                      </div>
                      <div className="col-md-2">
                        <Button
                          className="mt-2 "
                          style={{
                            backgroundColor: "black", //`${listSanPham.tenMauSac}`
                            borderRadius: 20,
                            width: 30,
                            height: 30,
                          }}
                        ></Button>
                      </div>
                      <div className="col-md-2">
                        <Button
                          className="mt-2 "
                          style={{
                            backgroundColor: "pink", //`${listSanPham.tenMauSac}`
                            borderRadius: 20,
                            width: 30,
                            height: 30,
                          }}
                        ></Button>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <Collapse
            collapsible="icon"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Size",
                children: (
                  <div>
                    <div className="row">
                      <div className="col-md-2">
                        <Input
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        ></Input>
                      </div>
                      <h6 className="col">37</h6>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <Input
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        ></Input>
                      </div>
                      <h6 className="col">38</h6>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <Input
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        ></Input>
                      </div>
                      <h6 className="col">39</h6>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <Input
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        ></Input>
                      </div>
                      <h6 className="col">40</h6>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </Space>
        <div className="col-md-9  ">
          <Row gutter={16} className="mb-3">
            <Col span={8} className="sanpham-item">
              <Card
                bordered={false}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="image-container">
                  <div>
                    <img
                      className={`image ${hoveredCard === 1 ? "" : "hidden"}`}
                      src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                      alt="Product 1"
                    />
                    <img
                      className={`image ${hoveredCard === 1 ? "hidden" : ""}`}
                      src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                      alt="Product 2"
                    />
                  </div>
                </div>
                <h6 className="mt-2 text-center">Nike Adidas Grand Court</h6>
                <h6 className="d-flex justify-content-center align-items-center mt-2">
                  1.000.000 <span>VND</span>
                </h6>
                {/* Your Card content */}
                {hoveredCard === 1 && (
                  <div className="d-flex justify-content-center mt-2">
                    <Button
                      className="buy-now-button mr-2"
                      onClick={() => console.log("Clicked Buy Now")}
                    >
                      Mua Ngay
                    </Button>
                    <Button
                      className="buy-now-button"
                      onClick={() => setOpenModalDetailSP(true)}
                    >
                      Quick View
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
            <Col span={8} className="sanpham-item">
              <Card
                bordered={false}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="image-container">
                  <div>
                    <img
                      className={`image ${hoveredCard === 1 ? "" : "hidden"}`}
                      src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                      alt="Product 1"
                    />
                    <img
                      className={`image ${hoveredCard === 1 ? "hidden" : ""}`}
                      src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                      alt="Product 2"
                    />
                  </div>
                </div>
                <h6 className="mt-2 text-center">Nike Adidas Grand Court</h6>
                <h6 className="d-flex justify-content-center align-items-center mt-2">
                  1.000.000 <span>VND</span>
                </h6>
                {/* Your Card content */}
                {hoveredCard === 1 && (
                  <div className="d-flex justify-content-center mt-2">
                    <Button
                      className="buy-now-button mr-2"
                      onClick={() => console.log("Clicked Buy Now")}
                    >
                      Mua Ngay
                    </Button>
                    <Button
                      className="buy-now-button"
                      onClick={() => setOpenModalDetailSP(true)}
                    >
                      Quick View
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
            <Col span={8} className="sanpham-item">
              <Card
                bordered={false}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="image-container">
                  <div>
                    <img
                      className={`image ${hoveredCard === 1 ? "" : "hidden"}`}
                      src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                      alt="Product 1"
                    />
                    <img
                      className={`image ${hoveredCard === 1 ? "hidden" : ""}`}
                      src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                      alt="Product 2"
                    />
                  </div>
                </div>
                <h6 className="mt-2 text-center">Nike Adidas Grand Court</h6>
                <h6 className="d-flex justify-content-center align-items-center mt-2">
                  1.000.000 <span>VND</span>
                </h6>
                {/* Your Card content */}
                {hoveredCard === 1 && (
                  <div className="d-flex justify-content-center mt-2">
                    <Button
                      className="buy-now-button mr-2"
                      onClick={() => console.log("Clicked Buy Now")}
                    >
                      Mua Ngay
                    </Button>
                    <Button
                      className="buy-now-button"
                      onClick={() => setOpenModalDetailSP(true)}
                    >
                      Quick View
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
            {/* Similar code for other Col spans */}
          </Row>
        </div>
      </div>
      <ModalDetailSP
        openModalDetailSP={openModalDetailSP}
        setOpenModalDetailSP={setOpenModalDetailSP}
      />
    </div>
  );
};
