import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Layout,
  theme,
  Image,
  Badge,
  Avatar,
  Dropdown,
  Space,
  Row,
  Col,
  Typography,
  Button,
} from "antd";

import { Link ,useNavigate} from "react-router-dom";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { TbShoppingCartHeart } from "react-icons/tb";
import logoShop from "../../assets/images/logoNgang.png";
import "./client.css";
import { get, set } from "local-storage";
import { GioHangAPI } from "../../pages/censor/api/gioHang/gioHang.api";
const { Header, Content, Footer } = Layout;
export const DashboardClient = ({ children }) => {
    const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [linkAnh, setLinkAnh] = useState("");
  const [countgioHang, setCountGioHang] = useState(0);
  const storedData = get("userData");
    const storedDataGoogle = get("userGoogle");
    const storedDataFaceBook = get("userFacebook");
    const storedGioHang=get("GioHang");

  useEffect(() => {
    if (storedData !== null) {
      setUserName(storedData.ten);
      setLinkAnh(storedData.anh);
      GioHangAPI.getByIDKH(storedData.userID).then((res)=>{
        GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res)=>{
          console.log("giỏ hàng của khách",res.data);
          setCountGioHang(res.data.length);
        })
      })
    } else if (storedDataGoogle != null) {
      setUserName(storedDataGoogle.name);
      setLinkAnh(storedDataGoogle.imageUrl);
    }
    // else if(storedDataFaceBook!=null){
    //         setUserName(storedDataFaceBook.name);
    //         // setLinkAnh(storedDataGoogle.imageUrl);
    // }
    else {
      setUserName(null);
      setLinkAnh(null);
      if(storedGioHang!==null){
        console.log("giỏ hàng",storedGioHang)
        GioHangAPI.getAllGHCTByIDGH(storedGioHang.id).then((res)=>{
          setCountGioHang(res.data.length);
          console.log("count",res.data);
        })
      }
    }
  
  }, []);
     const openHistory = () => {
             nav("/history");
        };
        const dangXuat = () => {
             
          localStorage.clear();
           window.location.reload();
        };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Thông tin
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={openHistory}>
          Đơn mua
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <Button target="_blank" rel="noopener noreferrer" onClick={dangXuat}>
          Đăng xuất
        </Button>
      ),
    },
  ];
  const item2 = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Quanh nguu
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          TIến bịp
        </a>
      ),
     
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <Layout>
      {/* tiêu đề */}

      <Header
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "#ffffff",
          color: "black",
        }}
      >
        {/* logo SHOP */}

        <Col span={4}>
          <Image style={{ height: 60 }} width={170} src={logoShop} />
        </Col>
        <Col span={1.5} className="button-menu-trai text-center algin-center">
          <a href="/home" className="button-menu-trai">
            <Space>
              <h6>HOME</h6>
            </Space>
          </a>
        </Col>
        <Col span={1.5} className=" button-menu-trai ms-4">
          <Dropdown menu={{ items }} className="pb-4">
            <a onClick={(e) => e.preventDefault()} className="button-menu-trai">
              <Space>
                <h6>SHOP</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
        <Col span={1.5} className="button-menu-trai ms-4">
          <Dropdown menu={{ items }} className=" button-menu-trai">
            <a onClick={(e) => e.preventDefault()} className="pb-4">
              <Space>
                <h6>PRODUCT</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
        <Col span={1.5} className="button-menu-trai ms-4">
          <Dropdown menu={{ items }} className="button-menu-trai">
            <a onClick={(e) => e.preventDefault()} className="pb-4">
              <Space>
                <h6>BLOG</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
        <Col span={10} className="float-end ms-5">
          <Link to={"/gio-hang"} className="float-end justify-content-end ">
            <Badge count={countgioHang} offset={[8, 1]} className="menuButton">
              <TbShoppingCartHeart size={30} className="menuButton" />
            </Badge>
          </Link>
        </Col>
        <Col span={1} className="ms-1">
          <>
            {userName == null ? (
              <Link to={"/login"}>
                <Avatar
                  shape="circle"
                  className="align-content-center"
                  size="large"
                  src="data:image/jpeg;base64,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"
                  style={{ marginLeft: 40 }}
                />
              </Link>
            ) : (
              <>
                {/* <Avatar
                  shape="circle"
                  className="align-content-center"
                  size="large"
                  src={linkAnh}
                  style={{ marginLeft: 35 }}
                /> */}
                <Dropdown
                  menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ["3"],
                  }}
                  className="ms-2"
                >
                  <Typography.Link>
                    <Space>
                      <Avatar
                        shape="circle"
                        className="align-content-center"
                        size="large"
                        src={linkAnh}
                        style={{ marginLeft: 40 }}
                      />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </>
            )}
          </>
        </Col>
        <Col span={2} className="ms-5">
          <div className="bold">
            <>
              {userName == null ? (
                <span>Đăng nhập</span>
              ) : (
                <span className="fw-bold">
                  {/* {userName.split(" ").slice(2).join(" ") == null
                    ? userName.split(" ").slice(2).join(" ")
                    : userName.split(" ").slice(1).join(" ")} */}
                  {userName}
                </span>
              )}
            </>
          </div>
        </Col>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
