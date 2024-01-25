<<<<<<< HEAD
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const { Header, Content, Footer } = Layout;
const items = new Array(4).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
=======
import React from "react";
import { Breadcrumb, Layout, Menu, theme, Image } from "antd";
import { Link } from "react-router-dom";
import { ProSidebar, MenuItem } from "react-pro-sidebar";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Input } from "antd";
>>>>>>> developer

import logoShop from "../../assets/images/logoNgang.png";
import "./client.css";

const { Search } = Input;
const { Header, Content, Footer } = Layout;
export const DashboardClient = ({ children }) => {
<<<<<<< HEAD
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return(
      <div className='container'>
        <Layout>
=======
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
>>>>>>> developer
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
<<<<<<< HEAD
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
=======
        <div className="menu row ">
          {/* logo SHOP */}
          <Image className="col" width={200} src={logoShop} />
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

          {/* <div className="col-md-4">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              // onSearch={onSearch}
            />
          </div> */}
        </div>
>>>>>>> developer
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
<<<<<<< HEAD
    </div>
    );
=======
  );
>>>>>>> developer
};
