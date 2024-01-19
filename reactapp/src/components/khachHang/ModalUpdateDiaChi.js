
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import { AddressApi } from "../api/address/AddressApi";
import { ToastContainer, toast } from "react-toastify";
import { da } from "date-fns/locale";



const ModalUpdateDiaChi = (props) => {
    const [form] = Form.useForm();
    const [listProvince, setListProvince] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWard, setListWard] = useState([]);
    const { openModalUpdateDiaChi, setOpenModalUpdateDiaChi,diaChiUpdate,setDiaChiUpdate,loadDiaChi } = props;
    const handleClose = () => {
        setOpenModalUpdateDiaChi(false);
        
    };
  
    const handleUpdateDC = (value) => {
        // console.log("phanh oi",province.key);
        
        const data={
            ...value,
            // idThanhPho: province === null ? null : province.key,
            // idHuyen: district === null ? null : district.key,
            // idXa: ward === null ? null : ward.key,
        };
        axios
        .post(`http://localhost:8080/admin/khach-hang/update-dia-chi/${data.id}`, data)
        .then((response) => {
            console.log(response.data);
            // navigate('/voucher');
            toast("✔️ Cập nhật thành công!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            form.resetFields();
            loadDiaChi();
            handleClose();
            
        })
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
    console.log("diacji",diaChiUpdate)
    useEffect(() => {
    console.log("updatesss")
       form.setFieldsValue(
        {id:diaChiUpdate.id,
        idNguoiDung:diaChiUpdate.nguoiDung,
        diaChi:diaChiUpdate.diaChi,
        tenNguoiNhan:diaChiUpdate.tenNguoiNhan,
        soDienThoai:diaChiUpdate.soDienThoai,
        tenThanhPho:diaChiUpdate.tenThanhPho,
        tenHuyen:diaChiUpdate.tenHuyen,
        tenXa:diaChiUpdate.tenXa,
        trangThai:diaChiUpdate.trangThai,
        idXa:diaChiUpdate.idXa,
        idHuyen:diaChiUpdate.idHuyen,
        idThanhPho:diaChiUpdate.idThanhPho,
        }
       )
        loadDataProvince();
        // loadDetailDiaChi();
    }, [diaChiUpdate]);



    return (
        <Modal
            title="Cập nhật địa chỉ"
            centered
            open={openModalUpdateDiaChi}
            
            onOk={() => {
                Modal.confirm({
                  title: "Thông báo",
                  content: "Bạn có chắc chắn muốn cập nhật không?",
                  style:{zIndex:2000},
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
            onCancel={handleClose}
            zIndex={1000}
            // footer={
            //     <button onClick={handleClose}>Hủy</button>
            // }
            width={600}
        >
            <Form form={form} onFinish={handleUpdateDC} layout="vertical">
                <Form.Item name="idNguoiDung" hidden >
                    <Input></Input>
                </Form.Item>
                <Form.Item name="trangThai" hidden >
                    <Input></Input>
                </Form.Item>
                <Form.Item name="idXa" hidden >
                    <Input></Input>
                </Form.Item>
                <Form.Item name="idHuyen" hidden >
                    <Input></Input>
                </Form.Item>
                <Form.Item name="idThanhPho" hidden >
                    <Input></Input>
                </Form.Item>
                <Form.Item name="id" hidden></Form.Item>
                <Form.Item
                    name="tenNguoiNhan"
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
                    <Input />
                </Form.Item>
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
      /><ToastContainer />
        </Modal>
    )
}
export default ModalUpdateDiaChi;