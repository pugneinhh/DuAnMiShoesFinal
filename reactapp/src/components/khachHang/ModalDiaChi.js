import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Tag, Radio } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddModalDiaChi from "./AddModalDiaChi";

const ModalDiaChi = (props) => {
    const { openModalDiaChi, setOpenModalDiaChi,idKH,setIdKH } = props;
    const handleClose = () => {
        setData([]);
        setIdKH("");
        setOpenModalDiaChi(false);
        console.log("đóng")
    };
    
    const [openModalAddDiaChi, setOpenModalAddDiaChi] = useState(false);
    const handleCloseAddMoDalDiaChi = () => {
        setOpenModalAddDiaChi(false);
    }
    const [datas, setData] = useState([]);
    const loadDiaChi = async () => {
        console.log("heheheh");
        const result = await axios.get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`, {
        });
            console.log("dc",idKH);
          setData(result.data);  
      };

    useEffect(() => {
          loadDiaChi();
      }, [idKH]);


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
                      {
                        datas.map((data, index) => (
                          <tr className='pt-3 ms-2 row'>
                            <div className="col-md-2"><Radio></Radio></div>
                            
                            <div className='col-md-8 '>
                           <h6>{data.tenNguoiNhan}{" "}|{data.soDienThoai}</h6>
                        
                            {data.diaChi}, {data.tenHuyen}, {data.tenThanhPho}
                            {data.trangThai==0?(<Tag color="red">Mặc định</Tag>):<div></div>}
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-success">Cập nhật</button>
                            </div>
                            
                            <hr></hr>
                          </tr>

                        ))
                      }
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