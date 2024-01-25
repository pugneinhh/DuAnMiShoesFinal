import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space, 
   Table,
   Tag,
} from 'antd';
import {
  EyeOutlined,

} from "@ant-design/icons";
import {FilterFilled , UnorderedListOutlined}  from "@ant-design/icons";
import {BsPencilSquare} from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import {PlusCircleOutlined} from '@ant-design/icons';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from '@testing-library/react';
import { FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { VoucherAPI } from '../api/voucher/voucher.api';

const Voucher = ()=>{
    // const [dataSearch,setDataSearch]=useState({
    //   tenVoucher:"",
    //   trangThaiVoucher:"",
    //   loaiVoucher:"",
    //   phuongThucVoucher:"",
    //   ngayBDVoucher:"",
    //   ngayKTVoucher:"",
    // });
     const [dataSearch,setDataSearch]=useState({});
     const[voucher,setVouchers]=useState([])

    const onChangeFilter=(changedValues, allValues)=>{
      setDataSearch(allValues);
      
      timKiemVoucher(allValues);
    }
    //call api tìm kiếm
    const timKiemVoucher=(dataSearch)=>{
      console.log("voucher tim",dataSearch);
      VoucherAPI.search(dataSearch)
      .then(response => {
            setVouchers(response.data);
      })
      .catch(error => console.error('Error adding item:', error));
    }
    const loadVoucher=async()=>{
       
      VoucherAPI.getAll()
      .then(response => {
        // Update the list of items
        setVouchers(response.data);
    })
    .catch(error => console.error('Error adding item:', error));
  
    
  };

  useEffect(()=>{
    loadVoucher();
  },[]);
    useEffect(() => {
      const handleUpdateStatus = (status) => {
        const currentTime = new Date();
        if (!dataSearch.tenVoucher  && !dataSearch.trangThaiVoucher && !dataSearch.ngayKTVoucher && !dataSearch.ngayBDVoucher && !dataSearch.loaiVoucher){
        voucher.forEach( x => {
         (currentTime > new Date(x.ngayBatDau) && currentTime < new Date(x.ngayKetThuc)) ?
          VoucherAPI.updateTTHD(x.id,x)
         : ( currentTime > new Date(x.ngayKetThuc))
          ?
          VoucherAPI.updateTTNgung(x.id,x)
          // : (currentTime < new Date(x.ngayBatDau)) ?
          // axios.put(`http://localhost:8080/voucher/updateTTSap/${x.id}`, x)
          : console.log('Không có dữ liệu update');      
        });
       
        loadVoucher();
          }
    }
      const time = setInterval(handleUpdateStatus , 10000)
      return () => {
        clearInterval(time);
      }
    
    },[voucher]);


    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

  
    const [form] = Form.useForm();
 
    ///call api

    const [myVoucher,setMyVoucher]=useState({});

    
     //tìm kiếm
    
  

    //loadvoucher

    //của table
    //table


const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
    render: (id,record,index) => {++index; return index},
    showSortTooltip:false,
},
  {
    title: 'Mã Voucher',
    dataIndex: 'ma',
    sorter: (a, b) => a.ma - b.ma,
  },
  {
    title: 'Tên Voucher',
    dataIndex: 'ten',
    sorter: (a, b) => a.ma - b.ma,
  },
  {

    title: 'Loại Voucher',
    dataIndex: 'loaiVoucher',

  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'ngayBatDau',
    render: (ngayBatDau) => (
      <>{moment(ngayBatDau).format("DD/MM/YYYY")}</>
  ),
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'ngayKetThuc',
    render: (ngayKetThuc) => (
      <>{moment(ngayKetThuc).format("DD/MM/YYYY")}</>
  ),
    sorter: (a, b) => a.ngayKetThuc - b.ngayKetThuc,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    key: 'trangThai',
            render: (trangThai) => (
                <>
                    {
                        (trangThai === 'SAP_DIEN_RA') ?
                            (
                                <Tag color="yellow">
                                  Sắp hoạt động
                                </Tag>

                            )  : (trangThai==='DANG_HOAT_DONG')?(
                            <Tag color="green">
                            Hoạt động
                            </Tag>):(

                            
                                    <Tag color="red">
                                        Ngừng hoạt động
                                    </Tag>
                            )
                              
                    }
               </>),
  //   filters: [
  //     {
  //         text: 'Hoạt động',
  //         value: '0',
  //     },
  //     {
  //         text: 'Ngừng hoạt động',
  //         value: '1',
  //     },

  // ],
  // onFilter: (value, record) => record.trangThai.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: (record) => (
      
      <Space size="middle">
        
        <a>
        <Link
              to={`/admin-detail-voucher/${record.id}`}
              className="btn"
            >
              <EyeOutlined
                style={{
                  fontSize: 30,
                  backgroundColor: "#ffff00",
                  
                }}
              />
            </Link>
          
        </a>
        <a>
            <Link
              to={`/admin-update-voucher/${record.id}`}
              className="btn"
            >
              <BsPencilSquare
                style={{
                  fontSize: 30,
                  backgroundColor: "#ffff00",
                  
                }}
              />
            </Link>
          </a>
        
      </Space>
      
  
    ),
    center:'true',
  },
];

  
  
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [bordered] = useState(false);
    const [size] = useState('large');
    const [expandable] = useState(undefined);
    const [showHeader] = useState(true);
    const [hasData] = useState(true);
    const [tableLayout] = useState();
    const [top] = useState('none');
    const [bottom] = useState('bottomCenter');
    const [ellipsis] = useState(false);
    const [yScroll] = useState(false);
    const [xScroll] = useState();
    
    const scroll = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }
    const tableColumns = columns.map((item) => ({
      ...item,
      ellipsis,
    }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    const tableProps = {
      bordered,
      size,
      expandable,
      showHeader,
      scroll,
      tableLayout,
    };

    //khai  báo form update
    // const editVoucher=(row)=>{
    //   setMyVoucher(row);
    //   setID(row.id);
    //   setOpenUpdate(true);
     
    // }
    const resetMyVoucher=()=>{
      // setID('');
      setMyVoucher({});
    }
    //mở form detail
    
    

    ///validate ngày 
    const validateDateKT = (_, value) => {
      const { getFieldValue } = form;
      const startDate = getFieldValue('ngayBatDau');
      if (startDate && value &&value.isBefore(startDate)) {
        return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
      }
      return Promise.resolve();
    };
    const [checkNgay,setCheckNgay]=useState(false);

    const validateDateBD = (_, value) => {
      const newDate = new Date();
      // if(startDate && value && value.isAfter(moment)){
      //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
      // }
      const { getFieldValue } = form;
      const endDate = getFieldValue('ngayKetThuc');
      if(endDate && value && value.isAfter(endDate)){
        return Promise.reject('Ngày bắt đầu phải trước ngày kết thúc');
      }
      if ( value && value<newDate) {
        return Promise.reject('Ngày bắt phải sau ngày hiện tại');
      }
      return Promise.resolve();
    };
    //hiển thị số lượng
    const [gioiHan,setGioiHan]=useState(false);
    const handleChangeSwitch=(value)=>{
      setGioiHan(value);
    };
    
    return (

        <div className="container" style={{borderRadius:20}}>
      
      
         <div className="container-fluid">
         <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <FaTag size={20} />Quản lý phiếu giảm giá</h4></Divider>
         {/* form tìm kiếm */}
            <div className=' bg-light m-2 p-3 pt-2' style={{border: '1px solid #ddd', // Border color
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
    borderRadius: '8px'}}>
            <h5 className='text-start'><FilterFilled size={30}/> Bộ lọc</h5>
            <hr/>
            <Form className="row col-md-12"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 14,
              }}
              layout="horizontal"
              initialValues={{
                  size: componentSize,
              }}
              onValuesChange={onChangeFilter}
              size={componentSize}
              style={{
                  maxWidth: 1400,

              }}
              form={form}
          >
              <div className="col-md-4">
                  <Form.Item label="Tìm kiếm" name='tenVoucher'>
                      <Input className='rounded-pill border-warning' placeholder='Nhập mã hoặc tên hoặc mức độ giảm giá'/>
                  </Form.Item>
                  <Form.Item label="Loại voucher" name='loaiVoucher'>
                  <Select defaultValue={'Tiền mặt'} style={{borderColor:'yellow'}}  >
                      <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                      <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                  </Select>
                  </Form.Item> 
              </div>

              <div className='col-md-4'>
            
                  <Form.Item label="Trạng thái" name='trangThaiVoucher' >
                  <Select defaultValue={'Tất cả'} style={{borderColor:'yellow'}}>
                      <Select.Option value="SAP_DIEN_RA">Sắp diễn ra</Select.Option>
                      <Select.Option value="DANG_HOAT_DONG">Hoạt động</Select.Option>
                      <Select.Option value="NGUNG_HOAT_DONG">Ngừng hoạt động</Select.Option>
                  </Select>
                  </Form.Item> 
                 
                  </div>
                  <div className='col-md-4'>
                  <Form.Item label="Ngày bắt đầu" name='ngayBDVoucher' >
                      <DatePicker className='rounded-pill border-warning' placeholder='Ngày bắt đầu' style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Ngày kết thúc" name='ngayKTVoucher'>
                      <DatePicker className='rounded-pill border-warning' placeholder='Ngày kết thúc' style={{ width: '100%' }} />
                  </Form.Item>
              </div>
           
              <Form.Item className='text-end '>
                      <Button type="primary" htmlType='reset' onClick={loadVoucher}>Làm mới</Button>
                  </Form.Item>
          </Form>
      
    
           
    </div>
    {/* hết form tìm kiếm */}
     {/* view add voucher */}
     <div className=' text-end mt-3'>
             
     <Link to='/admin-add-voucher' className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill"> <PlusCircleOutlined /> Thêm </Link>
        
            
               
             
   
         
         </div>
      {/* view table voucher */}
      <div style={{border: '1px solid #ddd', // Border color
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
    borderRadius: '8px',padding:'10px'}}>
         <div className="text-start fw-bold">
            <p><UnorderedListOutlined size={30}/> Danh sách phiếu giảm giá </p>
          </div>
     <>
      <Table
        {...tableProps}
        pagination={{
          showQuickJumper: true,
          position: [top, bottom],
          defaultPageSize:5,
          defaultCurrent: 1,
          total: 100,
        }}
        columns={tableColumns}
        dataSource={hasData ? voucher : []}
        scroll={scroll}
        
      />
    </>
    </div>
    {/* hết table voucher */}
  
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
 </div>
     
     ////VIEW UPDATE VOUCHER
     
    );
}
export default Voucher;