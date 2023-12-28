import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Space,
  Table,
  Tag,
} from 'antd';
import { InfoCircleFilled } from "@ant-design/icons";
import { UndoOutlined } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import axios from 'axios';
export default function CTSP() {
  //Mở detail ctsp
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
  //Load kich thước
  const { Option } = Select;
  const FormItem = Form.Item;
  //Table
  const [cTSP, setCTSPs] = useState([]);

  useEffect(() => {
    loadCTSP();
  }, []);
  const { uuid } = useParams();
  const loadCTSP = async () => {
    const result = await axios.get(`http://localhost:8080/ctsp/showct/${uuid}`, {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setCTSPs(result.data);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Kích Thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu Sắc",
      dataIndex: "tenMS",
    },
    {
      title: "Chất Liệu",
      dataIndex: "tenCL",
    },
    {
      title: "Độ Cao",
      dataIndex: "tenDC",
    },
    {
      title: "Danh Mục",
      dataIndex: "tenDM",
    },
    {
      title: "Hãng",
      dataIndex: "tenH",
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
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

      render: () => (
        <Space size="middle">
          <a>
            <Button type="primary" shape='round' className='bg-success text-white' icon={<EyeOutlined />} onClick={showModal} />
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}>
              <div className='text-center mb-3'>
                <h3>Chi Tiết Sản Phẩm</h3>
              </div>
              <div className='row'>
                <div className='container text-center'>
                  <Button className='bg-primary text-light rounded-pill border'>Hủy</Button>,
                  <Button className='bg-warning text-dark rounded-pill border'><GrUpdate className='me-1' />Cập Nhật</Button>
                </div>
              </div>
            </Modal>
          </a>
        </Space>
      ),
    },
  ]

  return (
    <div className='container-fluid' style={{ borderRadius: 20 }}>
      <div className="container-fluid">
      <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <InfoCircleFilled size={35} /> Quản lý chi tiết sản phẩm</h4></Divider>
      <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><FilterFilled size={30} /> Bộ lọc</h5>
          <hr />
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
          >

            {/* Form tìm kiếm */}
            <div className='row'>
              <div className="col-md-3">
                <Form.Item label="Tên & Mã">
                  <Input className="rounded-pill border" />
                </Form.Item>
              </div>
              <div className='col-md-3'>
                <Form.Item label="Kích Thước">
                <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                    <Select.Option value="1">Còn Bán</Select.Option>
                    <Select.Option value="0">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='col-md-3'>
                <Form.Item label="Màu Sắc">
                  <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                    <Select.Option value="1">Còn Bán</Select.Option>
                    <Select.Option value="0">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='col-md-3'>
                <Form.Item label="Chất Liệu">
                  <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                    <Select.Option value="1">Còn Bán</Select.Option>
                    <Select.Option value="0">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3'>
                <Form.Item label="Độ Cao">
                  <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                    <Select.Option value="1">Còn Bán</Select.Option>
                    <Select.Option value="0">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='col-md-3'>
                <Form.Item label="Danh Mục">
                  <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                    <Select.Option value="1">Còn Bán</Select.Option>
                    <Select.Option value="0">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='col-md-3'>
                <Form.Item label="Hãng">
                  <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                    <Select.Option value="1">Còn Bán</Select.Option>
                    <Select.Option value="0">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='col-md-3'>
                <Form.Item label="Số Lượng">
                  <Slider
                    min={100000}
                    max={90000000}
                  />
                </Form.Item>
              </div>
            </div>
            {/* Hết form tìm kiếm */}


            <div className='container-fluid'>
            <Form.Item className='text-center'>
              <Button type="primary" htmlType='reset'>Làm mới</Button>
            </Form.Item>
            </div>
           
          </Form>
        </div>
        <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><BookFilled size={30} /> Danh sách chi tiết sản phẩm</h5>
          <hr />
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={cTSP} columns={columns} pagination={{
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