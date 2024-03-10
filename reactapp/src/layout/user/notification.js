import { Dropdown,Avatar, Menu, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { IoNotifications } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { ThongBaoAPI } from "../../pages/censor/api/thongBaoAPI.js/thongBaoAPI";


export default function Notification() {
  useEffect(() => {
    loadAll();
    count();
  }, []);
  const [notifications, setNotification] = useState([]);
  const [NotificationLength, setNotificationLength] = useState();
  const loadAll = () => {
    ThongBaoAPI.getALlThongBaoAdmin().then((res) => {
      setNotification(res.data);
    });
  };
  

  const count =()=>{
    ThongBaoAPI.countThongBaoAdmin().then((res) => {
      setNotificationLength(res.data);
    });
  }

  const menu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item key={notification.id}>
          <img
            src={notification.nguoiDung.anh}
            alt="Notification"
            style={{ width: "24px", marginRight: "8px" }}
          />
          <span>{notification.nguoiDung.ten} da dat don hang</span>
          <br></br>
          <span>
          {/* [<strong>{notification.noiDung}</strong>] */}
          {}
          {notification.noiDung}
          </span>
  
        </Menu.Item>
      ))}
    </Menu>
  );
  
  // const Notifications = () => (
  
  // );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
    <div>
      <Badge count={NotificationLength} color="red">
        <Avatar
          shape="circle"
          className="align-content-center"
          size="default"
          icon={<IoNotifications size={20} color="#9e9e9e" />}
          style={{ backgroundColor: "#f7faf9" }}
        />
      </Badge>
    </div>
  </Dropdown>
  );
}

