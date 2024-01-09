import { Button, Empty, Input, Modal, Space, Switch, Tabs, Tag } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { BsQrCodeScan } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { QrReader } from 'react-qr-reader';
import { MdOutlinePayments, MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from "axios";
import ModalSanPham from "./ModalSanPham";
import ModalThanhToan from "./ModalThanhToan";
import ModalKhachHang from "./ModalKhachHang";
import { createInvoice,removeInvoice } from "./redux/Cartaction";
import {useDispatch,useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import { GetBill } from "./reducer/Bill.reducer";
// import { getHoaDons } from "./redux/selector";
const {TabPane}=Tabs;
const BanHang = () => {
  
  const [activeKey, setActiveKey] = useState(1);
  // const newTabIndex = useRef(0);
  // const demTab = useRef(0);
  const initState=useRef(2);
  const hoaDons=useSelector(GetBill);
 
  const [open, setOpen] = useState(false);
  const [openSanPham, setOpenSanPham] = useState(false);
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
////tạo hóa đơn bằng redux
// const dispatch=useDispatch();
// const handleClickAddHD=() => {
//   const maxKey=Math.max(...hoaDons.map((hd)=>hd.key));
//   if(hoaDons.length>=5){
//     return toast.error('Không được vượt quá 5 hóa đơn!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//   }
//   if(maxKey>0){
//   dispatch(
//     createInvoice(
//     {"id":uuid(),label: `Hóa đơn ${maxKey+1}`,
//           children: `New Tab ${maxKey+1}`,ma:`HDTQ${maxKey+1}`,trangThai:0,sanPham:null,key:`${maxKey+1}`}
//   )
//   );
//   initState.current++;
//   setActiveKey(maxKey+1);
  
//     }else{
//       dispatch(
//         createInvoice(
//         {"id":uuid(),label: `Hóa đơn ${initState.current}`,
//               children: `New Tab ${initState.current}`,ma:`HDTQ${initState.current}`,trangThai:0,sanPham:null,key:`${initState.current}`}
//       )
//       );
//       initState.current++;
//       setActiveKey(initState.current);
//     }

// };
// ///remove hóa đơn bằng redux
// const handleClickRemoveHD=(targetKey) => {
//   console.log(targetKey);
//   console.log(hoaDons.filter((hoaDon)=>hoaDon.key==targetKey)[0]);
//   if(hoaDons.length<=0){
//     return toast.error('Không còn hóa đơn!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//   }else{
//   dispatch(
//     removeInvoice(
//     hoaDons.filter((hoaDon)=>hoaDon.key==targetKey)[0]
//   )
//   );
  
//   initState.current--;
//   setActiveKey(initState.current);
//     }
// };
//onedit sự kiện
// const onEdit = (targetKey, action) => {
//     if (action === 'handlrClickAddHD') {
//       handleClickAddHD();
//     } else {
//       handleClickRemoveHD(targetKey);
//     }
//   };




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
         {/* <Button type="primary" onClick={handleClickAddHD} >Tạo hóa đơn</Button> */}
      </div>

      <div className="bg-light m-2 p-3 pt-2" style={{ borderRadius: 20 }}>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          // onEdit={onEdit}
        >
 {hoaDons.map((tab) => (
    <TabPane tab={tab.label} key={tab.key}>
      {tab.sanPham==null ? (
        /* Content when tab.sanPham is empty */
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <h4><FaList /> Danh sách</h4>
            </div>
            <div className="text-end">
              <Button type="primary" icon={<BsQrCodeScan />} onClick={() => setOpenScan(true)}>Quét QR sản phẩm</Button>
              <Button type="primary" className="ms-3" onClick={() => setOpenSanPham(true)}>Chọn sản phẩm</Button>
              <ModalSanPham
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
        </>
      ) : (
        /* Content when tab.sanPham is not empty */
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
                openSanPham={openSanPham}
                setOpenSanPham={setOpenSanPham}
                onOk={handleCloseSanPham}
                onCancel={handleCloseSanPham}
              />
            </div>
          </div>
            {/* Your content when tab.sanPham is not empty */}
            (hehhee {tab.ma})
          </div>
        </>
      )}
    </TabPane>
  ))}
        </Tabs>
        

        {/* thông tin khách hàng */}
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
          <p>Tên khách hàng: <Tag color="#cccccc" className="rounded-pill">Khách lẻ</Tag></p>
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
              <Button className="col-md-9" icon={<MdOutlinePayments size={25} onClick={() => setOpenThanhToan(true)} />}></Button>
              <ModalThanhToan openThanhToan={openThanhToan} setOpenThanhToan={setOpenThanhToan}
                onOk={handleCloseThanhToan}
                onCancel={handleCloseThanhToan}  />
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