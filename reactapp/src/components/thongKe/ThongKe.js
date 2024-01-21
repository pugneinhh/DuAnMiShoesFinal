import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Button, Card, Divider, Table, Carousel } from 'antd';
import { RxDashboard } from 'react-icons/rx';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { Image } from "cloudinary-react";
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
        loadBieuDoThang();
        loadTrangThaiHoaDon();
        loadSPBanChay();
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
    //biểu đồ đường
    const [chartData, setChartData] = useState([]);
    const loadBieuDoThang = async () => {

        await axios.get('http://localhost:8080/thong-ke/bieu-do-thang')
            .then(response => {
                // Update the list of items
                
                const bieudo=response.data.flatMap(item => {
                    return [
                      { ten: 'Hóa Đơn', ngay: item.ngay, soLuong: item.tongHoaDon },
                      { ten: 'Sản Phẩm', ngay: item.ngay, soLuong: item.tongSanPham }
                    ];
                  });
                  
                  setChartData(bieudo)
            })
            .catch(error => console.error('Error adding item:', error));
    };
    ///trạng thái hóa đơn
    const [trangThaiData, setTrangThaiData] = useState([]);
    const loadTrangThaiHoaDon = async () => {
        await axios.get('http://localhost:8080/thong-ke/trang-thai-hoa-don')
            .then(response => {
                // Update the list of items
                const totalHoaDon = response.data.reduce((total, item) => total + item.soLuong, 0);

                const trangThaiHD=response.data.flatMap(item => {
                    return [
                      { type: item.trangThai==0?"Chờ xác nhận":item.trangThai==1?"Xác nhận":item.trangThai==2?"Chờ vận chuyển":item.trangThai==3?"Đang vận chuyển":
                      item.trangThai==4?"Đã thanh toán":"Thành công", value: (item.soLuong/totalHoaDon)*100 },
                    ];
                  });
                  
                  setTrangThaiData(trangThaiHD);
                 
            })
            .catch(error => console.error('Error adding item:', error));
    };
    ///sản phẩm bán chạy
    const [SPBanChay, setSPBanChay] = useState([]);
    const loadSPBanChay = async () => {

        await axios.get('http://localhost:8080/thong-ke/san-pham-ban-chay')
            .then(response => {
                // Update the list of items
                console.log("spbc",response.data)
                  
                  setSPBanChay(response.data)
            })
            .catch(error => console.error('Error adding item:', error));
    };


    const contentStyle = {
        height: '160px',
        color: 'black',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#d0aa73',
        marginTop: '10px',
      };

    
    const config = {
        appendPadding: 10,
        data: trangThaiData.length > 0 ? trangThaiData : [{ type: 'Default', value: 1 }],
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
    
    const configCot = {
        data: chartData,
        isGroup: true,
        xField: 'ngay',
        yField: 'soLuong',
        seriesField: 'ten',
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
            key: "idSP",
            render: (idSP,record,index) => {++index; return index},
            showSortTooltip:false,
        },
        {
            title: "Hình ảnh",
            dataIndex: "linkAnh",
            render: (link) => {
                return (
                  <>
                    <Image
                      cloudName="dtetgawxc"
                      publicId={link}
                      width="100"
                      crop="scale"
                      href={link}
                    />
                  </>
                );
              },
        }, ,
        {
            title: "Tên sản phẩm",
            dataIndex: "ten",
            center: "true",
            render: (text, record) => (
              <span>{`${record.tenSp} [${record.mauSac}-${record.kichThuoc}]`}</span>
            ),
        },
        {
            title: "Gía bán",
            dataIndex: "giaBan",
        },
        {
            title: "Số lượng bán",
            dataIndex: "soLuong",
        },
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
                <Card title={<><h5 style={{ marginLeft: 350 }}> <IoStatsChart className='mb-2' /> Biểu Đồ Thống Kê Hóa Đơn và Sản Phẩm </h5></>} className='border-left-primary shadow h-100 py-2'>
                    <Column {...configCot}></Column>
                </Card>
            </div>

            <div className='row mt-4'>
                <Card style={{ marginLeft: 13,width:790}}  className='col-md-7 border-left-primary shadow h-100 py-2'>
                    <h5 style={{ marginLeft: 240,marginTop: 5}}><BiSolidHot color='red' size={30} style={{ marginBottom: 10}} /> Sản Phẩm Bán Chạy</h5>
                    <Table 
                    className='border rounded shadow'
                    dataSource={SPBanChay}
                    columns={columns} pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 5,
                        position: ['bottomCenter'],
                        defaultCurrent: 1,
                        total: 100,
                    }}></Table><br />
                    <h5 style={{ marginLeft: 240,marginTop: 7}}><HiMiniShieldExclamation color='red' size={30} style={{ marginBottom: 7 }} /> Sản Phẩm Sắp Hết</h5>
                    <Table className='border rounded shadow' columns={columns} pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 5,
                        position: ['bottomCenter'],
                        defaultCurrent: 1,
                        total: 100,
                    }}></Table>
                </Card>
                <Card style={{ marginLeft: 10}} className='col-md-4 border-left-primary shadow h-100 py-2'>
                    {/* biểu đồ tròn */}
                    <h6 style={{marginLeft: 20,marginTop:12}}><RiBillLine size={30} style={{ marginBottom: 7 }} /> Tổng Hợp Đơn Trong Tháng</h6>
                    <div className='border rounded shadow'>
                     <Pie {...config} />    
                    </div>
                    <h6 style={{marginTop:14}}><FaArrowTrendUp size={30} style={{ marginBottom: 7 }} /> Tốc Độ Tăng Trưởng Cửa Hàng</h6>
                    <div className='border rounded shadow'>
                    <Carousel style={{width: 331}} autoplay autoplaySpeed={1000}>
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
                </div>
                </Card>
            </div>
        </div>
    )
}