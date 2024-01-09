import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Modal,
  Form,
  Radio,
  Input,
  InputNumber,
  Select,
  Slider,
  Space,
  Table,
  Tag,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { InfoCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAddTask } from 'react-icons/md';

export default function CTSP() {
  //Mở detail ctsp
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = async (idCT) => {
    const result = await axios.get(`http://localhost:8080/ctsp/detail/${idCT}`, {
      validateStatus: () => {
        return true;
      }
    });
    console.log(idCT)
    console.log(result.data)
    setCTDatas(result.data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Option } = Select;
  //Form
  const onChange = (selectedOption) => {
    // In ra giá trị của key khi có sự thay đổi
    console.log('Selected key:', selectedOption);
  };
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const updateCT = async () => {
    const updateData = {
      idC: ctData.idC,
      moTa: ctData.moTa,
      idKT: ctData.idKT,
      idMS: ctData.idMS,
      idCL: ctData.idCL,
      idDC: ctData.idDC,
      idDM: ctData.idDM,
      idH: ctData.idH,
      soLuong: ctData.soLuong,
      giaBan: ctData.giaBan,
      trangThai: ctData.trangThai
    }
    console.log(updateData);
  }
  
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [openKT, setOpenKT] = useState(false);
  const [openMS, setOpenMS] = useState(false);
  const [openCL, setOpenCL] = useState(false);
  const [openDC, setOpenDC] = useState(false);
  const [openDM, setOpenDM] = useState(false);
  const [openH, setOpenH] = useState(false);
  const handleChangeKT = () => {
    setCTDatas({ ...ctData, idKT: ctData.idKT, });
  };
  const [ctData, setCTDatas] = useState({});
  //Load kich thước
  const [kt, setKT] = useState([]);
  useEffect(() => {
    loadKT();
  }, []);
  const loadKT = async () => {
    const result = await axios.get("http://localhost:8080/kich-thuoc", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setKT(result.data);
    }
  };
  const addKichThuoc = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/kich-thuoc/add', value)
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
        loadKT();
        form1.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Load Màu Sắc 
  const [ms, setMS] = useState([]);
  useEffect(() => {
    loadMS();
  }, []);
  const loadMS = async () => {
    const result = await axios.get("http://localhost:8080/mau-sac", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setMS(result.data);
    }
  };
  const addMauSac = (value) => {
    console.log(value);
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
        loadMS();
        form1.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Load Chất Liệu
  const [cl, setCL] = useState([]);
  useEffect(() => {
    loadCL();
  }, []);
  const loadCL = async () => {
    const result = await axios.get("http://localhost:8080/chat-lieu", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setCL(result.data);
    }
  };
  const addChatLieu = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/chat-lieu/add', value)
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
        loadCL();
        form1.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Load Độ Cao
  const [dc, setDC] = useState([]);
  useEffect(() => {
    loadDC();
  }, []);
  const loadDC = async () => {
    const result = await axios.get("http://localhost:8080/de-giay", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setDC(result.data);
    }
  };
  const addDoCao = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/de-giay/add', value)
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
        loadDC();
        form1.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Load Danh Mục
  const [dm, setDM] = useState([]);
  useEffect(() => {
    loadDM();
  }, []);
  const loadDM = async () => {
    const result = await axios.get("http://localhost:8080/danh-muc", {
      validateStatus: () => {
        return true;
      }
    });
    setDM(result.data);
  };
  const addDanhMuc = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/danh-muc/add', value)
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
        loadDM();
        form1.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Load Hãng
  const [h, setH] = useState([]);
  useEffect(() => {
    loadH();
  }, []);
  const loadH = async () => {
    const result = await axios.get("http://localhost:8080/hang", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setH(result.data);
    }
  };
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
        loadH();
        form1.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Table
  const [cTSP, setCTSPs] = useState([]);

  useEffect(() => {
    loadCTSP();
  }, []);
  const { uuid } = useParams();
  console.log(`${uuid}`)
  const loadCTSP = async () => {
    const result = await axios.get(`http://localhost:8080/ctsp/showct/${uuid}`, {
      validateStatus: () => {
        return true;
      }
    });
    console.log(result.data);
    setCTSPs(result.data);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idCTSP",
      key: "idCTSP",
      render: (idCTSP, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Hình ảnh",
      dataIndex: "linkAnh",
      key: "link",
      center: "true",
      render: (link) => {
        return <><Image
          cloudName="dtetgawxc"
          publicId={link}
          width="100"
          crop="scale"
          href={link}
        /></>;
      }
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
      render: (text, record) => (
        <span>{`${Intl.NumberFormat('en-US').format(record.giaBan)} VNĐ`}</span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Kích thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu sắc",
      dataIndex: "maMS",
      render: (text, record) => {
        return <>
          <div style={{
            backgroundColor: `${record.maMS}`,
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
      dataIndex: "idCTSP",
      render: (title) => (
        <Space size="middle">
          <a>
            <Button type="primary" shape='round' className='bg-success text-white' icon={<EyeOutlined />} onClick={() => showModal(`${title}`)} />
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={700}
              footer={[]}>
              <div className='text-center mb-3'>
                <h3>Chi Tiết Sản Phẩm</h3>
              </div>
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={updateCT}
                form={form2}>
                <div className='row'>
                  <Form.Item label={<b>Tên sản phẩm </b>}>
                    <Input readOnly value={ctData.tenSP}></Input>
                  </Form.Item>
                </div>
                <div className='row'>
                  <Form.Item label={<b>Mô tả </b>} hasFeedback rules={[{ required: true, message: 'Vui lòng nhập mô tả!', },]}>
                    <TextArea value={ctData.moTa} onChange={(e) => setCTDatas({ ...ctData, moTa: e.target.value })}></TextArea>
                  </Form.Item>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Kích thước </b>} hasFeedback rules={[{ required: true, message: 'Vui lòng chọn kích thước!', },]}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idKT} onChange={handleChangeKT}>
                        {kt.map(item => (
                          <Select.Option key={item.id} value={item.id} >
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Màu Sắc</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idMS}>
                        {ms.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Chất liệu </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idCL}>
                        {cl.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Độ cao</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idDC}>
                        {dc.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Danh mục </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idDM}>
                        {dm.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Hãng</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idH}>
                        {h.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Số lượng </b>}>
                      <InputNumber min={0} placeholder='Nhập số lượng' value={ctData.soLuong}></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Giá bán </b>}>
                      <InputNumber placeholder='Nhập giá bán' value={ctData.giaBan}></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Trạng thái </b>}>
                      <Select value={ctData.trangThai}>
                        <Select.Option value='1'>Còn Bán</Select.Option>
                        <Select.Option value='0'>Dừng Bán</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </Form>
              <div className='row'>
                <div className='container text-center'>
                  <Button className='bg-warning text-dark rounded-pill border'
                    onClick={() => {
                      Modal.confirm({
                        title: 'Thông báo',
                        content: 'Bạn có chắc chắn muốn cập nhật không?',
                        onOk: () => { form2.submit(); },
                        footer: (_, { OkBtn, CancelBtn }) => (
                          <>
                            <CancelBtn />
                            <OkBtn />
                          </>
                        ),
                      });
                    }}><GrUpdate className='me-1' />Cập Nhật</Button>
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
            {/* Các Thuộc Tính Dòng 1 */}
            <div className='row mt-3'>
              {/* Tên & Mã */}
              <div className="col-3">
                <Form.Item label="Tên & Mã" name="tenCT">
                  <Input className="border" />
                </Form.Item>
              </div>
              {/* Kích Thước */}
              <div className='col-3'>
                <Form.Item label="Kích Thước" name="idKT">
                  <Select placeholder="Chọn một giá trị">
                    {kt.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Màu Sắc */}
              <div className='col-3'>
                <Form.Item label="Màu Sắc" name="idMS">
                  <Select placeholder="Chọn một giá trị">
                    {ms.map(item => (
                      <Option key={item.id} value={item.id}>
                        <div style={{
                          backgroundColor: `${item.ma}`,
                          borderRadius: 6,
                          width: 170,
                          height: 25,
                        }}></div >
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Chất Liệu */}
              <div className='col-3' >
                <Form.Item label="Chất Liệu" name="idCL">
                  <Select placeholder="Chọn một giá trị">
                    {cl.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* Các Thuộc Tính Dòng 2 */}
            <div className='row'>
              {/* Độ Cao */}
              <div className='col-md-3'>
                <Form.Item label="Đế giày" name="idDC">
                  <Select placeholder="Chọn một giá trị">
                    {dc.map(item => (
                      <Option key={item.ma} value={item.ma}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Danh Mục */}
              <div className='col-md-3'>
                <Form.Item label="Danh Mục" name="idDM">
                  <Select placeholder="Chọn một giá trị">
                    {dm.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Hãng */}
              <div className='col-md-3'>
                <Form.Item label="Hãng" name="idH">
                  <Select placeholder="Chọn một giá trị">
                    {h.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Trạng Thái */}
              <div className='col-md-3'>
                <Form.Item label="Trạng thái" name="trangThaiCT">
                  <Select placeholder="Chọn một giá trị">
                    <Select.Option value='1'>Còn Bán</Select.Option>
                    <Select.Option value='0'>Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* Các Thuộc Tính Dòng 3 */}
            <div className='row'>
              <div className='col-md-6'>
                <Form.Item label="Số lượng" name="soLuongCT">
                  <Slider style={{ width: '400px' }} min={1} />
                </Form.Item>
              </div>
              <div className='col-md-6'>
                <Form.Item label="Giá bán" name="giaBanCT">
                  <Slider style={{ width: '400px' }} min={1} />
                </Form.Item>
              </div>
            </div>


            <div className='container-fluid'>
              <Form.Item className='text-center' style={{ paddingLeft: 360 }}>
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