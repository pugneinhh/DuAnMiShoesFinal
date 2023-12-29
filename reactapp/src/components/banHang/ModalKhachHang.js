import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Switch, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { toast } from "react-toastify";

const ModalKhachHang = (props) => {
    const { openKhachHang, setOpenKhachHang } = props;


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
            dataIndex: "tenSP",
            center: "true",
            sorter: (a, b) => a.ma - b.ma,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "tenSP",
            center: "true",
            sorter: (a, b) => a.ma - b.ma,
        },

        {
            title: "Email",
            dataIndex: "soLuong",
        },
        {
            title: "Số điện thoại",
            dataIndex: "soLuong",
        },
        {
            title: "Điểm",
            dataIndex: "soLuong",
        },

        {
            title: "Hành động",
            key: "action",


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
                <Table  className='text-center mt-4' columns={columns} pagination={{
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