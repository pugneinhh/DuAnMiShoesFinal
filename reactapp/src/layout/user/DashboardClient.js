
import React from "react";
import { Breadcrumb, Layout, theme, Image, Badge, Avatar } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Input } from "antd";
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
    <Layout className="container">
      {/* tiêu đề */}

      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "#ffffff",
          color: "black",
        }}
      >
        <div className="demo-logo" />

        <div className="menu row d-flex  ">
          {/* logo SHOP */}
          <Image className="col" width={170} src={logoShop} />
          <Dropdown menu={{ items }} className="col">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {" "}
                <h6>HOME</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} className="col">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {" "}
                <h6>SHOP</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} className="col">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {" "}
                <h6>PRODUCT</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} className="col">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {" "}
                <h6>BLOG</h6>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <Link className="col ms-10  justify-content-end">
            <Badge count={10}>
              <TbShoppingCartHeart size={25} />
            </Badge>
          </Link>
          <Link className="col ">
            <Avatar size={40} icon={<UserOutlined />} />
          </Link>
        </div>
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
          Content
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


