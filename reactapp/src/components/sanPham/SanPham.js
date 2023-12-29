import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import { Link } from "react-router-dom";
import { InfoCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import {MdSearch} from 'react-icons/md';
import axios from 'axios';
import { BsBoxSeamFill, BsFillEyeFill } from 'react-icons/bs';
import { FaTshirt } from 'react-icons/fa';
export default function SanPham() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };


  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //Table
  const [sanPham, setSanPhams] = useState([]);

  useEffect(() => {
    loadSanPham();
  }, []);

  const loadSanPham = async () => {
    const result = await axios.get("http://localhost:8080/san-pham", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setSanPhams(result.data);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idSP",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, 
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
        title: "Số Lượng",
        dataIndex: "soLuong",
      },
      {
        title: "Trạng thái",
        dataIndex: "trangThai",
        key: "trangThai",
        render: (trang_thai) => (
          <>
            {trang_thai === 0 ? (
              <Tag color="red">
                Còn bán
              </Tag>
            ) : (
              <Tag color="green">
                Còn bán
              </Tag>
            )}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "idSP",

        render: (title) => (
          <Space size="middle">
             <a>
            <Link to={`/showct/${title}`} className='btn btn-danger'><BsFillEyeFill className='mb-1'/></Link>
          </a>
          </Space>
        ),
    },
  ]

  return (
    <div className='container-fluid' style={{ borderRadius: 20 }}>
      <div className="container-fluid">
      <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <FaTshirt size={35} /> Quản lý sản phẩm</h4></Divider>
      <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><FilterFilled size={30} /> Bộ lọc</h5>
          <hr />
          <Form className="row"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã">
                <Input className='rounded-pill border-warning' placeholder='Nhập tên hoặc mã' />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item label="Trạng Thái">
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="1">Còn Bán</Select.Option>
                  <Select.Option value="0">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className='text-center'>
              <Button type="primary" htmlType='reset'>Làm mới</Button>
            </Form.Item>
          </Form>
        </div>

         <div className='text-end'>
          <a className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill" role="button" href='/them-san-pham'> <PlusCircleOutlined />  Thêm sản phẩm </a>
        </div>
        <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><BookFilled size={30} /> Danh sách sản phẩm</h5>
          <hr />
          <div className="ms-3">
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={sanPham} columns={columns} pagination={{
                showQuickJumper: true,
                defaultPageSize: 5,
                position: ['bottomCenter'],
                defaultCurrent: 1,
                total: 100,
              }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}