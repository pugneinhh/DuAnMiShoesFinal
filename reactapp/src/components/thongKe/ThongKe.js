import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Divider } from 'antd';
import { RxDashboard } from 'react-icons/rx';
import { Line } from '@ant-design/plots';

import axios from 'axios';

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
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
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
    const [dataDuong, setDataDuong] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const configDuong = {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        tickCount: 5,
      },
    };

    return(
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
                                        <h5 style={{ color: '#8f562e' }}>Doanh số hôm nay</h5></div>
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
                                        <h5 style={{ color: '#8f562e' }}>Doanh số theo tháng</h5>
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
                                        <h5 style={{ color: '#8f562e' }}> Doanh số theo năm</h5></div>
                                    <div class="h6 mb-0 font-weight-bold text-gray-800">{hoaDonTheoNam} đơn hàng / {tienTheoNam} VND</div>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* biểu đồ tròn */}
            <div className='col-md-4'>
                <Pie {...config} />

            </div>
            <div className='col-md-4'>
                <Line {...configDuong} />

            </div>
        </div>
    )
}