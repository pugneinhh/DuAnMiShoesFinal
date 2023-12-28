import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Switch } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { toast } from "react-toastify";
// import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Switch } from "antd";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import moment from 'moment';
// import { toast } from "react-toastify";


const ModalSanPham = (props) => {
    const { openSanPham, setOpenSanPham } = props;


    const handleClose = () => {
        setOpenSanPham(false);
        console.log("đóng")
    };


    return (
        <Modal
            title="Sản phẩm"
            centered
            open={openSanPham}
            onCancel={handleClose}
            footer={
                <button onClick={handleClose}>Hủy</button>
            }
            width={1000}
        >
        <h1>MODAL SẢN PHẨM NÈ</h1>
          
        </Modal>
    )
}
export default ModalSanPham;