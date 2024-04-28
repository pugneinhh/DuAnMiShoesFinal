import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { get, set } from "local-storage";

import ProfileMenu from "./ProfileMenu";
import { NguoiDungAPI } from "../../../pages/censor/api/nguoiDung/nguoiDungAPI";
const DoiMatKhauClient = (props) => {
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [IDNV, setIDNV] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const storedData = get("userData");
    setIDNV(storedData.userID);
  }, []);
  const handleSubmit = (values) => {
    NguoiDungAPI.doiMatKhauClient(IDNV, values).then((res) => {
      if (values.matKhau !== values.pass) {
        toast("🦄 Mật khẩu mới không trùng khớp !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else if (values.matKhau == values.matKhauCu) {
        toast("🦄 Vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else {
        if (res.data) {
          form.resetFields();
          toast("🦄 Đổi mật khẩu thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast("🦄 Đổi mật khẩu thật bại, mật khẩu cũ không đúng!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  };
  return (
    <div className="row" style={{ height: 600 }}>
      <ProfileMenu></ProfileMenu>
      <div className="col-md-10 ">
        <div
          className="container-fluid"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
            maxWidth: "100%", // Đảm bảo div không vượt quá kích thước màn hình
            height: "615px",
          }}
        >
          <div className="container-fluid">
            <Divider orientation="center" color="#d0aa73">
              <h2 className="text-first pt-1 fw-bold">
                <RiLockPasswordLine size={35} /> Đổi mật khẩu
              </h2>
            </Divider>

            <Form
              form={form}
              layout="vertical"
              style={{ marginTop: 60, marginLeft: 350 }}
              onFinish={handleSubmit}
            >
              <Form.Item
                className="mb-4 justify-content-center"
                name="matKhauCu"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Mời nhập mật khẩu cũ"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  style={{ width: 400, height: 40 }}
                />
              </Form.Item>
              <div className="row">
                <Form.Item
                  className="mb-4 mt-1 justify-content-center col-md-6 "
                  name="matKhau"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống pass !",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mời nhập mật khẩu mới"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    style={{ width: 400, height: 40 }}
                  />
                </Form.Item>
                <span
                  className="col-md-1"
                  style={{ marginLeft: 50, marginTop: 7 }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={30} className="showpass" />
                  ) : (
                    <IoEyeOutline size={30} className="showpass" />
                  )}
                </span>
              </div>
              <Form.Item
                className="mb-1  mt-1 align-center "
                name="pass"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống pass !",
                  },
                ]}
              >
                <Input
                  placeholder="Mời nhập lại mật khẩu mới"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  // onChange={handlePasswordChange}
                  style={{ width: 400, height: 40 }}
                />
              </Form.Item>
              <Button
                style={{ marginLeft: 150 }}
                className="mb-1 mt-4 bg-success text-light"
                onClick={() => {
                  Modal.confirm({
                    title: "Thông báo",
                    content: "Bạn có chắc chắn muốn tiếp tục?",
                    onOk: () => {
                      form.submit();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}
              >
                Xác nhận
              </Button>
            </Form>
          </div>
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
      </div>
      {/* tab */}
    </div>
  );
};
export default DoiMatKhauClient;
