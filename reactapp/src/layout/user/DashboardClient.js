import React from "react";
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
} from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { TbShoppingCartHeart } from "react-icons/tb";
import logoShop from "../../assets/images/logoNgang.png";
import "./client.css";
const { Header, Content, Footer } = Layout;
export const DashboardClient = ({ children }) => {
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
      icon: <SmileOutlined />,
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
    <Layout  >
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
          <Dropdown menu={{ items }} className="pb-4">
            <a href='/home' className="button-menu-trai">
              <Space>
                <h6>HOME</h6>
              </Space>
            </a>
          </Dropdown>
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
        <Col span={12} className="float-end ">
          <Link to={"/gio-hang"} className="float-end justify-content-end ">
            <Badge count={10} offset={[8, 1]} className="menuButton">
              <TbShoppingCartHeart size={30} className="menuButton" />
            </Badge>
          </Link>
        </Col>
        <Col span={1} className="ms-5">
          <Link to={"/login"}>
            <Avatar size={40} className="menuButton" icon={<UserOutlined />} />
          </Link>
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
