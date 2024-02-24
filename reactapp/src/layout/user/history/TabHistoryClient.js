import { Avatar, Button, Form, Modal, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
const TabHistoryClient = ({ listBill }) => {
  const nav = useNavigate();
   const [modalReason, setModalReason] = useState(false);
   const [reason, setReason] = useState("");
   const [errror, setError] = useState("");
   const [id, setId] = useState("");
   const cancelBill = () => {
     const data = {
       id: id,
       description: reason,
     };
     console.log(data);
     if (reason === "") {
       setError("Vui lòng nhập lý do hủy đơn");
       return;
     }
    //  BillClientApi.cancelBill(data).then((res) => {
    //    toast.success("Hủy đơn thành công");
    //    window.location.href = "/purchase";
    //  });
   };
   const openModal = (id) => {
     setModalReason(true);
     setId(id);
   };
   const closeModal = () => {
     setModalReason(false);
     setReason("");
   };
  return (
    <div className="container ">
      <div className="row pt-3 " style={{ backgroundColor: "#F3F2F2" }}>
        {listBill.map((item, index) => (
          <div key={index} className="container mb-5">
            <div className="mb-5">
              <Space className="float-end" size={[0, 8]} wrap>
                <Tag color="#108ee9">
                  <span className={`trangThai ${" status_" + item.trangThai} `}>
                    {item.trangThai === "0"
                      ? "Chờ xác nhận"
                      : item.trangThai === "1"
                      ? "Xác nhận"
                      : item.trangThai === "2"
                      ? "Chờ vận chuyển"
                      : item.trangThai === "3"
                      ? "Đang vận chuyển"
                      : item.trangThai === "4"
                      ? "Đã thanh toán"
                      : item.trangThai === "5"
                      ? "Thành công"
                      : item.trangThai === "-1"
                      ? "Đã hủy"
                      : "Chưa rõ"}
                  </span>
                </Tag>
              </Space>
              <br></br>

              <div>
                {item.hoaDonDetail.map((item, index) => (
                  <div
                    key={index}
                    className="row mt-3 "
                    style={{ borderTop: "1px solid #000" }}
                  >
                    <div className="col-md-2 mt-3 ps-4">
                      <img
                        style={{ width: 130, height: 140 }}
                        src={item.urlHA}
                        alt="Product"
                      ></img>
                    </div>
                    <div className="col-md-6 ms-5 mt-3">
                      <h5>{item.tenSP} </h5>
                      <h6 className="text-danger">
                        <del>
                          {Intl.NumberFormat("en-US").format(item.giaBanSP)}
                          VND
                        </del>
                      </h6>
                      <h6 className="text-danger">
                        {Intl.NumberFormat("en-US").format(item.giaBanSP)} VND
                      </h6>
                      <h6>
                        {item.tenKichThuoc}-[{item.tenMauSac}]
                      </h6>
                      <h6>x{item.soLuongSP}</h6>
                    </div>
                    <div className="col-md-3  mt-5">
                      <h6 className="text-danger">
                        {Intl.NumberFormat("en-US").format(item.thanhTienSP)}
                        VND
                      </h6>
                    </div>
                  </div>
                ))}
                {/* thành tiền */}
                <div
                  className=" mt-4 d-flex justify-content-end"
                  style={{ borderTop: "1px solid #000" }}
                >
                  <h5 className="mt-4">Thành tiền :</h5>
                  <h5 className="mt-4 ms-3 text-danger">
                    {Intl.NumberFormat("en-US").format(item.thanhTien)} VND
                  </h5>
                </div>

                {/* nút thanh toán */}
                <div className=" mt-4 d-flex justify-content-end  ">
                  {parseInt(item.trangThai) < 2 ? (
                    <Button
                      style={{
                        backgroundColor: "orangered",
                        color: "white",
                        width: 150,
                        height: 40,
                      }}
                      onClick={() => openModal(item.id)}
                    >
                      {" "}
                      Hủy đơn
                    </Button>
                  ) : (
                    <></>
                  )}

                  <Button
                    style={{
                      backgroundColor: "white",
                      width: 150,
                      height: 40,
                      marginLeft: 20,
                    }}
                    onClick={() => {
                      nav(`/chi-tiet-don-hang/${item.id}`);
                    }}
                  >
                    Xem đơn hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalReason}
        // onCancel={closeModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form>
          <Form.Item
            label={"Lý do hủy đơn"}
            validateStatus={errror ? "error" : ""}
            help={errror || ""}
          >
            <textarea
              style={{ height: 130, width: 300, padding: 10, fontSize: 17 }}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ float: "right" }}>
              <Button onClick={closeModal}>Hủy</Button>
              <Button
                className="button-add-promotion"
                key="submit"
                title="Xác nhận hủy đơn"
                onClick={cancelBill}
                style={{ marginLeft: "20px" }}
              >
                Xác nhận
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default TabHistoryClient;
