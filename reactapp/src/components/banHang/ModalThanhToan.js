import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Switch, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetPayDetail } from "./reducer/PayDetail.reducer";

const ModalThanhToan = (props) => {
    const { openThanhToan, setOpenThanhToan } = props;
    const total = props.total;
    const hoaDon = props.hoaDon;
    console.log(hoaDon);
    const payDetail = useSelector(GetPayDetail);
    const data = payDetail.filter((item)=> item.hoaDon === hoaDon);

    const handleClose = () => {
        setOpenThanhToan(false);
        console.log("đóng")
    };
    const [UrlCK, setUrlCK] = useState([])
    useEffect(() => {
        linkVNP();

    }, []);
    const linkVNP = async () => {
        await axios.get(`http://localhost:8080/vnppayment/chuyen-khoan/${total}`)
                .then(response => {
                    // Update the list of items
                    setUrlCK(response.data.url);
                    
                })
                .catch(error => console.error('Error adding item:', error));


    };
    console.log("link",UrlCK);
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
        },
        {
            title: 'Phương thức',
            dataIndex: 'phuongThuc',
            key: 'phuongThuc',

        },
        {
            title: 'Hành động',
            dataIndex: 'motaHoatDong',
            center: "true",
        },

    ];
    const [money,setMoney] = useState('0');
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
            onOk={handleClose}
            onCancel={handleClose}

            width={800}
        >
            <div className="row mt-4">
                <h6 className="col-md-2 mt-2 fw-bold">Số tiền</h6>
                <input className="col-md-9" type="number" value={money} onChange={hanldeMoneyChange}></input>
            </div>
            <div className="row mt-5 fw-bold ">
                <Button className="col-md-6 rounded-pill" type="primary">Tiền mặt</Button>
                <Link to={`${UrlCK}`} className="col-md-6 rounded-pill btn btn-primary" type="primary"> Chuyển khoản</Link>
            </div>
            <div className="row mt-3">
                <h6 className="col-md-3 fw-bold ">Tiền cần thanh toán</h6>
                <div className="col-md-5"></div>
                <h6 className="col-md-4 text-end text-danger fw-bold" style={{ paddingRight: '25px' }}> {`${Intl.NumberFormat("en-US").format(total)} VNĐ`}</h6>
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
                <h6 className="col-md-4 mt-2 text-end text-primary fw-bold" style={{ paddingRight: '25px' }}> {(money < total ) ? (`${Intl.NumberFormat("en-US").format(total - money)} VNĐ`) :  ' 0 VNĐ'}</h6>
            </div>
            <div className="row mt-1">
                <h6 className="col-md-3 mt-2 fw-bold">Tiền thừa</h6>
                <div className="col-md-5"></div>
                <h6 className="col-md-4 mt-2 text-end text-primary fw-bold" style={{ paddingRight: '25px' }}> {(money > total ) ? (`${Intl.NumberFormat("en-US").format(money-total)} VNĐ`) :  ' 0 VNĐ'}</h6>
            </div>
        </Modal>
    )
}
export default ModalThanhToan;