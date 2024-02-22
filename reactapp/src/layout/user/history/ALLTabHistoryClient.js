import { Avatar, Badge, Button, Space, Tabs, Tag } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { get, set } from "local-storage";
import  "./history.css";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import TabHistoryClient from "./TabHistoryClient";
const ALLTabHistoryClient = () => {
  const nav = useNavigate();
  const [listBill, setListBill] = useState([]);
  const storedData = get("userData");
  const id = storedData.userID;
  const [key, setKey] = useState("10");
  const keyToStatusMapping = {
    1: "0",
    2: "1",
    3: "2",
    4: "3",
    5: "4",
    6: "-1",
    10 : "",
  };
  useEffect(() => {
    console.log("alo",key);
    const trangThai = keyToStatusMapping[key]? keyToStatusMapping[key] : "";
   
    const datatest={  id:id, trangThai };
    console.log("alo",datatest);
    HoaDonClientAPI.getALLHoaDonOnlineByIdKH(datatest).then((res) => {
      const data = res.data;
      console.log(data,"dddddddddddddddddádasdasdasdasd");
      const promises = data.map((item) => {
        return HoaDonClientAPI.getALLChiTietSanPhamClientOlByIdHD(item.id).then(
          (res) => ({
            id: item.id,
            thanhTien: item.thanhTien,
            trangThai: item.trangThaiHD,
            hoaDonDetail: res.data.data,
          })
        );
      });

      Promise.all(promises).then((results) => {
        setListBill(results);
      });
    });
  }, [key]);
  // useEffect(() => {
  //   console.log(listBill);
  // }, [listBill]);
    // item tab
    const onChange = (key) => {
      setKey(key);
      console.log(key);
    };
  //  const items = [
  //    {
  //      key: "1",

  //      label: "Tất cả",
  //      children: (
  //        <>
  //          <div className="container">
  //            <div className="mb-5">
  //              <Space className="float-end" size={[0, 8]} wrap>
  //                <Tag color="#108ee9">
  //                  <span className="fs-5">Chờ vận chuyển</span>
  //                </Tag>
  //              </Space>
  //              <br></br>
  //              <div
  //                className="row mt-3 "
  //                style={{ borderTop: "1px solid #000" }}
  //              >
  //                <div className="col-md-2 mt-3 ps-4">
  //                  <img
  //                    style={{ width: 130, height: 140 }}
  //                    src={
  //                      "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708359981/oezx0k4votuisyxy0pob.jpg"
  //                    }
  //                    alt="Product"
  //                  ></img>
  //                </div>
  //                <div className="col-md-6 ms-5 mt-3">
  //                  <h5>Giày thể thao Nike </h5>
  //                  <h6 className="text-danger">
  //                    <del>2.500.000 VND</del>
  //                  </h6>
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                  <h6>40-[Black]</h6>
  //                  <h6>x1</h6>
  //                </div>
  //                <div className="col-md-3  mt-5">
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                </div>
  //              </div>
  //              <div
  //                className="row mt-3 "
  //                style={{ borderTop: "1px solid #000" }}
  //              >
  //                <div className="col-md-2 mt-3 ps-4">
  //                  <img
  //                    style={{ width: 130, height: 140 }}
  //                    src={
  //                      "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708333190/nqbrgsgvr76i4uscx9sf.png"
  //                    }
  //                    alt="Product"
  //                  ></img>
  //                </div>
  //                <div className="col-md-6 ms-5 mt-3">
  //                  <h5>Giày thể thao Nike </h5>
  //                  <h6 className="text-danger">
  //                    <del>2.500.000 VND</del>
  //                  </h6>
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                  <h6>40-[Black]</h6>
  //                  <h6>x1</h6>
  //                </div>
  //                <div className="col-md-3  mt-5">
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                </div>
  //              </div>

  //              {/* thành tiền */}
  //              <div
  //                className=" mt-4 d-flex justify-content-end"
  //                style={{ borderTop: "1px solid #000" }}
  //              >
  //                <h5 className="mt-4">Thành tiền :</h5>
  //                <h5 className="mt-4 ms-3 text-danger">5.000.000 VND</h5>
  //              </div>
  //              {/* nút thanh toán */}
  //              <div className=" mt-4 d-flex justify-content-end">
  //                <Button
  //                  style={{
  //                    backgroundColor: "orangered",
  //                    color: "white",
  //                    width: 150,
  //                    height: 40,
  //                  }}
  //                >
  //                  Hủy đơn
  //                </Button>
  //                <Button
  //                  style={{
  //                    backgroundColor: "white",
  //                    width: 150,
  //                    height: 40,
  //                    marginLeft: 20,
  //                  }}
  //                  onClick={() => {
  //                   nav(`/chi-tiet-don-hang`);
  //                 }}
  //                >
  //                  Xem đơn hàng
  //                </Button>
  //              </div>
  //            </div>

  //            <div>
  //              <Space className="float-end" size={[0, 8]} wrap>
  //                <Tag color="#108ee9">
  //                  <span className="fs-5">Chờ vận chuyển</span>
  //                </Tag>
  //              </Space>
  //              <br></br>
  //              <div
  //                className="row mt-3 "
  //                style={{ borderTop: "1px solid #000" }}
  //              >
  //                <div className="col-md-2 mt-3 ps-4">
  //                  <img
  //                    style={{ width: 130, height: 140 }}
  //                    src={
  //                      "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708359981/oezx0k4votuisyxy0pob.jpg"
  //                    }
  //                    alt="Product"
  //                  ></img>
  //                </div>
  //                <div className="col-md-6 ms-5 mt-3">
  //                  <h5>Giày thể thao Nike </h5>
  //                  <h6 className="text-danger">
  //                    <del>2.500.000 VND</del>
  //                  </h6>
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                  <h6>40-[Black]</h6>
  //                  <h6>x1</h6>
  //                </div>
  //                <div className="col-md-3  mt-5">
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                </div>
  //              </div>
  //              <div
  //                className="row mt-3 "
  //                style={{ borderTop: "1px solid #000" }}
  //              >
  //                <div className="col-md-2 mt-3 ps-4">
  //                  <img
  //                    style={{ width: 130, height: 140 }}
  //                    src={
  //                      "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708333190/nqbrgsgvr76i4uscx9sf.png"
  //                    }
  //                    alt="Product"
  //                  ></img>
  //                </div>
  //                <div className="col-md-6 ms-5 mt-3">
  //                  <h5>Giày thể thao Nike </h5>
  //                  <h6 className="text-danger">
  //                    <del>2.500.000 VND</del>
  //                  </h6>
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                  <h6>40-[Black]</h6>
  //                  <h6>x1</h6>
  //                </div>
  //                <div className="col-md-3  mt-5">
  //                  <h6 className="text-danger">2.500.000 VND</h6>
  //                </div>
  //              </div>

  //              {/* thành tiền */}
  //              <div
  //                className=" mt-4 d-flex justify-content-end"
  //                style={{ borderTop: "1px solid #000" }}
  //              >
  //                <h5 className="mt-4">Thành tiền :</h5>
  //                <h5 className="mt-4 ms-3 text-danger">5.000.000 VND</h5>
  //              </div>
  //              {/* nút thanh toán */}
  //              <div className=" mt-4 d-flex justify-content-end">
  //                <Button
  //                  style={{
  //                    backgroundColor: "orangered",
  //                    color: "white",
  //                    width: 150,
  //                    height: 40,
  //                  }}
  //                >
  //                  Hủy đơn
  //                </Button>
  //                <Button
  //                  style={{
  //                    backgroundColor: "white",
  //                    width: 150,
  //                    height: 40,
  //                    marginLeft: 20,
  //                  }}
  //                >
  //                  Hủy đơn
  //                </Button>
  //              </div>
  //            </div>
  //          </div>
  //        </>
  //      ),
  //    },
  //    {
  //      key: "2",
  //      label: (
  //        <Badge count={0} offset={[8, 1]}>
  //          Chờ xác nhận
  //        </Badge>
  //      ),
  //      children: <></>,
  //    },
  //    {
  //      key: "3",
  //      label: (
  //        <Badge count={0} offset={[8, 1]}>
  //          Chờ vận chuyển
  //        </Badge>
  //      ),
  //      children: <></>,
  //    },
  //    {
  //      key: "4",
  //      label: (
  //        <Badge count={0} offset={[8, 1]}>
  //          Vận chuyển
  //        </Badge>
  //      ),
  //      children: <></>,
  //    },
  //    {
  //      key: "5",
  //      label: "Hoàn thành",
  //      children: <></>,
  //    },
  //    {
  //      key: "6",
  //      label: (
  //        <Badge count={0} offset={[8, 1]}>
  //          Hủy
  //        </Badge>
  //      ),
  //      children: <></>,
  //    },
  //  ];
  return (


<>
<div style={{ padding: 20 }}>
  <Tabs onChange={onChange} type="card">
    <Tabs.TabPane tab="Tất cả" key="10">
      <TabHistoryClient listBill={listBill} />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Chờ xác nhận" key="0">
      <TabHistoryClient listBill={listBill} />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Chờ vận chuyển" key="1">
      <TabHistoryClient listBill={listBill} />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Vận chuyển" key="2">
      <TabHistoryClient listBill={listBill} />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Hoàn thành" key="3">
      <TabHistoryClient listBill={listBill} />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Đã hủy" key="-1">
      <TabHistoryClient listBill={listBill} />
    </Tabs.TabPane>
  </Tabs>
</div>
</>
  );
};
export default ALLTabHistoryClient;
