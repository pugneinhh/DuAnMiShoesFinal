import { Dropdown, Avatar, Menu, Badge } from "antd";
import { IoNotifications } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { ThongBaoAPI } from "../../pages/censor/api/thongBaoAPI.js/thongBaoAPI";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
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

  const storedItem = localStorage.getItem("userData");
  const parsedItem = JSON.parse(storedItem);
    useEffect(() => {
      loadAll();
      count();
    }, []);
  const loadAll = () => {
    if(parsedItem!=null){
    ThongBaoAPI.getALlThongBaoKH(parsedItem.accessToken).then((res) => {
      setNotification(res.data);
         console.log(res.data);
    });
  }else{
    return null;
  }
  };
//  var stomp = null;
//  const socket = new SockJS("http://localhost:8080/ws");
//  stomp = Stomp.over(socket);

//   useEffect(() => {
//     const connectWebSocket = () => {
//       // const socket = new SockJS("http://localhost:8080/ws");
//       // stomp = Stomp.over(socket);
//       stomp = Stomp.over(function () {
//         return new SockJS("http://localhost:8080/ws");
//       });
//       stomp.connect(
//         {},
//         () => {
//           console.log("connect websocket");

//           stomp.subscribe("/topic/admin/hoa-don", (mes) => {
//             try {
//               const pare = JSON.parse(mes.body);
//               console.log(pare);
//               // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
//               // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
//               loadAll();
//               count();
//             } catch (e) {
//               console.log("lỗi mẹ ròi xem code di: ", e);
//             }
//           });
//         },
//         (error) => {
//           console.error("Failed to connect to WebSocket:", error);
//           // Thử kết nối lại sau một khoảng thời gian
//           setTimeout(connectWebSocket, 5000);
//         }
//       );
//     };

//     connectWebSocket();
//     return () => {
//       stomp.disconnect();
//     };
//   }, []);
  const updateStatus = (id) => {
          ThongBaoAPI.updateStatusClient(id).then((res) => {
      // nếu trạng thái là đã xem thì không load lại cho đỡ lag máy
      loadAll();
      count();
      navigate(`/chi-tiet-don-hang/${res.data.hoaDon.id}`); // dùng để chuyển trang
    });
  };

  const count = () => {
    if(parsedItem!=null){
    ThongBaoAPI.countThongBaoKH(parsedItem.accessToken).then((res) => {
      setNotificationLength(res.data);
   
    });
  }else{
    return null;
  }
  };

  const menu = (
    <div
      className="custom-scrollbar-thong-bao"
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <Menu>
        {notifications.map((notification) => (
          <Menu.Item
            key={notification.id}
            onClick={() => updateStatus(notification.id)}
          >
            <div className="row">
              <div className="col-md-1">
                <img
                  className="rounded-circle"
                  src={notification.nguoiDung.anh}
                  alt="Notification"
                  style={{ width: "42px", height: "42px" }}
                />
              </div>
              <div className="col-md-9 ms-3">
                {/* <br></br> */}
                <span>{notification.noiDung}</span>
              </div>
              <div className="col-md-1 pt-2 ms-2">
                <span className="float-end" size={50}>
                  {notification.trangThai == 1 ? "" : <GoDotFill />}
                </span>
              </div>
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
      <div >
        <Badge  count={NotificationLength} color="red">
          <Avatar
            shape="circle"
            className="align-content-center menuButton"
            size="default"
            icon={<IoNotifications size={30} color="black" />}
            style={{ backgroundColor: "#FFFFFF" }}
          />
        </Badge>
      </div>
    </Dropdown>
  );
}
