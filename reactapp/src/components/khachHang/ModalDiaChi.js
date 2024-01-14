import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tag } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddModalDiaChi from "./AddModalDiaChi";
const ModalDiaChi = (props) => {
    const { openModalDiaChi, setOpenModalDiaChi,idKH } = props;
    const handleClose = () => {
        setData([]);
        setOpenModalDiaChi(false);
        const loadDiaChi = async () => {
            console.log("heheheh");
            const result = await axios.get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`, {
              
            });
                console.log("dc",result.data);
              setData(result.data);  
          };
          loadDiaChi();
        console.log("đóng")
    };
    
    const [openModalAddDiaChi, setOpenModalAddDiaChi] = useState(false);
    const handleCloseAddMoDalDiaChi = () => {
        setOpenModalAddDiaChi(false);
    }
    console.log("idkh",idKH);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDiaChi = async () => {
            console.log("heheheh");
            const result = await axios.get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`, {
              
            });
                console.log("dc",idKH);
              setData(result.data);  
          };
          loadDiaChi();
      }, []);


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