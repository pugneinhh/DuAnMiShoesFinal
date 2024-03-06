import { Dropdown,Avatar, Menu, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { IoNotifications } from "react-icons/io5";

const notifications = [
  { id: 1, content: "Thông báo 1", imageUrl: "https://i.pinimg.com/564x/40/81/08/4081083e8895a9a620ada4b0fac3d436.jpg?fbclid=IwAR0HZwn_m42pqnvest56DrS32EKJXbpfIQvedmzUNReYtTiipdjSBjz6r-o" , text: "Khách hàng A đã mua 12.500.000 VNĐ"},
  { id: 2, content: "Thông báo 2", imageUrl: "https://i.pinimg.com/564x/40/81/08/4081083e8895a9a620ada4b0fac3d436.jpg?fbclid=IwAR0HZwn_m42pqnvest56DrS32EKJXbpfIQvedmzUNReYtTiipdjSBjz6r-o" ,text : "Đơn ABC đã được giao thành công"},
  { id: 3, content: "Thông báo 3", imageUrl: "https://i.pinimg.com/564x/40/81/08/4081083e8895a9a620ada4b0fac3d436.jpg?fbclid=IwAR0HZwn_m42pqnvest56DrS32EKJXbpfIQvedmzUNReYtTiipdjSBjz6r-o" , text : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"},
];

const menu = (
  <Menu>
    {notifications.map((notification) => (
      <Menu.Item key={notification.id}>
        <img
          src={notification.imageUrl}
          alt="Notification"
          style={{ width: "24px", marginRight: "8px" }}
        />
        <span>
        [<strong>{notification.content}</strong>]
        {notification.text}
        </span>

      </Menu.Item>
    ))}
  </Menu>
);

const Notifications = () => (
  <Dropdown overlay={menu} trigger={["click"]}>
    <div>
      <Badge count={notifications.length} color="red">
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

export default Notifications;
