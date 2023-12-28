import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Switch } from "antd";
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


    return (
        <Modal
            title="Thêm khách hàng"
            centered
            open={openKhachHang}
            onOk={handleClose}
            onCancel={handleClose}

            // footer={
            //     <button onClick={handleClose}>Hủy</button>
            // }
            width={800}
        >
            <h1>MODAL Thanh khacshh àng</h1>

        </Modal>
    )
}
export default ModalKhachHang;