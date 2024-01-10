
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';

import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";

const ModalDiaChi = (props) => {
    const { openModalDiaChi, setOpenModalDiaChi } = props;
    const handleClose = () => {
        setOpenModalDiaChi(false);
        console.log("đóng")
    };

    

   

    return (
        <Modal
            title="Khách hàng"
            centered
            open={openModalDiaChi}
            onOk={handleClose}
            onCancel={handleClose}

            // footer={
            //     <button onClick={handleClose}>Hủy</button>
            // }
            width={600}
        >
           
            <Button style={{marginLeft:400}} type="primary" onClick={() => setOpenModalDiaChi(true)}>
                +Thêm địa chỉ mới
            </Button>
            
            <hr className="mt-4"></hr>
            <div>
                
            </div>
        </Modal>
    )
}
export default ModalDiaChi;