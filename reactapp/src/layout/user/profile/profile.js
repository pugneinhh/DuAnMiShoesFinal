// import { Avatar, Flex, Button, Space, Tabs, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { BsShop } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import {
   Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import { ToastContainer } from "react-toastify";
import { get, set } from "local-storage";
import UpLoadImage from "../../../pages/censor/nhanVien-management/UploadAnh";
const AccountProfile = (props) => {
  const idHD = useParams();
  const [form] = Form.useForm();
  const storedData = get("userData");
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const nav = useNavigate();
  const [listBillHistory, setListBillHistory] = useState([]);
  const [listTimeLine, setlistTimeLine] = useState([]);
  const [statusPresent, setStatusPresent] = useState([]);
  const [bill, setBill] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [fileImage, setFileIamge] = useState(null);
  useEffect(() => {
    setUserName(storedData.ten);
    setLinkAnhUser(storedData.anh);
  }, []);
  const donMua = () => {
    nav("/history");
  };
  const taiKhoanCuaToi = () => {
    nav("/tai-khoan-cua-toi");
  };
  
  const handleFileUpload = (fileData) => {
    setFileIamge(fileData);
  };
  return (
    <div className="row">
      <div className="col-md-2">
        <div className="row">
          <div className="col-md-2">
            <Avatar
              style={{ width: 50, height: 50 }}
              shape="circle"
              className="align-content-start"
              // size="large"
              src={AnhUser}
              // src="data:image/jpeg;base64,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"
            />
          </div>
          <div className="col-md-10 " style={{ paddingLeft: 40 }}>
            <div className="fw-bold">
              <h6>
                <b>{userName}</b>
              </h6>
            </div>
            <div className="ms-1">
              <TfiPencil size={15} />
              <span className="ms-2">Sửa hồ sơ</span>
            </div>
          </div>
        </div>

        <hr></hr>

        <div onClick={taiKhoanCuaToi}>
          <FaUser
            className="ms-2  button-back "
            size={20}
            style={{ color: "red" }}
          />
          <span className="ms-3 ">
            <b>Tài khoản của tôi</b>
          </span>
        </div>
        <div className="mt-3 button-back " onClick={donMua}>
          <BsShop className="ms-2" size={20} style={{ color: "red" }} />
          <span className="ms-4 ">
            <b>Đơn mua</b>
          </span>
        </div>
      </div>
      <div className="col-md-10 ">
        <div className="ps-3">
          <p>
            <span className="fs-5">
              <b>Hồ sơ của tôi</b>
            </span>
            <br></br>
            <span>
              <b>Quản lý thông tin hồ sơ để bảo mật tài khoản</b>
            </span>
          </p>
        </div>
        <hr></hr>

        <div className="row">
          <Form form={form} layout="vertical">
            <Row gutter={14} style={{ marginTop: "30px" }}>
              <Col span={7}>
                <Card style={{ height: "100%" }}>
                  <h6 className="text-center fw-bold">Ảnh đại diện</h6>
                  <Row className="text-center mt-5">
                    <UpLoadImage onFileUpload={handleFileUpload} />
                  </Row>
                </Card>
              </Col>
              <Col span={17}>
                <Card style={{ height: "100%" }}>
                  <h6 className="text-center fw-bold">Hồ sơ của tôi</h6>
                  <Row
                    justify="end"
                    align="middle"
                    style={{ marginBottom: "15px", marginTop: "10px" }}
                  >
                    <Col span={11}>
           
                      <Button
                        // onClick={handleSuccess}
                        style={{
                          width: "110px",
                          height: "40px",
                          margin: "0 10px 10px 10px ",
                          backgroundColor: "#3366CC",
                          color: "white",
                          marginLeft: "150px",
                        }}
                        // htmlType="reset"
                      >
                        Hoàn tất
                      </Button>
                    
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} style={{ marginRight: "20px" }}>
                      <Form.Item
                        name="ten"
                        label="Họ và tên"
                        tooltip="Họ tên đầy đủ của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập họ và tên.",
                            whitespace: true,
                          },
                          {
                            pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
                            message: "Họ và tên chỉ được phép chứa chữ cái.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input
                          onKeyPress={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          // style={{ textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="canCuocCongDan"
                        label="Căn cước"
                        tooltip="Căn cước công dân của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập căn cước công dân.",
                            whitespace: true,
                          },
                          {
                            pattern: /^\d{12}$/,
                            message: "Căn cước công dân cần phải 12 chữ số.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="gioiTinh"
                        label="Giới tính"
                        tooltip="Giới tính của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy chọn giới tính.",
                            whitespace: true,
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Select defaultValue={""}>
                          <Select.Option value="">Chọn giới tính</Select.Option>
                          <Select.Option value="true">Nam</Select.Option>
                          <Select.Option value="false">Nữ</Select.Option>
                        </Select>
                      </Form.Item>
                    
                    </Col>
                    <Col span={11} style={{ marginRight: "20px" }}>
                      <Form.Item
                        name="ngaySinh"
                        label="Ngày sinh"
                        tooltip="Ngày sinh của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập ngày sinh.",
                            whitespace: true,
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input type="date" style={{ textAlign: "center" }} />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label="Email"
                        tooltip="Email của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập email.",
                            whitespace: true,
                          },
                          {
                            type: "email",
                            message: "Vui lòng nhập đúng định dạng email.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="soDienThoai"
                        label="Số điện thoại"
                        tooltip="Số điện thoại của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập số điện thoại.",
                            whitespace: true,
                          },
                          {
                            pattern: /^0\d{9}$/,
                            message: "Vui lòng nhập số điện thoại hợp lệ.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input />
                      </Form.Item>                
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      {/* tab */}
    </div>
  );
};
export default AccountProfile;
