import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./shop.css";
import { Button, Slider, Checkbox, Card, Col, Collapse, Dropdown, Input, Popover, Row, Space } from "antd";
import { ProductCard } from "../productCard";
import ModalDetailSP from "./modalDetailSP";
import { HomeAPI } from "../../../pages/censor/api/home/homeApi";
import { HangAPI } from "../../../pages/censor/api/SanPham/hang.api";
import { MauSacAPI } from "../../../pages/censor/api/SanPham/mauSac.api";
import { KichThuocAPI } from "../../../pages/censor/api/SanPham/kichThuoc.api";
import { SortDescendingOutlined } from "@ant-design/icons";

export const Shop = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [hang, setHangs] = useState([]);
  const [mauSac, setMauSacs] = useState([]);
  const [kichThuoc, setKichThuocs] = useState([]);
  const [openModalDetailSP, setOpenModalDetailSP] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { Search } = Input;
  const onChange = (value) => {
    console.log('onChange: ', value);
  };
  const onChangeComplete = (value) => {
    console.log('onChangeComplete: ', value);
  };

  const handleMouseEnter = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };


  const getAll = () => {
    HomeAPI.getAllSanPham()
      .then((res) => {
        setProducts(res.data);
      })
  }

  const getAllHang = () => {
    HangAPI.getAll()
      .then((res) => {
        setHangs(res.data);
      })
  }

  const getAllMauSac = () => {
    MauSacAPI.getAll()
      .then((res) => {
        setMauSacs(res.data);
      })
  }

  const getAllKichThuoc = () => {
    KichThuocAPI.getAll()
      .then((res) => {
        setKichThuocs(res.data);
      })
  }
  console.log(mauSac)

  useEffect(() => {
    getAll();
    getAllHang();
    getAllMauSac();
    getAllKichThuoc();
  }, [])

  const items = [
    {
      key: '1',
      label: (
        <a>
          Phổ biến
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a>
          Giá tăng dần
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a>
          Giá giảm dần
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a>
          Từ A-Z
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a>
          Từ Z-A
        </a>
      ),
    },
  ]

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
                  <Slider
                    range
                    step={1000000}
                    defaultValue={[1000000, 40000000]}
                    min={1000000}
                    max={40000000}
                    onChange={onChange}
                    onChangeComplete={onChangeComplete}
                  />
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
                children: hang.map((hang) => (
                  <div key={hang.id}>{hang.ten}</div>
                )),
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
                      {mauSac.map((mau, index) => {
                        return (
                          <div className="col-md-2 ">
                            <Button
                              className="mt-2 "
                              style={{
                                backgroundColor: `${mau.ma}`, //`${listSanPham.tenMauSac}`
                                borderRadius: 20,
                                width: 30,
                                height: 30,
                              }}
                            ></Button>
                          </div>
                        );
                      })}

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
                    <Checkbox.Group>
                      {kichThuoc.map((kichThuoc, index) => {
                        return (
                          <Col>
                            <Checkbox value={kichThuoc.id}><b>{kichThuoc.ten}</b></Checkbox>
                          </Col>
                        );
                      })}

                    </Checkbox.Group>
                  </div>
                ),
              },
            ]}
          />
        </Space>
        <div className="col-md-10  ">
          <Row gutter={16} className="mb-3">
             <div className="ms-4 me-2">
              <Search
                placeholder="Nhập tên sản phẩm ..."
                style={{
                  width: 200,
                }}
              />
            </div>
            <div>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
                arrow
              >
                <Button icon={<SortDescendingOutlined/>}>Sắp xếp</Button>
              </Dropdown>
            </div>
           
            <div class="container">
              <div className="row me-2">
                {products.map((product, index) => {
                  return (
                    <div className="col-md-3" >
                      <ProductCard key={index} product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
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
