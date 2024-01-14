import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Button, Card, Divider, Table, Carousel } from 'antd';
import { RxDashboard } from 'react-icons/rx';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

import axios from 'axios';
import { json } from 'react-router-dom';
import { ExportOutlined } from '@ant-design/icons';
import { RiBillFill, RiBillLine, RiMoneyDollarCircleFill, RiProductHuntFill } from 'react-icons/ri';
import { BiSolidHot } from 'react-icons/bi';
import { IoStatsChart } from 'react-icons/io5';
import { HiMiniShieldExclamation } from "react-icons/hi2";
import { FaArrowTrendUp } from 'react-icons/fa6';

export default function ThongKe() {
    useEffect(() => {
        loadThongKeTheoNgay();
        loadThongKeTheoThang();
        loadThongKeTheoNam();
    }, []);
    const [hoaDonTheoNgay, sethoaDonTheoNgay] = useState([]);
    const [tienTheoNgay, settienTheoNgay] = useState([]);
    const loadThongKeTheoNgay = async () => {

        await axios.get('http://localhost:8080/thong-ke/ngay')
            .then(response => {
                // Update the list of items
                sethoaDonTheoNgay(response.data.tongHoaDonThongKe);
                settienTheoNgay(response.data.tongTienThongKe);

            })
            .catch(error => console.error('Error adding item:', error));
    };
    const [hoaDonTheoThang, sethoaDonTheoThang] = useState([]);
    const [tienTheoThang, settienTheoThang] = useState([]);
    const loadThongKeTheoThang = async () => {

        await axios.get('http://localhost:8080/thong-ke/thang')
            .then(response => {
                // Update the list of items
                sethoaDonTheoThang(response.data.tongHoaDonThongKe);
                settienTheoThang(response.data.tongTienThongKe);

            })
            .catch(error => console.error('Error adding item:', error));
    };
    const [hoaDonTheoNam, sethoaDonTheoNam] = useState([]);
    const [tienTheoNam, settienTheoNam] = useState([]);
    const loadThongKeTheoNam = async () => {

        await axios.get('http://localhost:8080/thong-ke/thang')
            .then(response => {
                // Update the list of items
                sethoaDonTheoNam(response.data.tongHoaDonThongKe);
                settienTheoNam(response.data.tongTienThongKe);

            })
            .catch(error => console.error('Error adding item:', error));
    };

    const contentStyle = {
        height: '160px',
        color: 'black',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#d0aa73',
        borderRadius: '10px'
      };

    const data = [
        {
            type: 'Thành Công',
            value: 27,
        },
        {
            type: 'Vận Chuyển',
            value: 25,
        },
        {
            type: 'Hóa Đơn Chờ',
            value: 13,
        },
        {
            type: 'Trả Hàng',
            value: 5,
        },
        {
            type: 'Chờ Xác Nhận',
            value: 10,
        },
        {
            type: 'Xác Nhận',
            value: 5,
        },
        {
            type: 'Đã Hủy',
            value: 5,
        },
        {
            type: 'Chờ Vận Chuyển',
            value: 5,
        },
        {
            type: 'Đã Thanh Toán',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    // Biểu đồ đường
    const dataCot = [
        {
            name: 'Hóa Đơn',
            Month: 'Jan.',
            Quantity: 18,
        },
        {
            name: 'Hóa Đơn',
            Month: 'Feb.',
            Quantity: 28,
        },
        {
            name: 'Hóa Đơn',
            Month: 'Mar.',
            Quantity: 39,
        },
        {
            name: 'Hóa Đơn',
            Month: 'Apr.',
            Quantity: 81,
        },
        {
            name: 'Hóa Đơn',
            Month: 'May',
            Quantity: 47,
        },
        {
            name: 'Hóa Đơn',
            Month: 'Jun.',
            Quantity: 20,
        },
        {
            name: 'Hóa Đơn',
            Month: 'Jul.',
            Quantity: 24,
        },
        {
            name: 'Hóa Đơn',
            Month: 'Aug.',
            Quantity: 35,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Jan.',
            Quantity: 12,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Feb.',
            Quantity: 23,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Mar.',
            Quantity: 34,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Apr.',
            Quantity: 99,
        },
        {
            name: 'Sản Phẩm',
            Month: 'May',
            Quantity: 52,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Jun.',
            Quantity: 35,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Jul.',
            Quantity: 37,
        },
        {
            name: 'Sản Phẩm',
            Month: 'Aug.',
            Quantity: 42,
        },
    ];
    const configCot = {
        data: dataCot,
        isGroup: true,
        xField: 'Month',
        yField: 'Quantity',
        seriesField: 'name',
        label: {
            position: 'middle',
            layout: [
                {
                    type: 'interval-adjust-position',
                },
                {
                    type: 'interval-hide-overlap',
                },
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "id",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhanh",
        }, ,
        {
            title: "Tên sản phẩm",
            dataIndex: "ten",
        },
        {
            title: "Số lượng bán",
            dataIndex: "ma",
        },
        {
            title: "Tình trạng",
            dataIndex: "tinhtrang",
            key: "trangThai",
        }
    ]

    return (
        <div className='container-fluid'>
            <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <RxDashboard size={35} /> Quản lý thống kê</h4></Divider>
            {/* bảng thống kê */}
            <div class="row">

                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2 pr-2 ">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        <h5 style={{ color: '#8f562e' }}><RiMoneyDollarCircleFill size={35} style={{ marginBottom: 7 }} /> Doanh số hôm nay</h5></div>
                                    <div class="h6 mb-0 font-weight-bold text-gray-800">{hoaDonTheoNgay} đơn hàng / {tienTheoNgay} VND</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        <h5 style={{ color: '#8f562e' }}><RiMoneyDollarCircleFill size={35} style={{ marginBottom: 7 }} /> Doanh số theo tháng</h5>
                                    </div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h6 mb-0 mr-3 font-weight-bold text-gray-800">{hoaDonTheoThang} đơn hàng / {tienTheoThang} VND</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        <h5 style={{ color: '#8f562e' }}><RiMoneyDollarCircleFill size={35} style={{ marginBottom: 7 }} />  Doanh số theo năm</h5></div>
                                    <div class="h6 mb-0 font-weight-bold text-gray-800">{hoaDonTheoNam} đơn hàng / {tienTheoNam} VND</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-end'>
                <a className="btn btn-success me-2" role="button"> <ExportOutlined />  Export Excel </a>
                <a className="btn btn-outline-primary me-2" role="button"> Ngày </a>
                <a className="btn btn-outline-primary me-2" role="button"> Tuần </a>
                <a className="btn btn-outline-primary me-2" role="button"> Tháng </a>
                <a className="btn btn-outline-primary me-2" role="button"> Năm </a>
            </div>

            <div className='mt-4'>
                <Card title={<><h5 style={{ marginLeft: 530 }}> <IoStatsChart className='mb-2' /> Biểu Đồ Thống Kê Hóa Đơn và Sản Phẩm </h5></>} className='border-left-primary shadow h-100 py-2'>
                    <Column {...configCot}></Column>
                </Card>
            </div>

            <div className='row container-fluid mt-4'>
                <Card className='col-md-7 ms-5 border-left-primary shadow h-100 py-2'>
                    <h5 style={{ marginLeft: 310}}><BiSolidHot color='red' size={30} style={{ marginBottom: 7 }} /> Sản Phẩm Bán Chạy</h5>
                    <Table columns={columns} pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 5,
                        position: ['bottomCenter'],
                        defaultCurrent: 1,
                        total: 100,
                    }}></Table><br />
                    <h5 style={{ marginLeft: 310, marginTop: 20 }}><HiMiniShieldExclamation color='red' size={30} style={{ marginBottom: 7 }} /> Sản Phẩm Sắp Hết</h5>
                    <Table columns={columns} pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 5,
                        position: ['bottomCenter'],
                        defaultCurrent: 1,
                        total: 100,
                    }}></Table>
                </Card>
                <Card className='col-md-4 ms-4 border-left-primary shadow h-100 py-2'>
                    {/* biểu đồ tròn */}
                    <h5 style={{ marginLeft: 50 ,marginTop:12}}><RiBillLine size={30} style={{ marginBottom: 7 }} /> Tổng Hợp Đơn Trong Tháng</h5>
                    <Pie {...config} />
                    <h5 style={{ marginLeft: 40, marginTop: 30 }}><FaArrowTrendUp size={30} style={{ marginBottom: 7 }} /> Tốc Độ Tăng Trưởng Cửa Hàng</h5>
                    <Carousel style={{width: 450}} autoplay>
                        <div>
                            <h6 style={contentStyle}><RiMoneyDollarCircleFill size={25} style={{ marginBottom: 5 }} /> Doanh Thu Ngày :</h6>
                        </div>
                        <div>
                            <h6 style={contentStyle}><RiMoneyDollarCircleFill size={25} style={{ marginBottom: 5 }} /> Doanh Thu Tháng :</h6>
                        </div>
                        <div>
                            <h6 style={contentStyle}><RiMoneyDollarCircleFill size={25} style={{ marginBottom: 5 }} /> Doanh Thu Năm :</h6>
                        </div>
                        <div>
                            <h6 style={contentStyle}><RiProductHuntFill size={25} style={{ marginBottom: 5 }} /> Sản Phẩm Tháng :</h6>
                        </div>
                        <div>
                            <h6 style={contentStyle}><RiBillFill size={25} style={{ marginBottom: 5 }} /> Hóa Đơn Ngày :</h6>
                        </div>
                        <div>
                            <h6 style={contentStyle}><RiBillFill size={25} style={{ marginBottom: 5 }} /> Hóa Đơn Tháng :</h6>
                        </div>
                    </Carousel>
                </Card>
            </div>
        </div>
    )
}