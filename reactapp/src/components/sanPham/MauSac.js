import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Badge,
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
import tinycolor from 'tinycolor2';
import { BsFillEyeFill } from 'react-icons/bs';
import { IoColorPalette } from 'react-icons/io5';

export default function MauSac() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [tenMau, setTenMau] = useState('#000000'); // Màu mặc định
  const doiMau = (e) => {
    const maMau = e.target.value;
    const mau = tinycolor(maMau);
    const ten = mau.toName();
    console.log(`${ten}`);
    setTenMau(ten);
    console.log(`${tenMau}`);
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
  const addMauSac = (value) => {
    const chekTrung = (code) => {
      return mauSac.some(color => color.ma === code);
    };
    if (!chekTrung(value.ma)) {
      console.log(value.ma);
      axios.post('http://localhost:8080/mau-sac/add', value)
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
          loadMauSac();
          form.resetFields();

        })
        .catch(error => console.error('Error adding item:', error));

    } else {
      console.log('hehe');
      toast.error('Mã màu đã tồn tại!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  //Table
  const [mauSac, setMauSacs] = useState([]);

  useEffect(() => {
    loadMauSac();
  }, []);

  const loadMauSac = async () => {
    const result = await axios.get("http://localhost:8080/mau-sac", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setMauSacs(result.data);
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
      title: "Màu",
      dataIndex: "ma",
      key: "Ma",
      render: (text, record) => {
        return <>
          <div style={{
            backgroundColor: `${record.ma}`,
            borderRadius: 6,
            width: 60, 
            height: 25,
          }}></div >
        </>;
      }
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
          <a className='btn btn-danger'><BsFillEyeFill className='mb-1' /></a>
        </Space>
      ),
    },
  ]

  return (
    <div className='container-fluid' style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <IoColorPalette size={35} /> Quản lý màu sắc</h4></Divider>
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
          <a className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill" role="button" onClick={() => setOpen(true)}> <PlusCircleOutlined />  Thêm màu sắc </a>
        </div>
        <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><BookFilled size={30} /> Danh sách màu sắc</h5>
          <hr />
          <div className="ms-3">
            {/* Add ms */}
            <Modal
              title="Thêm Màu Sắc"
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
                onFinish={addMauSac}
                form={form}>
                <Form.Item label="Màu" name='ma' hasFeedback rules={[{ required: true, message: 'Vui lòng chọn màu', },]} >
                  <Input className="border" type="color" value={tenMau} onChange={doiMau} />
                </Form.Item>
                <Form.Item label=" Mã" name='ma' hasFeedback rules={[{ required: true, message: '', },]} >
                  <Input readOnly="true" className="border" type="text" value={tenMau} onChange={doiMau} />
                </Form.Item>
                <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                  <Input className="border" type="text" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={mauSac} columns={columns} pagination={{
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