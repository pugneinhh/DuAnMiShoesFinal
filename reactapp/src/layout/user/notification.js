import { Dropdown,Avatar, Menu, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { IoNotifications } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { ThongBaoAPI } from "../../pages/censor/api/thongBaoAPI.js/thongBaoAPI";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function Notification() {
  useEffect(() => {
    loadAll();
    count();
  }, []);

  const navigate = useNavigate(); // dùng để chuyển trang
  const [notifications, setNotification] = useState([]);
  const [NotificationLength, setNotificationLength] = useState();
  const loadAll = () => {
    ThongBaoAPI.getALlThongBaoAdmin().then((res) => {
      setNotification(res.data);
    });
  };
  
      var stomp = null;
      const socket = new SockJS("http://localhost:8080/ws");
      stomp = Stomp.over(socket);

      useEffect(() => {
        stomp.connect({}, () => {
          console.log("connect websocket");

          stomp.subscribe("/topic/admin/hoa-don", (mes) => {
            try {
              const pare = JSON.parse(mes.body);
              console.log(pare);
              // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
              // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
              loadAll();
              count();
            } catch (e) {
              console.log("lỗi mẹ ròi xem code di: ", e);
            }
          });
        });

        return () => {
          stomp.disconnect();
        };
      }, []);
  const updateStatus = (id) => {
    ThongBaoAPI.updateStatus(id).then((res) => {

        // nếu trạng thái là đã xem thì không load lại cho đỡ lag máy
        loadAll();
        count();
              navigate(`/admin-detail-hoa-don/${res.data.hoaDon.id}`); // dùng để chuyển trang
      

    });
  }

  const count =()=>{
    ThongBaoAPI.countThongBaoAdmin().then((res) => {
      setNotificationLength(res.data);
    });
  }

const menu = (
  <div
    style={{
      maxHeight: "400px",
      overflowY: "auto",
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      scrollbarWidth: "1px",
      scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)",
    }}
  >
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item
          key={notification.id}
          onClick={() => {
            if (notification.trangThai === 0) {
              updateStatus(notification.id);
            }
          }}
          style={{
            backgroundColor: notification.trangThai === 1 ? "" : "#ebe4e1",
          }}
          className="mt-2"
        >
          <div className="row">
            <div className="col-md-1">
              <img
                src={notification.nguoiDung.anh}
                alt="Notification"
                style={{ width: "40px", height: "40px", marginRight: "8px" }}
              />
            </div>
            <div className="col-md-10 ms-2">
              <span>
                {" "}
                <span className="text-danger">     
                  <b>{notification.nguoiDung.ten}</b> {"   "}
                </span>
                đã đặt đơn hàng
              </span>
              <br></br>
              <span>
                {/* [<strong>{notification.noiDung}</strong>] */}
                {}
                {notification.noiDung}
              </span>
            </div>
            {/* <div className="col-md-1">
                 {notification.trangThai == 1 ? "" : "•"}
            </div> */}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  </div>
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

