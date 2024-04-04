import {
  Button,
  Form,
  Input,
  Col,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
const TraHang = () => {
  const [form] = Form.useForm();

  return (
    <div className="container-fuild">
      <div
        className="  m-2 p-3 pt-2"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid #ddd", // Border color
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "8px",
          maxWidth: "100%", // Đảm bảo div không vượt quá kích thước màn hình
          height: "800px",
        }}
      >
        <GiReturnArrow size={30} />{" "}
        <span className=" fs-5">
          <b>Trả hàng</b>
        </span>
        <div className="row d-flex justify-content-center mt-5">
          <Form
            form={form}
            style={{ paddingLeft: 400 }}
            // onFinish={handleSubmit}
          >
            <Row>
              <Col span={11} style={{ marginTop: "32px" }}>
                <Form.Item
                  name="ma"
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Mã hóa đơn
                    </span>
                  }
                  tooltip="Vui lòng nhập mã hóa đơn"
                >
                  <Input style={{ width: 400 }} />
                </Form.Item>
              </Col>
              <Col className="d-flex align-items-center ms-2 mt-2">
                <Button
                  style={{
                    // width: "110px",
                    // height: "40px",
                    // margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  // htmlType="reset"
                >
                  Tìm kiếm
                </Button>
              </Col>
              <Col className="d-flex align-items-center ms-2 mt-2">
                <Button
                  style={{
                    // width: "110px",
                    // height: "40px",
                    // margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  // htmlType="reset"
                >
                  QRCode
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="text-center mt-4">
          <img
            src="https://cdn.ntlogistics.vn/images/NTX/new_images/shipper-giao-hang-nhanh-can-chu-dong-trong-qua-trinh-gui-hang.jpg"
            style={{ width: 1000, height: 550 }}
          ></img>
        </div>
      </div>
    </div>
  );
};
export default TraHang;
