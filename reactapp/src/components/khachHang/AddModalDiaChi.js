
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { AddressApi } from "../api/address/AddressApi";
import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";

const AddModalDiaChi = (props) => {
    const [form] = Form.useForm();
    const [listProvince, setListProvince] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWard, setListWard] = useState([]);
    const { openModalAddDiaChi, setOpenModalAddDiaChi } = props;
    const handleClose = () => {
        setOpenModalAddDiaChi(false);
        console.log("đóng")
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
        console.log("fdfdf", valueProvince);
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



    return (
        <Modal
            title="Thêm địa chỉ"
            centered
            open={openModalAddDiaChi}
            onOk={handleClose}
            onCancel={handleClose}

            // footer={
            //     <button onClick={handleClose}>Hủy</button>
            // }
            width={600}
        >
            <Form form={form} layout="vertical">

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
        </Modal>
    )
}
export default AddModalDiaChi;