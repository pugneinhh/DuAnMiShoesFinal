
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { KhachHangAPI } from "../api/user/khachHang.api";
import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";

import AddModalDiaChi from "./AddModalDiaChi";
const ModalDiaChi = (props) => {
    const { openModalDiaChi, setOpenModalDiaChi,idKH } = props;
    const handleClose = () => {
        setDiaChiKH([]);
        setOpenModalDiaChi(false);
        // console.log("đóng")
    };
    const [openModalAddDiaChi, setOpenModalAddDiaChi] = useState(false);
    const handleCloseAddMoDalDiaChi = () => {
      
        setOpenModalAddDiaChi(false);

    }
    // console.log("idkh",idKH);
    // const [data, setData] = useState([]);
    // const loadData = () => {
    //     console.log("diachir")
    //     KhachHangAPI.getAddressByUser(idKH)
    //         .then((res) => {
    //             // dispatch(SetEmployee(res.data.data));
    //             console.log("detail",res.data.data);
    //             setData(res.data.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // useEffect(() => {
    //     loadData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    const [DiaChiKH, setDiaChiKH] = useState([])
    useEffect(() => {
        loadDCKH();
    }, []);

    const loadDCKH = async () => {
        axios
            .get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`)
            .then((response) => {
                setDiaChiKH(response.data);
                console.log("11",response.data);           
            })
            .catch((error) => console.error("Error upfate item:", error));
    };
    console.log(DiaChiKH);
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
           
            <Button style={{marginLeft:400}} type="primary" onClick={() => setOpenModalAddDiaChi(true)}>
                +Thêm địa chỉ mới
            </Button>
            
            <hr className="mt-4"></hr>
            <div>
                
            </div>
            <AddModalDiaChi openModalAddDiaChi={openModalAddDiaChi}
                setOpenModalAddDiaChi={setOpenModalAddDiaChi}
                idKH={idKH}
                onOk={handleCloseAddMoDalDiaChi}
                onCancel={handleCloseAddMoDalDiaChi}
            />
        </Modal>
    )
}
export default ModalDiaChi;