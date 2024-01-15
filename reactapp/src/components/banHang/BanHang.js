import { Button, Empty, Input, Modal, Space, Switch, Tabs, Tag ,Table,InputNumber  } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { BsQrCodeScan } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { QrReader } from 'react-qr-reader';
import { MdOutlinePayments, MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from "axios";
import { DeleteFilled } from "@ant-design/icons";
import ModalSanPham from "./ModalSanPham";
import ModalThanhToan from "./ModalThanhToan";
import ModalKhachHang from "./ModalKhachHang";
import { createInvoice,removeInvoice } from "./redux/Cartaction";
import {useDispatch,useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import { CreateBill, GetBill, GetBillByKey, RemoveBill } from "./reducer/Bill.reducer";
import NhanVien from "../nhanVien/NhanVien";
import { GetProduct, UpdateProduct } from "./reducer/Product.reducer";
import { Image } from "cloudinary-react";
import { GetClient } from "./reducer/Client.reducer";
import moment from "moment";

// import { getHoaDons } from "./redux/selector";
const {TabPane}=Tabs;
const BanHang = () => {
  
  const [activeKey, setActiveKey] = useState(0);
  const [selectedTabID,setSelectedTabID] = useState("");
  // const newTabIndex = useRef(0);
  // const demTab = useRef(0);
  const initState=useRef(1);
  const hoaDons=useSelector(GetBill);
  const ctspHD = useSelector(GetProduct);
  const client = useSelector(GetClient);
  console.log(ctspHD);
  console.log("Client",client);
  let data = ([""]);
  let idHD = ("");
  let KH = ([""]);


  const [open, setOpen] = useState(false);
  const [openSanPham, setOpenSanPham] = useState(false);

  const onChangeSoLuong = (value,record) =>{
      // update số lượng vào reducer
      dispatch(UpdateProduct({soLuong : value,chiTietSanPham: record.chiTietSanPham, activeKey : activeKey }));
  }

// api add bill
 const handleAddBill = (value) =>{
  const data = hoaDons.filter((item) => item.key === value);
  console.log("Object ",data[0]);
  const addHD = async() => {
    await axios.post(`http://localhost:8080/ban-hang/add-hoa-don`,data[0]);
  }
  addHD();
  setOpenThanhToan(true)
 }

 const handleAddCTSP = (value) => {
  axios.post(`http://localhost:8080/ban-hang/addHDCT`,value);
 }

 const handleThanhToan = (value) => {

 }


// end 

  const handleCloseSanPham = () => {
    setOpenSanPham(false);
  }
  const [openKhachHang, setOpenKhachHang] = useState(false);
  const handleCloseKhachHang = () => {
    setOpenKhachHang(false);
  }
  const [openThanhToan, setOpenThanhToan] = useState(false);
  const handleCloseThanhToan = () => {
    setOpenThanhToan(false);
  }
  const onChange = (key) => {
    setActiveKey(key);

  };

  const handleClickTab = (id) => {
    console.log("Key",id)
    if (ctspHD.length > 0) {
   
    // ctspHD.map((index) => {(index.hoaDon === id) ? setCTSPs(index) : console.log("Nothing")})
    }
  }
////tạo hóa đơn bằng redux
console.log("hóa đơn:",hoaDons);
const dispatch=useDispatch();
const handleClickAddHD=() => {
  const maxKey=Math.max(...hoaDons.map((hd)=>hd.key));
  if(hoaDons.length>=5){
    return toast.error('Không được vượt quá 5 hóa đơn!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
  }
  if(maxKey>0){
  dispatch(
    CreateBill(
    {id:uuid(),ma:`HDTQ${maxKey+1}`,nhanVien:'Phanh',nguoiDung:null,voucher:null,ngayMua:null,giaGoc:null,giaGiamGia:null,thanhTien:null,diemSuDung:null,giaTriDiem:null,tenNguoiNhan:null,soDienThoai:null,diaChi:null,qrCode:null,ghiChu:null,ngayDuKienNhan:null,ngayNhan:'null',ngayTraHang:null,nguoiTao:'Phanh',nguoiSua:null,ngaySua:null,trangThai:0,key:`${maxKey+1}`}
  )
  );
  initState.current++;
 // setActiveKey(maxKey+1);
  
    }else{
      dispatch(
        CreateBill(
          {id:uuid(),ma:`HDTQ${initState.current}`,nhanVien:'Phanh',nguoiDung:null,voucher:null,ngayMua:null,giaGoc:null,giaGiamGia:null,thanhTien:null,diemSuDung:null,giaTriDiem:null,tenNguoiNhan:null,soDienThoai:null,diaChi:null,qrCode:null,ghiChu:null,ngayDuKienNhan:null,ngayNhan:'null',ngayTraHang:null,nguoiTao:'Phanh',nguoiSua:null,ngaySua:null,trangThai:0,key:`${initState.current}`}
          )
      );
      initState.current++;
   //   setActiveKey(initState.current);
    }

};
// ///remove hóa đơn bằng redux
const handleClickRemoveHD=(targetKey) => {
  console.log(targetKey);
  console.log(hoaDons.filter((hoaDon)=>hoaDon.key==targetKey)[0]);
  if(hoaDons.length<=0){
    return toast.error('Không còn hóa đơn!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
  }else{
  dispatch(
    RemoveBill(
    hoaDons.filter((hoaDon)=>hoaDon.key==targetKey)[0]
  )
  );
  
  initState.current--;
  setActiveKey(initState.current);
    }
};
// onedit sự kiện
const onEdit = (targetKey, action) => {
    if (action === 'handleClickAddHD') {
      handleClickAddHD();
    } else {
      handleClickRemoveHD(targetKey);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idCTSP",
      key: "idCTSP",
      render: (idCTSP, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Hình ảnh",
      dataIndex: "linkAnh",
      key: "linkAnh",
      center: "true",
      render: (linkAnh) => {
        return (
          <>
            <Image
              cloudName="dtetgawxc"
              publicId={linkAnh}
              width="50"
              crop="scale"
              href={linkAnh}
            />
          </>
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.mauSac}-${record.kichThuoc}]`}</span>
      ),
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
      render: (text, record) => (
        <span>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      render : (text,record) =>(
        <InputNumber min={1} value={record.soLuong} 
        onChange={(value) =>onChangeSoLuong(value,record)} 
        />
       
        )
      
    },
    {
      title: "Kích thước",
      dataIndex: "kichThuoc",
    },
    {
      title: "Màu sắc",
      dataIndex: "mauSac",
    
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                backgroundColor: `${record.mauSac}`,
                borderRadius: 30,
                width: 25,
                height: 25,
              }}
            ></div>
          </>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (text, record) => (
        <span>{`${Intl.NumberFormat("en-US").format(record.total)} VNĐ`}</span>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "Thao tác",
      render : () =>(
        <Space size="middle">
          <button className="btn btn-danger" style={{borderRadius:30}}><DeleteFilled size={20}/></button>
        </Space>
      )
      },
  ];


  //add và remove tab
  // const add = () => {
  //   if (demTab.current >= 5) {
  //     return toast.error('Không được vượt quá 5 hóa đơn!', {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });

  //   }
  //   const newActiveKey = `${newTabIndex.current++}`;
  //   setItems([
  //     ...items,
  //     {
  //       label: `Hóa đơn ${newTabIndex.current}`,
  //       children: `New Tab ${newTabIndex.current}`,
  //       key: newActiveKey,
  //     },
  //   ]);
  //   console.log('kkkkkkkk', newActiveKey);
  //   demTab.current++;
  //   setActiveKey(newActiveKey);
  // };
  // const remove = (targetKey) => {
  //   const targetIndex = items.findIndex((pane) => pane.key === targetKey);
  //   const newPanes = items.filter((pane) => pane.key !== targetKey);
  //   if (newPanes.length && targetKey === activeKey) {
  //     const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
  //     setActiveKey(key);
  //   }
  //   setItems(newPanes);
  //   demTab.current--;
  //   console.log('dem tru', demTab);
  // };
  // const onEdit = (targetKey, action) => {
  //   if (action === 'add') {
  //     add();
  //   } else {
  //     remove(targetKey);
  //   }
  // };
  ////quét QR sản phẩm
  const  totalPrice = (0);
  const [openScan, setOpenScan] = useState(false);
  const [qrData, setQrData] = useState('');
  const handleCloseScan = () => {
    setOpenScan(false);
  }
  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      // Gửi dữ liệu mã QR lên server ở đây
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container border-1">

      <div className="text-end mt-3 me-4 mb-3">

        {/* <Button type="primary" onClick={add} >Tạo hóa đơn</Button> */}
         <Button type="primary" onClick={handleClickAddHD} >Tạo hóa đơn</Button>
      </div>

      <div className="bg-light m-2 p-3 pt-2" style={{ borderRadius: 20 }}>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          defaultActiveKey={activeKey}
          type="editable-card"
          onEdit={onEdit}>
      
 {hoaDons.map((tab) => (
    data = ctspHD.filter((f)=> f.activeKey === activeKey),
    KH = client.filter((k) => k.activeKey === activeKey),
  
    <TabPane tab={tab.ma} key={tab.key}>
      {(data.length>0 ) ?  (
        <>
          <div>
            <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <h4><FaList /> Danh sách</h4>
            </div>
            <div className="text-end">
              <Button type="primary" icon={<BsQrCodeScan />} onClick={() => setOpenScan(true)}>Quét QR sản phẩm</Button>
              <Button type="primary" className="ms-3" onClick={() => setOpenSanPham(true)}>Chọn sản phẩm</Button>
              <ModalSanPham
               // idHD = {tab.id}
                activeKey = {activeKey}
                openSanPham={openSanPham}
                setOpenSanPham={setOpenSanPham}
                onOk={handleCloseSanPham}
                onCancel={handleCloseSanPham}
              />
            </div>
          </div>
             <Table
                  className="text-center"
                  dataSource={data}
                  columns={columns}
                  pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    position: ["bottomCenter"],
                    defaultCurrent: 1,
                   // total: cTSP.length,
                  }}
                />
          </div>

  <div className="d-flex justify-content-between align-items-center">
          <div className="text-start">
            <h4> Tài khoản</h4>
          </div>
          <div className="text-end">
            <>
              <Button className='me-5 bg-success' type="primary" onClick={() => setOpenKhachHang(true)}>
                Chọn tài khoản
              </Button>
              <ModalKhachHang openKhachHang={openKhachHang} 
                idHD = {tab.id}
                activeKey = {activeKey}
                setOpenKhachHang={setOpenKhachHang}
                onOk={handleCloseKhachHang}
                onCancel={handleCloseKhachHang}
              />

            </>
          </div>
        </div>
        <hr></hr>
      {/* thông tin khách hàng */}
        <div className="mb-3">
          <>
         
          {
          (KH.length == 0) ? (
            <p>Tên khách hàng: <Tag color="#cccccc" className="rounded-pill">Khách lẻ</Tag></p>
          ) : (
            <p>Tên khách hàng: <Tag bordered={false} color="processing" className="rounded-pill">{KH[0].ten}</Tag></p>
          )
          }
          </>
        </div>
        {/* hết thông tin tài khoản */}
        <h4>Khách hàng</h4>
        <hr></hr>
        <div className="container-fluid row">
          <div className="col-md-7"></div>
          <div className="col-md-5">
            <h4 className="fw-bold"><MdOutlineShoppingCartCheckout />Thông tin thanh toán</h4>
            <div className="row">
            <h6 className="col-md-3 mt-2">Thanh toán</h6>
              <Button className="col-md-9" icon={<MdOutlinePayments size={25} onClick ={ () => {
                //handleAddBill(dispatch(GetBillByKey({activeKey})))} 
                handleAddBill(activeKey)}
                } />}></Button>
              <ModalThanhToan openThanhToan={openThanhToan}       
              setOpenThanhToan={setOpenThanhToan}
                onOk={handleCloseThanhToan}
                onCancel={handleCloseThanhToan} 
                total = {data.reduce((accumulator,currentProduct) =>{
                  return accumulator + currentProduct.total},0)} />
            </div>
            
            <div className="row">
              <h6 className="col-md-4 mt-2">Mã giảm giá:</h6>

            <Space.Compact
                className="col-md-8"
            >
              <Input defaultValue="Mã giảm giá" />
              <Button className="ms-5" >Áp mã</Button>
            </Space.Compact>
            </div>
            <h6 className="mt-4">Trả sau: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch defaultChecked /></h6>
            <h6 className="mt-4">Giao hàng: &nbsp;&nbsp;&nbsp;<Switch /></h6>
            <div className="row">
              <div className="col-md-8">

                <h6 className="mt-4">Tiền hàng:  {`${Intl.NumberFormat("en-US").format(data.reduce((accumulator,currentProduct) =>{
                 return accumulator + currentProduct.total},0))}`}</h6>
                <h6 className="mt-4">Phí vận chuyển: 0</h6>
                <h6 className="mt-4">Giảm giá: 0</h6>
                <h6 className="mt-4">Điểm hiện tại: <>{(KH.length > 0) ? `${KH[0].diem}` : 0}</></h6>
                <h6 className="mt-4">Tổng tiền: {`${Intl.NumberFormat("en-US").format(data.reduce((accumulator,currentProduct) =>{
                 return accumulator + currentProduct.total},0))} VND`}</h6>
              </div>
              <div className="col-md-4">
            
                <h6 className="mt-4">VND</h6>
                
                <h6 className="mt-4">VND</h6>
                <h6 className="mt-4 text-danger">VND</h6>
              </div>
            </div>
            <Button className=' mt-2 me-5 bg-success float-end bg-black' type="primary">Xác nhận đặt hàng</Button>
          </div>
        </div>

      

        </>
      ) :
      (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <h4><FaList /> Danh sách</h4>
            </div>
            <div className="text-end">
              <Button type="primary" icon={<BsQrCodeScan />} onClick={() => setOpenScan(true)}>Quét QR sản phẩm</Button>
              <Button type="primary" className="ms-3" onClick={() => setOpenSanPham(true)}>Chọn sản phẩm</Button>
              <ModalSanPham
               // idHD = {tab.id}
                activeKey = {activeKey}
                openSanPham={openSanPham}
                setOpenSanPham={setOpenSanPham}
                onOk={handleCloseSanPham}
                onCancel={handleCloseSanPham}
              />
            </div>
          </div>

          {/* Bảng giỏ hàng */}
          <div>
            <Empty
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy4Pi1fKO57hmDRxcyP1cVftjpGRe2xg-ymZd6Q25PAgeq7dUX4MqU5GGLK3UYYYc_s8s&amp;usqp=CAU"
              imageStyle={{
                height: 250,
              }}
              description={
                <span>
                  Không có sản phẩm nào trong giỏ
                </span>
              }
            />
          </div>
          {/* Hết giỏ hàng */}
           <div className="d-flex justify-content-between align-items-center">
          <div className="text-start">
            <h4> Tài khoản</h4>
          </div>
          <div className="text-end">
            <>
              <Button className='me-5 bg-success' type="primary" onClick={() => setOpenKhachHang(true)}>
                Chọn tài khoản
              </Button>
              <ModalKhachHang openKhachHang={openKhachHang} 
                       // idHD = {tab.id}
                        activeKey = {activeKey}
                setOpenKhachHang={setOpenKhachHang}
                onOk={handleCloseKhachHang}
                onCancel={handleCloseKhachHang}
              />

            </>
          </div>
        </div>
        <hr></hr>
    
        <div className="mb-3">
        <>
         
         {
         (KH.length == 0) ? (
           <p>Tên khách hàng: <Tag color="#cccccc" className="rounded-pill">Khách lẻ</Tag></p>
         ) : (
           <p>Tên khách hàng: <Tag bordered={false} color="processing" className="rounded-pill">{KH[0].ten}</Tag></p>
         )
         }
         </>
        </div>
       
        <h4>Khách hàng</h4>
        <hr></hr>
        <div className="container-fluid row">
          <div className="col-md-7"></div>
          <div className="col-md-5">
            <h4 className="fw-bold"><MdOutlineShoppingCartCheckout />Thông tin thanh toán</h4>
            <div className="row">
            <h6 className="col-md-3 mt-2">Thanh toán</h6>
              <Button className="col-md-9" icon={<MdOutlinePayments size={25} onClick={() => setOpenThanhToan(true)} />}></Button>
              <ModalThanhToan openThanhToan={openThanhToan} setOpenThanhToan={setOpenThanhToan}
                onOk={handleCloseThanhToan}
                onCancel={handleCloseThanhToan} 
                 />
            </div>
            
            <div className="row">
              <h6 className="col-md-4 mt-2">Mã giảm giá:</h6>

            <Space.Compact
                className="col-md-8"
            >
              <Input defaultValue="Mã giảm giá" />
              <Button className="ms-5" >Áp mã</Button>
            </Space.Compact>
            </div>
            <h6 className="mt-4">Trả sau: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch defaultChecked /></h6>
            <h6 className="mt-4">Giao hàng: &nbsp;&nbsp;&nbsp;<Switch /></h6>
            <div className="row">
              <div className="col-md-8">

                <h6 className="mt-4">Tiền hàng: 0</h6>
                <h6 className="mt-4">Phí vận chuyển: 0</h6>
                <h6 className="mt-4">Giảm giá: 0</h6>
                <h6 className="mt-4">Điểm hiện tại: <>{(KH.length > 0) ? `${KH[0].diem}` : 0}</></h6>
                <h6 className="mt-4">Tổng tiền: 0</h6>
              </div>
              <div className="col-md-4">
            
                <h6 className="mt-4">VND</h6>
                
                <h6 className="mt-4">VND</h6>
                <h6 className="mt-4 text-danger">VND</h6>
              </div>
            </div>
            <Button className=' mt-2 me-5 bg-success float-end bg-black' type="primary">Xác nhận đặt hàng</Button>
          </div>
        </div>
        </>
      ) } 
    </TabPane>
  ))}

        </Tabs>
        
        {(hoaDons.length === 0 || activeKey === 0 || !activeKey) ? (
          <>
        <div className="mb-3">
          <p>Tên khách hàng: <Tag color="#cccccc" className="rounded-pill">Khách lẻ</Tag></p>
        </div>
       
        <h4>Khách hàng</h4>
        <hr></hr>
        <div className="container-fluid row">
          <div className="col-md-7"></div>
          <div className="col-md-5">
            <h4 className="fw-bold"><MdOutlineShoppingCartCheckout />Thông tin thanh toán</h4>
            <div className="row">
            <h6 className="col-md-3 mt-2">Thanh toán</h6>
              <Button className="col-md-9" icon={<MdOutlinePayments size={25} onClick={() => setOpenThanhToan(true)} />}></Button>
              <ModalThanhToan openThanhToan={openThanhToan} setOpenThanhToan={setOpenThanhToan}
                onOk={handleCloseThanhToan}
                onCancel={handleCloseThanhToan}
                 />
            </div>
            
            <div className="row">
              <h6 className="col-md-4 mt-2">Mã giảm giá:</h6>

            <Space.Compact
                className="col-md-8"
            >
              <Input defaultValue="Mã giảm giá" />
              <Button className="ms-5" >Áp mã</Button>
            </Space.Compact>
            </div>
            <h6 className="mt-4">Trả sau: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch defaultChecked /></h6>
            <h6 className="mt-4">Giao hàng: &nbsp;&nbsp;&nbsp;<Switch /></h6>
            <div className="row">
              <div className="col-md-8">

                <h6 className="mt-4">Tiền hàng:</h6>
                <h6 className="mt-4">Phí vận chuyển:</h6>
                <h6 className="mt-4">Giảm giá:</h6>
                <h6 className="mt-4">Điểm hiện tại:</h6>
                <h6 className="mt-4">Tổng tiền:</h6>
              </div>
              <div className="col-md-4">
            
                <h6 className="mt-4">VND</h6>
                
                <h6 className="mt-4">VND</h6>
                <h6 className="mt-4 text-danger">VND</h6>
              </div>
            </div>
            <Button className=' mt-2 me-5 bg-success float-end bg-black' type="primary">Xác nhận đặt hàng</Button>
          </div>
        </div>
        </>
      ) : console.error()}
       
       

      </div>


      <Modal
        title={<h5>QR core scaner</h5>}
        centered
        open={openScan}
        onOk={handleCloseScan}
        onCancel={handleCloseScan}
        footer={[
          <Button onClick={handleCloseScan}>Cancel</Button>
        ]}
        width={500}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          onResult={(result, error) => {
            if (!!result) {

              setQrData(result?.text);

            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: '100%' }}
        />
      </Modal>

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
    </div>
  )

}
export default BanHang;