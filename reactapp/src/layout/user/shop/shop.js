import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./shop.css";
import { Button, Card, Col, Collapse, Input, Popover, Row, Space } from "antd";
import { ProductCard } from "../productCard";
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


 const products = [
   {
     name: "Product 1",
     price: "$29.99",
     image:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg",
     hoverImage:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369416/z5112244337734_c47ff61cb4fea73d3f86511d1cd98cd5_jmaz2r.jpg",
   },
   {
     name: "Product 2",
     price: "$39.99",
     image:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg",
     hoverImage:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244328612_12aeebf03e6a619c5ece84623d562ee8_zh6isc.jpg",
   },
   {
     name: "Product 3",
     price: "$49.99",
     image:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369417/z5112244347228_606242593e3dc68cd054f7b04dfe6011_umomep.jpg",
     hoverImage:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369418/z5112244349534_fae017512dfd31dc78d51f18b1721554_aokiwg.jpg",
   },
   {
     name: "Product 4",
     price: "$59.99",
     image:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369418/z5112244357653_374000deb4a875eb0c274e45065f9875_popcgk.jpg",
     hoverImage:
       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369416/z5112244329159_f5bc31899ed8c375a9132e4b43d18e8e_ewatzh.jpg",
   },
 ];
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
        <Space direction="vertical" className="col-md-2">
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
        <div className="col-md-10  ">
          <Row gutter={16} className="mb-3">
            <div class="container">
              <div className="row">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
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
