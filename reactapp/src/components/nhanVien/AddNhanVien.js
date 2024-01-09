import React, { useEffect, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider, Form, Input, message, Modal, Radio, Row, Select, Upload } from 'antd';
import { FaMoneyBills, FaQrcode } from 'react-icons/fa6';
import { QrReader } from 'react-qr-reader';
import { BsQrCodeScan } from 'react-icons/bs';
import UpLoadImage from './UploadAnh';
import { AddressApi } from '../api/address/AddressApi';
import { Link, useNavigate } from 'react-router-dom';
import { NhanVienAPI } from '../api/user/nhanVien.api';

import { ToastContainer, toast } from 'react-toastify';
export default function AddNhanVien() {

  const [form] = Form.useForm();
  const [fileImage, setFileIamge] = useState(null);
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const nav = useNavigate();

  const handleFileUpload = (fileData) => {
    setFileIamge(fileData);
  };

  const [showModal, setShowModal] = useState(false);

  const handleScanButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
    setProvince(valueProvince);
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
    setDistrict(valueDistrict);
  };

  const handleWardChange = (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWard(valueWard);
  };

  useEffect(() => {
    loadDataProvince();
  }, []);

  // QR code
  const [qrResult, setQrResult] = useState("");

  const handleQRResult = (result) => {
    if (result != null) {
      setShowModal(false);
    }
    setQrResult(result);
  };

  const handleSuccess = () => {
    form
      .validateFields()
      .then((values) => {
        if (fileImage === null) {
          message.error("Vui lòng chọn ảnh đại diện.");
        }
        const data = {
          ...values,
          ngaySinh: values.ngaySinh
            ? new Date(values.ngaySinh).getTime()
            : null,
          idThanhPho: province.key,
          idHuyen: district.key,
          idXa: ward.key,
        };
        const formData = new FormData();
        formData.append(`file`, fileImage);
        formData.append("request", JSON.stringify(data));
        NhanVienAPI.create(formData)
        
          .then((result) => {
          
            nav("/nhan-vien");
            toast('🦄 Thêm Thành công!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        toast('🦄 Thêm Thất bại!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  ////quét QR sản phẩm
  const [openScan, setOpenScan] = useState(false);
  const [qrData, setQrData] = useState('');
  const handleCloseScan = () => {
    setOpenScan(false);
  }
  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      // Gửi dữ liệu mã QR lên server ở đây
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <>
      <h1>
       
         <Divider orientation="center" color="none">
          <h3 className="text-first  fw-bold">
            <FaMoneyBills /> Thêm nhân viên
          </h3>
        </Divider>

      </h1>
      <Form form={form}
        layout="vertical"
      >
        <Row gutter={16} style={{ marginTop: "30px" }}>
          <Col span={7}>
            <Card style={{ height: "100%" }}>
              <h5 className='text-center fw-bold'>Ảnh đại diện</h5>
              <Row className='text-center mt-5'>
                <UpLoadImage  onFileUpload={handleFileUpload} />
              </Row>
            </Card>
          </Col>
          <Col span={17}>
            <Card style={{ height: "100%" }}>
              <h5 className='text-center fw-bold'>Thông tin nhân viên</h5>
              <Row
                justify="end"
                align="middle"
                style={{ marginBottom: "15px", marginTop: "10px" }}
                
              >
                <Col span={11}>
                  <Button
                    onClick={handleScanButtonClick}
                    style={{
                      width: "150px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                  >
                    {/* <FontAwesomeIcon icon={FaQrcode} /> */}
                    <span style={{ marginLeft: "10px" }}>QR-Căn cước</span>
                  </Button>
                  {/* {showModal && (
                    <QRScannerModal
                      visible={showModal}
                      onCancel={handleModalClose}
                      onQRResult={handleQRResult}
                    />
                  )} */}
                 
                  
                   
               
                </Col>
              </Row>
              <Row>
                <Col span={11} style={{ marginRight: "20px" }}  >
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
                        if (e.key === " " && e.target.selectionStart === 0) {
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
                    <Input  />
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
                  <Form.Item
                    name="tenThanhPho"
                    label="Tỉnh/Thành phố"
                    tooltip="Tỉnh/Thành phố của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
                        whitespace: true,
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""} onChange={handleProvinceChange}>
                      <Select.Option value="">
                        --Chọn Tỉnh/Thành phố--
                      </Select.Option>
                      {listProvince?.map((item) => {
                        return (
                          <Select.Option
                            key={item.ProvinceID}
                            value={item.ProvinceName}
                            valueProvince={item.ProvinceID}
                          >
                            {item.ProvinceName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="tenXa"
                    label="Xã/Phường"
                    tooltip="Xã/Phường của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn Xã/Phường.",
                        whitespace: true,
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""} onChange={handleWardChange}>
                      <Select.Option value="">--Chọn Xã/Phường--</Select.Option>
                      {listWard?.map((item) => {
                        return (
                          <Select.Option
                            key={item.WardCode}
                            value={item.WardName}
                            valueWard={item.WardCode}
                          >
                            {item.DistrictName}
                          </Select.Option>
                        );
                      })}
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
                    <Input  />
                  </Form.Item>
                  <Form.Item
                    name="tenHuyen"
                    label="Quận/Huyện"
                    tooltip="Quận/Huyện của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn Quận/Huyện.",
                        whitespace: true,
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""} onChange={handleDistrictChange}>
                      <Select.Option value="">
                        --Chọn Quận/Huyện--
                      </Select.Option>
                      {listDistricts?.map((item) => {
                        return (
                          <Select.Option
                            key={item.DistrictID}
                            value={item.DistrictName}
                            valueDistrict={item.DistrictID}
                          >
                            {item.DistrictName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="diaChi"
                    label="Số nhà"
                    tooltip="Số nhà của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập số nhà.",
                        whitespace: true,
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Input  />
                  </Form.Item>
                </Col>
                <Button
                  onClick={

                    handleSuccess
                  }
                  style={{
                    width: "110px",
                    height: "40px",
                    margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  // htmlType="reset"
                >
                  Hoàn tất
                </Button>

                <Link to={'/nhan-vien'} className='btn btn-danger' style={{
                  width: "110px",
                  height: "40px",
                  margin: "0 10px 10px 10px ",
                  backgroundColor: "#3366CC",
                  color: "white",
                }}>Hủy</Link>

              </Row>
      
            </Card>
          </Col>
        </Row>
      </Form>
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
      <ToastContainer />
    </>

  )

}
