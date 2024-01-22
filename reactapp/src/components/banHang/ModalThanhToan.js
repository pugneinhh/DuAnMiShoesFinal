import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddPayDetail, GetPayDetail, RemovePayDetail } from "./reducer/PayDetail.reducer";
import { dispatch } from "../api/store";
import { AddPay, GetPay } from "./reducer/Pay.reducer";
import { SoundTwoTone } from "@ant-design/icons";
import { GetBill, GetBillByKey, RemoveBill } from "./reducer/Bill.reducer";
import { GetInvoice, GetInvoiceByHoaDon, RemoveInvoice, RemoveInvoiceByHoaDon } from "./reducer/DetailInvoice.reducer";

const ModalThanhToan = (props) => {
    const { openThanhToan, setOpenThanhToan } = props;
    const total = props.total;
    const hoaDon = props.hoaDon;
    const hoaDons = useSelector(GetBill);
    const ctspHD =  useSelector(GetInvoice);
    const dispatch=useDispatch();
    const payDetail = useSelector(GetPayDetail);
    const pay = useSelector(GetPay);
    console.log("Hóa Đơn", hoaDon);
    console.log(payDetail);
    const data = payDetail.filter((item)=> item.hoaDon === hoaDon);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenThanhToan(false);
        console.log("đóng")
    };
    const [tongThanhToan,setTongThanhToan] = useState(0);
    const [tienCK,setTienCK] = useState(0);

    const handleXoa = (record) => {
        console.log(record);
        dispatch(RemovePayDetail({hoaDon:hoaDon,phuongThuc:record.phuongThuc}))
        setTongThanhToan (parseFloat(tongThanhToan) - parseFloat(record.soTien));
    }

    const handleTienMat = () => {
        dispatch(AddPayDetail({hoaDon: hoaDon,phuongThuc:0,soTien:money}));
        dispatch(AddPay({hoaDon: hoaDon,phuongThuc:0,tienMat:money}));
        setTongThanhToan (parseFloat(tongThanhToan) + parseFloat(money));
        setMoney(0);
    }

    const handleChuyenKhoan = () => {
        linkVNP();
        dispatch(AddPayDetail({hoaDon: hoaDon,phuongThuc : 1,soTien: money}));
        setTongThanhToan(parseFloat(tongThanhToan) + parseFloat(money));

        setTienCK(money);
        setMoney(0);
        
        // navigate(linkVNP().data.url);
       // return UrlCK;
    }

    const handleThanhToan = () => {
        if (parseFloat(total) <= parseFloat(!tongThanhToan ? 0 : tongThanhToan)){

        // Tạo hóa đơn và hóa đơn chi tiết
        const dataHoaDon = hoaDons.filter((item) => item.id === hoaDon);
        console.log(dataHoaDon[0]);
        // Hóa đơn 
        const addHD = async() => {
          const dataAdd =  await axios.post(`http://localhost:8080/ban-hang/add-hoa-don`,dataHoaDon[0]);
        // Chi tiết hóa đơn
          const ctsp = ctspHD.filter((f)=> f.hoaDon === hoaDon);
          Promise.all(ctsp.map(value => 
            axios.post(`http://localhost:8080/ban-hang/addHDCT`,value)));
        }
        addHD();
        // axios.post(`http://localhost:8080/ban-hang/thanh-toan`,dataHoaDon[0]);
        toast("Thanh toán thành công!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Xóa dữ liệu lưu trong reducer

          dispatch(RemoveInvoiceByHoaDon({hoaDon:hoaDon}))
          dispatch(RemoveBill({key:hoaDon}));
        setOpenThanhToan(false);
    } else {
        toast("Chưa đủ điều kiện thanh toán!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
    }


    const linkVNP =  () => {
           axios.get(`http://localhost:8080/vnppayment/chuyen-khoan/${hoaDon}/${money}`).then((res) => {
              dispatch(AddPay({hoaDon: hoaDon,phuongThuc:1,chuyenKhoan:money,phuongThucVNP:res.data.url}));
              window.open(res.data.url, '_blank');
          });
          
         
    };
    
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (stt, record, index) => { ++index; return index },
            showSortTooltip: false,

        },
        // {
        //     title: 'Mã giao dịch',
        //     dataIndex: 'trangThai',
        //     key: 'trangThai',
        // },
        {
            title: 'Số tiền',
            dataIndex: 'soTien',
            key: 'soTien',
            render:(text,record) => {
                return(
                    <>
                    {
                         <span>{`${Intl.NumberFormat("en-US").format(record.soTien)} VNĐ`}</span>
                    }
                    </>
                )
            }
        },
        {
            title: 'Phương thức',
            dataIndex: 'phuongThuc',
            key: 'phuongThuc',
            render: (phuongThuc) => (
                <>
                {
                    phuongThuc === 0 ? "Tiền mặt" : "Chuyển khoản"
                }
                </>
            )

        },
        {
            title: 'Hành động',
           // dataIndex: 'motaHoatDong',
            render:(record)=>(
                <Space size="middle">
                <button className="btn btn-warning" onClick={() => handleXoa(record)}>
                    Xóa
                </button>
                </Space>
            ),
            center: "true",
        },

    ];
    const [money,setMoney] = useState(0);
    const hanldeMoneyChange = (event) => {
        const value = event.target.value;
        console.log(value);
        setMoney(value);
    }
    return (
        <Modal
            title="Thanh toán"
            centered
            open={openThanhToan}
            onOk={handleThanhToan}
            onCancel={handleClose}

            width={800}
        >
            <div className="row mt-4">
                <h6 className="col-md-2 mt-2 fw-bold">Số tiền</h6>
                <input className="col-md-9" type="number" value={money} onChange={hanldeMoneyChange}></input>
            </div>
            <div className="row mt-5 fw-bold ">
                <Button className="col-md-6 rounded-pill" type="primary" onClick={handleTienMat}> Tiền mặt</Button>

                <Link 
               // to={linkVNP()} 
                //target="_blank"
                className="col-md-6 rounded-pill btn btn-primary" type="primary" onClick={handleChuyenKhoan}
                > Chuyển khoản</Link>
            </div>
            <div className="row mt-3">
                <h6 className="col-md-3 fw-bold ">Tiền cần thanh toán</h6>
                <div className="col-md-5"></div>
                <h6 className="col-md-4 text-end text-danger fw-bold" style={{ paddingRight: '25px' }}> {`${Intl.NumberFormat("en-US").format(parseFloat(total) - parseFloat(tongThanhToan))} VNĐ`}</h6>
            </div>
            <Table  columns={columns} 
            dataSource={data} 
            style={{ marginTop: '10px' }} pagination={{}} />

            <div className="row mt-3">
                <h6 className="col-md-3 mt-2 fw-bold">Khách thanh toán</h6>
                <div className="col-md-5"></div>
                <h6 className="col-md-4 mt-2 text-end text-danger fw-bold" style={{paddingRight:'25px'}}>{`${Intl.NumberFormat("en-US").format(money)} VNĐ`}</h6>
            </div>
            <div className="row mt-1">
                <h6 className="col-md-3 mt-2 fw-bold">Tiền thiếu</h6>
                <div className="col-md-5"></div>
                <h6 className="col-md-4 mt-2 text-end text-primary fw-bold" style={{ paddingRight: '25px' }}> {((!money ? 0 : money) < (parseFloat(total)-parseFloat(tongThanhToan)) ) ? (`${Intl.NumberFormat("en-US").format(parseFloat(total) - parseFloat(!money ? 0 : money ) - parseFloat(tongThanhToan))} VNĐ`) :  ' 0 VNĐ'}</h6>
            </div>
            <div className="row mt-1">
                <h6 className="col-md-3 mt-2 fw-bold">Tiền thừa</h6>
                <div className="col-md-5"></div>
                <h6 className="col-md-4 mt-2 text-end text-primary fw-bold" style={{ paddingRight: '25px' }}> {(total < (parseFloat(tongThanhToan)+parseFloat(!money ? 0 : money))) ? (`${Intl.NumberFormat("en-US").format(parseFloat(money)+parseFloat(tongThanhToan)-parseFloat(total))} VNĐ`) :  ' 0 VNĐ'}</h6>
            </div>
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
        </Modal>
        
    )
    
}
export default ModalThanhToan;