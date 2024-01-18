import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Tag, Radio } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddModalDiaChi from "./AddModalDiaChi";

const ModalDiaChi = (props) => {
    const { openModalDiaChi, setOpenModalDiaChi,idKH,setIdKH} = props;
    const [tableLayout, setTableLayout] = useState();
      const [top, setTop] = useState('none');
      const [bottom, setBottom] = useState('bottomRight');
      const [nowAddress,setNowAddress] = useState("");
      console.log("now",nowAddress);
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
      
        const result = await axios.get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`, {
        });
            console.log("dc",idKH);
          setData(result.data);  
          result.data.map((item) => {
            if(item.trangThai===0){
              setNowAddress(item.id);
            }
        }
          )
      };

    useEffect(() => {
          loadDiaChi();
          
      }, [idKH]);



      // const rowSelection = {  
      //       type:'radio',                
      //   onChange: (selectedRowKeys, selectedRows) => {
      //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      //   },
      //   getCheckboxProps: (record) => ({
      //       checked:record.trangThai===0
           
      //     }),
      // };
      
      

      const tableProps = {
        title: false ,
        showHeader:false,
        footer: false,
        tableLayout,
      };
      console.log("dịa chỉ",datas);
      const dataSource = datas.map((item, index) => ({
        key: item.id,
        id:item.id,
        nguoiDung: item.nguoiDung,
        tenNguoiNhan:item.tenNguoiNhan,
        soDienThoai:item.soDienThoai,
        idThanhPho:item.idThanhPho,
        idHuyen:item.idHuyen,
        idXa:item.idXa,
        tenThanhPho:item.tenThanhPho,
        tenHuyen:item.tenHuyen,
        tenXa:item.tenXa,
        diaChi:item.diaChi,
        trangThai:item.trangThai
      }));
      const columns = [
        // other columns...
        {
          render :(text,record) => (
            <Radio 
            checked={nowAddress === record.id}
             onChange = {() => setNowAddress(record.id)}
            />
          )
        },
        {
          title: 'Dia chi',
          dataIndex: 'id',
          key: 'id',
          render: (text, record) => (
            <div>
              <h6>{record.tenNguoiNhan} | {record.soDienThoai}</h6>
              <p>{record.diaChi}, {record.tenHuyen}, {record.tenThanhPho}</p>
              {record.trangThai === 0 ? (<Tag color="red">Mặc định</Tag>) : <div></div>}
              
            </div>
            
          ),
        },
        {
            title: 'Action',
          dataIndex: 'id',
          key: 'id',
          render: (text, record) => (
             <Button type="primary" className='custom-button'>Cập nhật</Button>
            
          ),
        }
      ];
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
                      
                       
            
           
  <Table
    // rowSelection={rowSelection}
    // defaultCheckedRowKeys={selectedRowKeys}  
      //  {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={columns}
        dataSource={dataSource}  
      />
          
            </div>
            <AddModalDiaChi openModalAddDiaChi={openModalAddDiaChi}
                setOpenModalAddDiaChi={setOpenModalAddDiaChi}
                idKH={idKH}
                setIdKH={setIdKH}
                loadDiaChi={loadDiaChi}
                onOk={handleCloseAddMoDalDiaChi}
                onCancel={handleCloseAddMoDalDiaChi}
            />
        </Modal>
    )
}
export default ModalDiaChi;