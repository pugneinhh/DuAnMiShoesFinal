import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./DashboardCensor.model.css";
import { Link } from "react-router-dom";
import { FaGithub, FaTshirt, FaTag } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { GiMaterialsScience } from "react-icons/gi";
import { IoColorPalette } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import {
  BiSolidCategory,
  BiSolidUserBadge,
  BiSolidUserDetail,
} from "react-icons/bi";
import { BsBoxSeamFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { FaCartShopping, FaMoneyBills } from "react-icons/fa6";
import { PiTrademarkFill } from "react-icons/pi";
import { LuBadgePercent } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import {
  ProSidebar,
  MenuItem,
  SubMenu,
  Menu,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import { Avatar, Badge, Button,  Layout, theme ,Image,FloatButton } from "antd";
import { IoNotifications } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

import logoShop from "../../assets/images/logo.png";
const { Header, Sider, Content } = Layout;
const DashboardCensor = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout-censor">
      <Sider trigger={null} collapsible collapsed={collapsed} width={235}  >
       
          
        
        <div className="demo-logo-vertical" />
        <ProSidebar
        className={`nav-sidebar`}
        //image={sidebarBg}
        collapsed={collapsed}
        width={235}
        breakPoint="md"
        
        image="https://i.pinimg.com/564x/40/81/08/4081083e8895a9a620ada4b0fac3d436.jpg?fbclid=IwAR0HZwn_m42pqnvest56DrS32EKJXbpfIQvedmzUNReYtTiipdjSBjz6r-o"
      >
            <SidebarHeader>
                    <div
                        style={{
                            alignItems : 'center',
                            display : 'flex',   
                            flexDirection : 'column ',
                            padding: '20px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 18,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            
                        }}
                    >
                        <div className='logo_slibar'>
                            {!collapsed ? 
                            (
                              <div>
                            <Image width={100} src={logoShop} />
                            <br></br>
                            <span> Mi Shoes</span> 
                            </div>
                            )
                            :( <Image src={logoShop} rounded /> )}

                        </div>

                    </div>
                </SidebarHeader>
                <Menu iconShape="circle">
          
                        <MenuItem
                            icon={<RxDashboard color='#f7faf9' size={20} />}
                        >
                            Dashboard
                            <Link to="/admin-thong-ke"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaCartShopping color='#f7faf9' size={20} />}
                        >
                            Bán Hàng Tại Quầy
                            <Link to="/admin-ban-hang"></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                    <SubMenu
                            icon={<BsBoxSeamFill color='#f7faf9' size={20}/>}
                            title="Quản Lý Sản Phẩm"
                        >
                            <MenuItem icon={<FaTshirt color='#f7faf9' size={20}/>}>
                                Sản Phẩm
                                <Link to='/admin-san-pham'></Link>
                            </MenuItem>
                            <MenuItem icon={<BiSolidCategory color='#f7faf9' size={20} />}>
                                Danh Mục
                                <Link to='/admin-danh-muc'></Link>
                            </MenuItem>
                            <MenuItem icon={<AiOutlineColumnHeight color='#f7faf9' size={20} />}>
                                Đế giày
                                <Link to='/admin-de-giay'></Link>
                            </MenuItem>
                            <MenuItem icon={<GiMaterialsScience color='#f7faf9' size={20}/>}>
                                Chất Liệu
                                <Link to='/admin-chat-lieu'></Link>
                            </MenuItem>
                            <MenuItem icon={<GoNumber color='#f7faf9' size={20} />}>
                                Kích thước
                                <Link to='/admin-kich-thuoc'></Link>
                            </MenuItem>
                            <MenuItem icon={<IoColorPalette color='#f7faf9' size={20}/>}>
                                Màu Sắc
                                <Link to='/admin-mau-sac'></Link>
                            </MenuItem>
                            <MenuItem icon={<PiTrademarkFill color='#f7faf9' size={20} />}>
                                Hãng
                                <Link to='/admin-hang'></Link>
                            </MenuItem>
                            
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                    <SubMenu
                            icon={<RiAccountCircleFill color='#f7faf9' size={20}/>}
                            title="Quản Lý Tài Khoản"
                        >
                            <MenuItem icon={<BiSolidUserBadge color='#f7faf9' size={20}/>}>
                                Nhân Viên
                                <Link to='/admin-nhan-vien'></Link>
                            </MenuItem>
                            <MenuItem icon={<BiSolidUserDetail color='#f7faf9' size={25} />}>
                                Khách Hàng
                                 <Link to='/admin-khach-hang'></Link>
                            </MenuItem>
                           
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaMoneyBills color='#f7faf9' size={20}/>}
                            suffix={<Badge pill bg="light" text="dark">New</Badge>}
                        >
                            Hóa Đơn
                            <Link to='/admin-hoa-don'></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                    
                    <SubMenu
                            icon={<BiSolidDiscount  color='#f7faf9' size={20}/>}
                            title="Giảm giá"
                        >
                        <MenuItem
                            icon={<LuBadgePercent color='#f7faf9' size={25} />}
                        >
                            Đợt giảm giá
                            <Link to = '/admin-khuyen-mai'></Link>
                        </MenuItem>
                    
                    
                        <MenuItem
                            icon={<FaTag color='#f7faf9'size={20} />}
                        >
                            Phiếu giảm giá
                            <Link to='/admin-voucher'></Link>
                        </MenuItem>
                    
                    </SubMenu>
                    </Menu>
        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            {collapsed ? (
              <a
                href="#"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              >
                <FaGithub color="#f7faf9" size={20} />
              </a>
            ) : (
              <a
                href="#"
                target="_blank"
                className="sidebar-btn link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                rel="noopener noreferrer"
              >
                <FaGithub color="#f7faf9" size={20} className="text-center" />
                &ensp;
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    color: "white",
                  }}
                >
                 Mi Shoes
                </span>
              </a>
            )}
          </div>
        </SidebarFooter>
      </ProSidebar>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="header-layout"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <marquee style={{width:"600px" , color:"Red" , fontSize:"Bold" , marginRight:30}} direction="left" scrollamount="5">Ưu đãi khủng cho hóa đơn từ 20.000.000 VND ! Mua ngay </marquee>
          <div className="admin-right float-end">
            <a href="#">
              <Badge count={5} color="red">
                <Avatar
                  shape="circle"
                  className="align-content-center"
                  size="default"
                  icon={<IoNotifications size={20} color="#9e9e9e" />}
                  style={{ backgroundColor: "#f7faf9" }}
                />
              </Badge>
            </a>
            <Avatar
              shape="circle"
              className="align-content-center"
              size="large"
              icon={<FaUserAlt size={20} />}
              style={{ marginLeft: 40 }}
            />
            </div>
        </Header>
        <Content
          style={{
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 7,
            minHeight: 280,
            borderRadius: "15px",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
      <FloatButton.BackTop />
    </Layout>
  );
};
export default DashboardCensor;