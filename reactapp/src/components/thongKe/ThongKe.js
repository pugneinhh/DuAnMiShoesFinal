import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Card, Divider, Table } from 'antd';
import { RxDashboard } from 'react-icons/rx';
import { Line } from '@ant-design/plots';

import axios from 'axios';
import { json } from 'react-router-dom';
import { FireOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { BiSolidHot } from 'react-icons/bi';
import { FaChartLine, FaChartPie } from 'react-icons/fa';

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



    const data = [
        {
            type: 'Nike',
            value: 27,
        },
        {
            type: 'Adidas',
            value: 25,
        },
        {
            type: 'Rebook',
            value: 18,
        },
        {
            type: 'Puma',
            value: 15,
        },
        {
            type: 'Vans',
            value: 10,
        },
        {
            type: 'Converse',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: '<h5>Số lượng bán</h5>',
          },
        },
    };

    // Biểu đồ đường
    const dataDuong = [
        {
            "Date": "2010-01",
            "scales": 1998
        },
        {
            "Date": "2010-02",
            "scales": 1850
        },
        {
            "Date": "2010-03",
            "scales": 1720
        },
        {
            "Date": "2010-04",
            "scales": 1818
        },
        {
            "Date": "2010-05",
            "scales": 1920
        },
        {
            "Date": "2010-06",
            "scales": 1802
        },
        {
            "Date": "2010-07",
            "scales": 1945
        },
        {
            "Date": "2010-08",
            "scales": 1856
        },
        {
            "Date": "2010-09",
            "scales": 2107
        },
        {
            "Date": "2010-10",
            "scales": 2140
        },
    ];

    const configDuong = {
        data: dataDuong,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
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
                                        <h5 style={{ color: '#8f562e' }}><RiMoneyDollarCircleFill size={35} style={{marginBottom : 7}}/> Doanh số hôm nay</h5></div>
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
                                        <h5 style={{ color: '#8f562e' }}><RiMoneyDollarCircleFill size={35} style={{marginBottom : 7}}/> Doanh số theo tháng</h5>
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
                                        <h5 style={{ color: '#8f562e' }}><RiMoneyDollarCircleFill size={35} style={{marginBottom : 7}}/>  Doanh số theo năm</h5></div>
                                    <div class="h6 mb-0 font-weight-bold text-gray-800">{hoaDonTheoNam} đơn hàng / {tienTheoNam} VND</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                {/* biểu đồ tròn */}
                <Card title={<><h5><FaChartPie size={30}/> Biểu đồ tròn</h5></>} className='col-md-4 ms-4 border-left-primary shadow h-100 py-2'>
                    <Pie {...config} />

                </Card>
                <Card title={<><h5><FaChartLine size={30}/> Biểu đồ đường</h5></>} className='col-md-7 ms-5 border-left-primary shadow h-100 py-2'>
                    <Line {...configDuong} />

                </Card>
            </div>

             <div className='mt-4'>
             <Card title={<><h5><BiSolidHot color='red' size={30}/> Sản Phẩm Bán Chạy</h5></>} className='border-left-primary shadow h-100 py-2'>
                <Table columns={columns}></Table>
                </Card>           
             </div>
        </div>
    )
}