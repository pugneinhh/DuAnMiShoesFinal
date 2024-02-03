import React from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button, Form, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './login.css'
import { useState, useEffect } from 'react';
import { IoEyeOffOutline } from "react-icons/io5";
import logoShop from "../../assets/images/logoNgang.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoGoogle } from "react-icons/io5";
import { LoginAPI } from '../../pages/censor/api/login/loginApi';
import { get, set } from "local-storage"

export const Login = () => {
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();
  const handlePasswordChange = (event) => {
    const rawPassword = event.target.value;
    const encryptedPassword = encryptPassword(rawPassword);
    setPassword(encryptedPassword);
  };

  const encryptPassword = (rawPassword) => {
    // Thực hiện mã hóa ở đây (ví dụ: chuyển mỗi kí tự thành "*")
    return rawPassword.replace(/./g, '*');
  };

  const login = (data) => {
    LoginAPI.login(data).then((respone) => {
      set('userData', respone.data);
      if (respone.data.chucVu == 'khach_hang') {
        nav("/home")
      }else{
        nav("/admin-thong-ke")
      }

    }) .catch(() => {
      toast.error("Sai tên đăng nhập hoặc mật khẩu !", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }


  return (
    <MDBContainer className="my-5 mb-5 " >

      <MDBCard className='container-login form-login' style={{ width: 1000 }} >
        <MDBRow style={{ height: 522 }} >

          <MDBCol md='5' style={{ height: 500 }}>
            <MDBCardImage src='https://i.pinimg.com/564x/03/08/34/030834f7223ebfd68a5b7a0749b1659e.jpg' placeholder="Nhập email" style={{ height: 522, width: 450, marginLeft: -10 }} alt="login form" className='rounded-start' />
          </MDBCol>

          <MDBCol md='6' style={{ marginLeft: 50 }}>
            <img className="mt-2 " style={{ marginLeft: 150 }} width={170} src={logoShop} />
            <Form
              form={form}
              onFinish={login}
              layout="vertical" className='mt-4'>

              <Form.Item
                className='mb-1 ms-5 align-center'
                name="email"
                hasFeedback
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
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
              >
                <Input
                  placeholder="Mời nhập Email"
                  style={{ width: 365, height: 40 }}
                />
              </Form.Item>
              <div className='row'>
                <Form.Item

                  className='mb-1 ms-5 mt-3 align-center col-md-9'
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống pass !",
                    },
                  ]}
                  labelCol={{ span: 20 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Input
                    placeholder="Mời nhập Password"
                    type='password'
                    value={password}
                    // onChange={handlePasswordChange}
                    style={{ width: 365, height: 40 }}
                  />

                </Form.Item>  <div className='col' style={{ marginTop: 20 }} >
                  <IoEyeOffOutline size={25} className='showpass' />
                </div>
              </div>
              <div className="ms-5  ">
                <a href="!#" style={{ fontSize: 15, marginLeft: 240 }}>Forgot password?</a>
              </div>
              <Button className="mb-1 w-50" style={{ marginLeft: 120 }} htmlType='submit' >Sign in</Button>
            </Form>






            <div className="divider text-center d-flex align-items-center" style={{ marginLeft: 210 }}>
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <Button className="mb-1 fw-bold w-75 text-light button-hihi" style={{ backgroundColor: '#3b5998', marginLeft: 70, height: 40 }}>
              <FaSquareFacebook size={30} className='me-2' />
              Continue with facebook
            </Button>

            <Button className="fw-bold w-75 text-light  button-hihi" style={{ backgroundColor: '#55acee', marginLeft: 70, height: 40 }}>
              <IoLogoGoogle size={30} className='me-1' />
              Continue with Email
            </Button>

          </MDBCol>

        </MDBRow>
      </MDBCard>
      <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
    </MDBContainer>
    
  )
}