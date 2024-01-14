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
  Modal
} from 'antd';
import { InfoCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';
import { BsFillEyeFill } from 'react-icons/bs';
import { PiTrademarkFill } from 'react-icons/pi';

export default function Hang() {
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
  const [form] = Form.useForm();
  //Ấn Add
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [bordered] = useState(false);
  const addHang = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/hang/add', value)
      .then(response => {
        console.log(response.data);
        toast('✔️ Thêm thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadHang();
        form.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Table
  const [hang, setHangs] = useState([]);

  useEffect(() => {
    loadHang();
  }, []);

  const loadHang = async () => {
    const result = await axios.get("http://localhost:8080/hang", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setHangs(result.data);
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
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, ,
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">
              Còn bán
            </Tag>
          ) : (
            <Tag color="red">
              Dừng bán
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
          <a className='btn btn-danger'><BsFillEyeFill className='mb-1' /></a>
        </Space>
      ),
    },
  ]

  return (
    <div className='container-fluid' style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <PiTrademarkFill size={35} /> Quản lý hãng</h4></Divider>
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
            form={form}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã">
                <Input className='rounded-pill border-warning' placeholder='Nhập tên hoặc mã' />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item label="Trạng Thái">
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className='text-center'>
              <Button type="primary" htmlType='reset'>Làm mới</Button>
            </Form.Item>
          </Form>
        </div>

        <div className='text-end'>
          <a className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill" role="button" onClick={() => setOpen(true)}> <PlusCircleOutlined />  Thêm hãng</a>
        </div>
        <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><BookFilled size={30} /> Danh sách hãng</h5>
          <hr />
          <div className="ms-3">
            {/* Add cl */}
            <Modal
              title="Thêm Hãng"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer={[
                <Button onClick={() => setOpen(false)}>Hủy</Button>,
                <Button type="primary" onClick={() => {
                  Modal.confirm({
                    centered : true,
                    title: 'Thông báo',
                    content: 'Bạn có chắc chắn muốn thêm không?',
                    onOk: () => { form.submit(); },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}>Thêm</Button>
              ]}
              width={500}
            >
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={addHang}
                form={form}>
                <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                  <Input className="border" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={hang} columns={columns} pagination={{
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