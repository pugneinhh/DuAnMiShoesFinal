import { Avatar, Badge, Button, Space, Tabs, Tag } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, set } from "local-storage";
import "./history.css";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import TabHistoryClient from "./TabHistoryClient";
import { TfiPencil } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import ProfileMenu from "../profile/ProfileMenu";

const ALLTabHistoryClient = () => {
  const nav = useNavigate();
  const [listBill, setListBill] = useState([]);
  const storedData = get("userData");
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const id = storedData.userID;
  const [key, setKey] = useState("10");
  const keyToStatusMapping = {
    1: "0",
    2: "1",
    3: "2",
    4: "3",
    5: "4",
    6: "-1",
    10: "",
  };
  useEffect(() => {
    setUserName(storedData.ten);
    setLinkAnhUser(storedData.anh);
    const trangThai = keyToStatusMapping[key] ? keyToStatusMapping[key] : "";

    const datatest = { id: id, trangThai };
    console.log("alo", datatest);
    HoaDonClientAPI.getALLHoaDonOnlineByIdKH(datatest).then((res) => {
      const data = res.data;
      console.log(data, "dddddddddddddddddádasdasdasdasd");
      const promises = data.map((item) => {
        return HoaDonClientAPI.getALLChiTietSanPhamClientOlByIdHD(item.id).then(
          (res) => ({
            id: item.id,
            thanhTien: item.thanhTien,
            trangThai: item.trangThaiHD,
            hoaDonDetail: res.data,
          })
        );
      });

      Promise.all(promises).then((results) => {
        setListBill(results);
      });
    });
  }, [key]);
  useEffect(() => {
    console.log(listBill);
  }, [listBill]);
  //   item tab
  const onChange = (key) => {
    setKey(key);
    console.log(key);
  };
  const donMua = () => {
    nav("/history");
  };
    const taiKhoanCuaToi = () => {
      nav("/tai-khoan-cua-toi");
    };
  return (
    <div className="row">
      <ProfileMenu></ProfileMenu>

      {/* tab */}
      <div className="col-md-10" style={{ padding: 20 }}>
        <Tabs onChange={onChange} type="card">
          <Tabs.TabPane tab="Tất cả" key="10">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ xác nhận" key="1">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Xác nhận" key="2">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ vận chuyển" key="3">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Vận chuyển" key="4">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hoàn thành" key="5">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy" key="6">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default ALLTabHistoryClient;
