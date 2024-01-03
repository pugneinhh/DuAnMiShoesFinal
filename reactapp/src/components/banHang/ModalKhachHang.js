
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Image } from 'cloudinary-react';
import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";

const ModalKhachHang = (props) => {
    const { openKhachHang, setOpenKhachHang } = props;


    const [khachHang, setKhachHangs] = useState([]);

    useEffect(() => {
        loadKhachHang();
    }, []);

    const loadKhachHang = async () => {
        const result = await axios.get("http://localhost:8080/nguoi-dung/khach-hang", {
            validateStatus: () => {
                return true;
            }
        });
        setKhachHangs(result.data);
    };
    const handleClose = () => {
        setOpenKhachHang(false);
        console.log("đóng")
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            render: (id, record, index) => {
                ++index;
                return index;
            },
            showSorterTooltip: false,
        },
        {
            title: "Ảnh",
            dataIndex: "anh",
            key: "link",
            center: "true",
            render: (link) => {
                return <><Image
                    cloudName="dtetgawxc"
                    publicId={link}
                    width="100"
                    crop="scale"
                    href={link}
                /></>;
            }
        },
        {
            title: "Tên khách hàng",
            dataIndex: "tenND",
            center: "true",
            sorter: (a, b) => a.ma - b.ma,
        },

        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "sdt",
        },
        {
            title: "Điểm",
            dataIndex: "diem",
        },

        {
            title: "Hành động",
            key: "action",
            render: () => (
                <Space size="middle">
                    <a>
                        <Button type="primary" shape='round' className='bg-success text-white' icon={<EyeOutlined />}>Chọn khách hàng</Button>
                    </a>
                </Space>
            ),

        },
    ]

    return (
        <Modal
            title="Khách hàng"
            centered
            open={openKhachHang}
            onOk={handleClose}
            onCancel={handleClose}

            // footer={
            //     <button onClick={handleClose}>Hủy</button>
            // }
            width={1300}
        >
            <div className="container">
                <div className="row mt-4">
                    <Input className="col-md-9 ms-5"></Input>
                    <Button className=' col-md-1 ms-5  bg-success float-end bg-primary' type="primary">Tìm kiếm</Button>
                </div>
                    <Table
                        style={{justifyContent: 'center'}}
                        className='text-center mt-4'
                        dataSource={khachHang}
                        columns={columns}
                        pagination={{
                            showQuickJumper: true,
                            defaultPageSize: 5,
                            position: ['bottomCenter'],
                            defaultCurrent: 1,
                            total: 100,
                        }} />
            </div>

        </Modal>
    )
}
export default ModalKhachHang;