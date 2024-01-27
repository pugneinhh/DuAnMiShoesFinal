import { Button, Empty, Input, Modal, Space, Switch, Tabs, Tag ,Table,InputNumber,Badge  } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { BsQrCodeScan } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { QrReader } from 'react-qr-reader';
import { MdOutlinePayments, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { DeleteFilled } from "@ant-design/icons";
import ModalSanPham from "./ModalSanPham";
import ModalThanhToan from "./ModalThanhToan";
import ModalKhachHang from "./ModalKhachHang";
import {useDispatch,useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import { CreateBill, GetBill,  RemoveBill, UpdateBill } from "../../../store/reducer/Bill.reducer";
import { GetProduct,  UpdateApartProduct, UpdatePushProduct } from "../../../store/reducer/Product.reducer";
import { Image } from "cloudinary-react";
import { GetClient } from "../../../store/reducer/Client.reducer";
import { GetInvoice, UpdateInvoice, RemoveInvoice, GetLengthListByBill  } from "../../../store/reducer/DetailInvoice.reducer";

const {TabPane}=Tabs;
const BanHang = () => {
  
  const [activeKey, setActiveKey] = useState(0);
  const [selectedTabID,setSelectedTabID] = useState("");
  // const newTabIndex = useRef(0);
  // const demTab = useRef(0);
  const initState=useRef(1);
  const hoaDons=useSelector(GetBill);
  const ctspHD = useSelector(GetInvoice);
  const ctsp = useSelector(GetProduct);
  const client = useSelector(GetClient);
  const [prevValue,setPrevValue] = useState(undefined);
  let lengthSP = (0);
  let data = ([""]);
  let KH = ([""]);


  const [open, setOpen] = useState(false);
  const [openSanPham, setOpenSanPham] = useState(false);

  const onChangeSoLuong = (value,record) =>{
    console.log("value",value)
    console.log("prevvlue",prevValue)
      if (prevValue === 0) {
        setPrevValue(undefined)
        return;
      } 
      if (value === 0 || !value){
        setPrevValue(0);
        Modal.confirm({
          title: "Thông báo",
          content: "Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng không không?",
          onOk: () => {
            dispatch(RemoveInvoice(({chiTietSanPham:record.id,hoaDon:activeKey})));
            dispatch(UpdatePushProduct({id:record.chiTietSanPham,soLuong:record.soLuong })); 
            data = ctspHD.filter((f)=> f.hoaDon === activeKey);
            toast("✔️ Cập nhật giỏ hàng thành công!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          },
          onCancel:() => {
           
          //  setSoLuong(prevValue);
          }
          ,
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn/>
              <OkBtn />
            </>
          ),
        });
      } else {
        const slt = ctsp.filter((i)=> i.id === record.chiTietSanPham)[0].soLuong;
        console.log("Số lượng tồn",slt);
        if (slt < value) {
          toast("Số lượng tồn không thỏa mãn yêu cầu!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          value = slt;
          dispatch(UpdateInvoice({soLuong : value,chiTietSanPham: record.chiTietSanPham, hoaDon : activeKey }));
          dispatch(UpdateApartProduct({id:record.chiTietSanPham,soLuong:value-record.soLuong })); 

        } else {
        dispatch(UpdateInvoice({soLuong : value,chiTietSanPham: record.chiTietSanPham, hoaDon : activeKey }));
        dispatch(UpdateApartProduct({id:record.chiTietSanPham,soLuong:value-record.soLuong })); 
        }

      }
    
  }



 const handleAddBill = () =>{
  dispatch(UpdateBill({key:activeKey,giaGoc:data.reduce((accumulator,currentProduct) =>{
    return accumulator + currentProduct.total},0)}));
  setOpenThanhToan(true)

  }
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

  // const handleClickTab = (id) => {

  //   if (ctspHD.length > 0) {
   
  //   // ctspHD.map((index) => {(index.hoaDon === id) ? setCTSPs(index) : console.log("Nothing")})
  //   }
  // }
////tạo hóa đơn bằng redux

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
    const idHD = uuid();
  dispatch(
    CreateBill(
    {id:idHD,ma:`HDTQ${maxKey+1}`,nhanVien:'Phanh',nguoiDung:null,voucher:null,ngayMua:null,giaGoc:0,giaGiamGia:0,thanhTien:0,diemSuDung:null,giaTriDiem:null,tenNguoiNhan:null,soDienThoai:null,diaChi:null,qrCode:null,ghiChu:null,ngayDuKienNhan:null,ngayNhan:'null',ngayTraHang:null,nguoiTao:'Phanh',nguoiSua:null,ngaySua:null,trangThai:0,key:idHD}
  )
  );
  initState.current++;
  setActiveKey(idHD);
  
    }else{
      const idHD = uuid();
      dispatch(
        
        CreateBill(
          {id:idHD,ma:`HDTQ${initState.current}`,nhanVien:'Phanh',nguoiDung:null,voucher:null,ngayMua:null,giaGoc:0,giaGiamGia:0,thanhTien:0,diemSuDung:0,giaTriDiem:null,tenNguoiNhan:null,soDienThoai:null,diaChi:null,qrCode:null,ghiChu:null,ngayDuKienNhan:null,ngayNhan:'null',ngayTraHang:null,nguoiTao:'Phanh',nguoiSua:null,ngaySua:null,trangThai:0,key:idHD
          //key:`${initState.current}`
        }
          )
      );
      initState.current++;
     setActiveKey(idHD);
    }

};
// ///remove hóa đơn bằng redux
const handleClickRemoveHD=(targetKey) => {

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
 // setActiveKey(initState.current);
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
      dataIndex: "chiTietSanPham",
      key: "chiTietSanPham",
      render: (chiTietSanPham, record, index) => {
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
      render: (linkAnh,record) => {
        return (
          <>
          {
          (!record.tenKM) ?
          (
            <Image
              cloudName="dtetgawxc"
              publicId={linkAnh}
              width="100" 
              borderRadius="10"
              crop="scale"
              href={linkAnh}
            /> ) : (
              <Badge.Ribbon text= {record.loaiKM === "Tiền mặt" ? ("-"+`${Intl.NumberFormat("en-US").format(record.giaTriKhuyenMai)} VNĐ`) : ("-"+record.giaTriKhuyenMai+"%")} color="red" size="small">
            <Image
              cloudName="dtetgawxc"
              publicId={linkAnh}
              width="100"
              borderRadius="10"
              crop="scale"
              href={linkAnh}
            /> 
              </Badge.Ribbon>
            )
            }
          </>
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
      render: (text, record) => {
        return (
          <>
          {
          (!record.tenKM) ?
          (
           <span>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</span>
          ) : 
          (
            <span style={{color:"red"}}><del style={{color:"black"}}>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</del>
            <br></br>{`${Intl.NumberFormat("en-US").format(record.giaBan - record.giaGiam)} VNĐ`}</span>
          )
    }
    </>
        )
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      render : (text,record) =>(
        <InputNumber min={0} 
        value={record.soLuong} 
        onChange={(value) => onChangeSoLuong(value,record)}
        />
       
        )
      
    },
    {
      title: "Kích thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu sắc",
      dataIndex: "tenMS",
    
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                backgroundColor: `${record.maMS}`,
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
      render : (record) =>(
        <Space size="middle">
          <button className="btn btn-danger" style={{borderRadius:30}} onClick={ () => { 
        Modal.confirm({
        title: "Thông báo",
        content: "Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng không không?",
        onOk: () => {
          dispatch(RemoveInvoice(({chiTietSanPham:record.id,hoaDon:activeKey})));
          dispatch(UpdatePushProduct({id:record.chiTietSanPham,soLuong:record.soLuong })); 
          data = ctspHD.filter((f)=> f.hoaDon === activeKey);
          toast("✔️ Cập nhật giỏ hàng thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // form.finish();
        },
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        ),
          })}}><DeleteFilled size={20}/></button>
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
    data = ctspHD.filter((f)=> f.hoaDon === activeKey),
    KH = client.filter((k) => k.activeKey === activeKey),
    lengthSP = ctspHD.filter((f)=> f.hoaDon === tab.key).reduce((accumulator, object) => parseFloat(accumulator) + parseFloat(object.soLuong), 0),
    console.log("Length",lengthSP),
    <TabPane tab={
    <>{<Space>
     {/* <span>{tab.ma}  <span style={{color:"red",
      backgroundColor:"yellow",borderRadius:30,marginLeft:10,}}>
        <Badge count={lengthSP} />
        </span></span> */}
        <span>{tab.ma}</span>
        <Badge count={lengthSP === 0 ? 0 : lengthSP}></Badge>
        </Space>}</>
    } key={tab.key}>
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
                Chọn khách hàng
              </Button>
              <ModalKhachHang 
              openKhachHang={openKhachHang} 
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
      {/* thông tin khách hàng */}
        <div className="mb-3">
          <>
         
          {
          (!tab.nguoiDung) ? (
            <span>
            <p>Tên khách hàng: <Tag color="#cccccc"  className="rounded-pill">Khách lẻ</Tag></p>
            <p>Số điện thoại: <Tag color="#cccccc"  className="rounded-pill">000-0000-000</Tag></p>
            </span>
          ) : (
            <span>
            <p>Tên khách hàng: <Tag bordered={false} color={tab.gtNguoiDung === "true" ?"processing" : "#FFB6C1"} className="rounded-pill">{tab.tenNguoiDung}</Tag></p>
            <p>Số điện thoại: <Tag bordered={false} color={tab.gtNguoiDung === "true" ?"processing" : "#FFB6C1"} className="rounded-pill">{client.filter((i) => i.id === tab.nguoiDung)[0].soDienThoai}</Tag></p>
            </span>
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
                  return accumulator + currentProduct.total},0)} 
                  hoaDon = {activeKey}/>
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
                <h6 className="mt-4">Điểm hiện tại: <>{(tab.nguoiDung !== null) ? tab.diemNguoiDung : 0}</></h6>
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
           (!tab.nguoiDung) ? (
            <span>
            <p>Tên khách hàng: <Tag color="#cccccc"  className="rounded-pill">Khách lẻ</Tag></p>
            <p>Số điện thoại: <Tag color="#cccccc"  className="rounded-pill">000-0000-000</Tag></p>
            </span>
          ) : (
            <span>
            <p>Tên khách hàng: <Tag bordered={false} color={tab.gtNguoiDung === "true" ?"processing" : "#FFB6C1"} className="rounded-pill">{tab.tenNguoiDung}</Tag></p>
            <p>Số điện thoại: <Tag bordered={false} color={tab.gtNguoiDung === "true" ?"processing" : "#FFB6C1"} className="rounded-pill">{client.filter((i) => i.id === tab.nguoiDung)[0].soDienThoai}</Tag></p>
            </span>
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
                <h6 className="mt-4">Điểm hiện tại: <>{(tab.nguoiDung !== null) ? `${tab.diemNguoiDung}` : 0}</></h6>
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
          <span>
          <p>Tên khách hàng: <Tag color="#cccccc" className="rounded-pill">Khách lẻ</Tag></p>
          <p>Số điện thoại: <Tag color="#cccccc" className="rounded-pill">000-0000-000</Tag></p>,
          </span>
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