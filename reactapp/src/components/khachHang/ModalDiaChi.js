import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Tag, Radio } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddModalDiaChi from "./AddModalDiaChi";
import { ToastContainer, toast } from "react-toastify";
import ModalUpdateDiaChi from "./ModalUpdateDiaChi";

const ModalDiaChi = (props) => {
    const { openModalDiaChi, setOpenModalDiaChi, idKH, setIdKH } = props;
    const [tableLayout, setTableLayout] = useState();
<<<<<<< HEAD
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [nowAddress, setNowAddress] = useState("");

=======
      const [top, setTop] = useState('none');
      const [bottom, setBottom] = useState('bottomRight');
      const [nowAddress,setNowAddress] = useState("");
      
>>>>>>> developer
    const handleClose = () => {
        setData([]);
        setIdKH("");
        setOpenModalDiaChi(false);
        console.log("đóng")
    };
<<<<<<< HEAD
    console.log("modal địa chỉ", openModalDiaChi);
    const handleUpdateTT = () => {
        console.log("diachimacdinhmoi", nowAddress)
        axios
            .post(`http://localhost:8080/admin/khach-hang/update-tt-dc/${nowAddress}`)
            .then((response) => {
                console.log("update", response.data);
                toast("✔️ Cập nhật dịa chỉ mặc định thành công!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                loadDiaChi();

            })
=======
    console.log("modal địa chỉ",openModalDiaChi);
    const handleUpdateTT=()=>{
        console.log("diachimacdinhmoi",nowAddress)
        axios
        .post(`http://localhost:8080/admin/khach-hang/update-tt-dc/${nowAddress}`)
        .then((response) => {
            console.log("update",response.data);
            toast("✔️ Cập nhật dịa chỉ mặc định thành công!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
           loadDiaChi();
            
        })
>>>>>>> developer
    }
    const [openModalAddDiaChi, setOpenModalAddDiaChi] = useState(false);
    const handleCloseAddMoDalDiaChi = () => {
        setOpenModalAddDiaChi(false);
    }
<<<<<<< HEAD
    const [openModalUpdateDiaChi, setOpenModalUpdateDiaChi] = useState(false);
    const handleOpenUpdateDiaChi = () => {
        setOpenModalUpdateDiaChi(true);
    }
    console.log("idkh", idKH)
    const [datas, setData] = useState([]);

    const loadDiaChi = () => {
        console.log("heheheh");
        axios.get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`).then((respone) => {
            setData(respone.data);
            respone.data.map((item) => {
                if (item.trangThai === 0) {
                    setNowAddress(item.id);
                }
            })
        })




    }

    useEffect(() => {
        if (idKH != null && idKH != undefined) {
            loadDiaChi();
        }
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
        title: false,
        showHeader: false,
        footer: false,
        tableLayout,
    };
    console.log("dịa chỉ", datas);
    const dataSource = datas.map((item, index) => ({
=======
    const handleCloseModalDiaChi = () => {
      setOpenModalDiaChi(false);
  }
  const handleOpenADDModalDiaChi = () => {
    setOpenModalAddDiaChi(true);
    // setOpenModalDiaChi(false);
}
    const [openModalUpdateDiaChi, setOpenModalUpdateDiaChi] = useState(false);
    const [diaChiUpdate, setDiaChiUpdate] = useState({});
    const handleOpenUpdateDiaChi=(value)=>{
        setDiaChiUpdate(value)
        //  setOpenModalDiaChi(false);
        setOpenModalUpdateDiaChi(true);
       
    }

    const [datas, setData] = useState([]);
    
    const loadDiaChi =  () => {
      console.log("heheheh");
         axios.get(`http://localhost:8080/admin/khach-hang/dia-chi/${idKH}`).then((respone)=>{
           setData(respone.data);  
           respone.data.map((item) => {
            if(item.trangThai===0){
              setNowAddress(item.id);
            }
        })
         })
         
         
          
      
      }

    useEffect(() => {
      if(idKH!=null&&idKH!=undefined){
          loadDiaChi();
    }
      }, [idKH]);


      

    
      const dataSource = datas.map((item, index) => ({
>>>>>>> developer
        key: item.id,
        id: item.id,
        nguoiDung: item.nguoiDung,
        tenNguoiNhan: item.tenNguoiNhan,
        soDienThoai: item.soDienThoai,
        idThanhPho: item.idThanhPho,
        idHuyen: item.idHuyen,
        idXa: item.idXa,
        tenThanhPho: item.tenThanhPho,
        tenHuyen: item.tenHuyen,
        tenXa: item.tenXa,
        diaChi: item.diaChi,
        trangThai: item.trangThai
    }));
    const columns = [
        // other columns...
        {
            render: (text, record) => (
                <Radio
                    checked={nowAddress === record.id}
                    onChange={() => setNowAddress(record.id)}
                />
            )
        },
        {
<<<<<<< HEAD
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
                <Button type="primary" className='custom-button' onClick={handleOpenUpdateDiaChi}>Cập nhật</Button>

            ),
=======
          title: 'Địa chỉ giao hàng',
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
          render: (text, record) => (
             <Button type="primary" className='custom-button' onClick={()=>handleOpenUpdateDiaChi(record)}>Cập nhật</Button>
            
          ),
>>>>>>> developer
        }
    ];
    return (
        <Modal
            title="Địa chỉ"
            centered
            open={openModalDiaChi}
            onOk={() => {
<<<<<<< HEAD
                Modal.confirm({
                    title: "Thông báo",
                    content: "Bạn có chắc chắn muốn thay đổi địa chỉ mặc định không?",
                    onOk: () => {
                        handleUpdateTT();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                            <CancelBtn />
                            <OkBtn />
                        </>
                    ),
                });
=======
              Modal.confirm({
                title: "Thông báo",
                content: "Bạn có chắc chắn muốn thay đổi địa chỉ mặc định không?",
                onOk: ()=>{
                  handleUpdateTT();
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
>>>>>>> developer
            }}
            onCancel={handleClose}

            // footer={
            //     <button onClick={handleClose}>Hủy</button>
            // }
            width={600}
        >
<<<<<<< HEAD

            <Button style={{ marginLeft: 400 }} type="primary" onClick={() => setOpenModalAddDiaChi(true)}>
=======
           
            <Button style={{marginLeft:400}} type="primary"  
            onClick={handleOpenADDModalDiaChi}
            >
>>>>>>> developer
                +Thêm địa chỉ mới
            </Button>

            <hr className="mt-4"></hr>
            <div>
<<<<<<< HEAD




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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
=======
                      
                       
            
           
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
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
>>>>>>> developer
            </div>
            <AddModalDiaChi openModalAddDiaChi={openModalAddDiaChi}
                setOpenModalAddDiaChi={setOpenModalAddDiaChi}
                idKH={idKH}
                setIdKH={setIdKH}
                loadDiaChi={loadDiaChi}
                onOk={handleCloseAddMoDalDiaChi}
                onCancel={handleCloseAddMoDalDiaChi}
            />
            <ModalUpdateDiaChi
<<<<<<< HEAD
                openModalUpdateDiaChi={openModalUpdateDiaChi}
                setOpenModalUpdateDiaChi={setOpenModalUpdateDiaChi}
                idKH={idKH}
                setIdKH={setIdKH}
                idDC={nowAddress}
                loadDiaChi={loadDiaChi}
                setIdDC={setNowAddress}
            />
        </Modal>

=======
            openModalUpdateDiaChi={openModalUpdateDiaChi}
             setOpenModalUpdateDiaChi={setOpenModalUpdateDiaChi}
             diaChiUpdate={diaChiUpdate}
             setDiaChiUpdate={setDiaChiUpdate}
             loadDiaChi={loadDiaChi}
            />
        </Modal>
        
>>>>>>> developer
    )
}
export default ModalDiaChi;