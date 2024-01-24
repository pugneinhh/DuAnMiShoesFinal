import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Modal,
  QRCode,
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
import { HighlightOutlined, InfoCircleFilled, InfoCircleOutlined, PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
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
import './SanPham.scss'
import SuaAnhCTSP from './SuaAnhCTSP';

export default function CTSP() {
  //Mở detail ctsp
  const { uuid } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [ktCheck, setKtCheck] = useState('');
  const [msCheck, setMsCheck] = useState('');
  const thongBaoTC = () => {
    toast('✔️ Sửa thành công!', {
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


  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [openKT, setOpenKT] = useState(false);
  const [openMS, setOpenMS] = useState(false);
  const [openCL, setOpenCL] = useState(false);
  const [openDC, setOpenDC] = useState(false);
  const [openDM, setOpenDM] = useState(false);
  const [openH, setOpenH] = useState(false);
  const [ctData, setCTDatas] = useState({});
  const [updateNhanh, setUpdateNhanh] = useState([]);

  //CheckBox Dong
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const loadUpdateNhanh = async () => {
    if (selectedRowKeys) {
      console.log(selectedRowKeys);
      for (let i = 0; i < selectedRowKeys.length; i++) {
        const result = await axios.get(`http://localhost:8080/ctsp/detail/${selectedRowKeys[i]}`, {
          validateStatus: () => {
            return true;
          }
        });
        setUpdateNhanh((prevData) => [...prevData, result.data]);
      }
    }
  };

  useEffect(() => {
    setUpdateNhanh([]);
    loadUpdateNhanh();
  }, [selectedRowKeys]);

  console.log(updateNhanh)

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChangeSL = (record, value) => {
    const newData = [...updateNhanh];
    const index = newData.findIndex(item => item.id === record.key);
    if (index > -1) {
      newData[index].soLuong = value;
      setUpdateNhanh(newData);
    }
  };
  const onChangeGB = (record, value) => {
    const newData = [...updateNhanh];
    const index = newData.findIndex(item => item.id === record.key);
    if (index > -1) {
      newData[index].giaBan = value;
      setUpdateNhanh(newData);
    }
  };
  //Update nhanh
  const UpdateNhanh = () => {
    if (selectedRowKeys.length <= 0) {
      toast.warning('Chưa chọn sản phẩm để sửa !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      Modal.confirm({
        centered: 'true',
        title: 'Thông báo',
        content: 'Bạn có chắc chắn muốn cập nhật không?',
        onOk: () => {
          axios.put(`http://localhost:8080/ctsp/update/${updateNhanh[0].id}`,updateNhanh[0])
            .then(response => {
              console.log(response.data);
              toast('✔️ Sửa thành công!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              loadCTSP();
            })
            .catch(error => console.error('Error adding item:', error));
        },
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        ),
      });
    }
  }
  //Update
  const showModal = async (idCT) => {
    const result = await axios.get(`http://localhost:8080/ctsp/detail/${idCT}`, {
      validateStatus: () => {
        return true;
      }
    });
    setMsCheck(result.data.mauSac)
    setKtCheck(result.data.kichThuoc)
    setCTDatas(result.data);
    setIsModalOpen(true);
  };
  const [optionsCTSP, setOptionsCTSP] = useState([]);
  useEffect(() => {

    loadCTSP_Update();
  }, []);
  const loadCTSP_Update = async () => {
    const result = await axios.get("http://localhost:8080/ctsp/detailsp", {
      validateStatus: () => {
        return true;
      }
    });
    console.log(result.data);
    setOptionsCTSP(result.data);
  };

  const updateCTSanPham = () => {

    if (ctData.kichThuoc != ktCheck || ctData.mauSac != msCheck) {
      const checkTrung = (sanPham, mauSac, kichThuoc) => {
        return optionsCTSP.some(ctsp =>
          ctsp.sanPham === sanPham && ctsp.mauSac === mauSac && ctsp.kichThuoc === kichThuoc
        );
      };

      if (checkTrung(ctData.sanPham, ctData.mauSac, ctData.kichThuoc)) {
        toast.error('Sản phẩm có kích thước và màu sắc trùng với sản phẩm khác !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }

    axios.put(`http://localhost:8080/ctsp/update/${ctData.id}`, ctData)
      .then(response => {
        console.log(response.data);
        toast('✔️ Sửa thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadCTSP();
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues)
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    axios.post(`http://localhost:8080/ctsp/search-ctsp/${uuid}`, dataSearch)
      .then(response => {
        // Update the list of items
        setCTSPs(response.data);
        console.log("tìm kím:", response.data);
        console.log("UUID : ", uuid)
      })
      .catch(error => console.error('Error adding item:', error));
  }
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
    setCTDatas(dataSource)
    loadCTSP();
  }, []);
  const loadCTSP = async () => {
    const result = await axios.get(`http://localhost:8080/ctsp/showct/${uuid}`, {
      validateStatus: () => {
        return true;
      }
    });
    console.log(result.data);
    setCTSPs(result.data);
  };

  const dataSource = cTSP.map((item) => ({
    idCTSP: item.idCTSP,
    key: item.idCTSP,
    linkAnh: item.linkAnh,
    tenSP: item.tenSP,
    giaBan: item.giaBan,
    soLuong: item.soLuong,
    tenKT: item.tenKT,
    tenMS: item.tenMS,
    maMS: item.maMS,
    trangThai: item.trangThai
  }));



  // console.log(dataSource)
  const loadCTKT = async () => {
    const result = await axios.get(`http://localhost:8080/ctsp/search/${uuid}`, {
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
      render: (text, record) => {
        const isCTSelected = selectedRowKeys.some((selectedItem) => selectedItem === record.idCTSP);
        return isCTSelected ? (
          <InputNumber
            defaultValue={record.giaBan}
            formatter={(value) =>
              `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
            style={{ marginLeft: 20, width: 160 }}
            onChange={(e) => onChangeGB(record, e.target.value)}
          />
        ) : (
          <span>{`${Intl.NumberFormat('en-US').format(record.giaBan)} VNĐ`}</span>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      render: (_, record) => {
        const isCTSelected = selectedRowKeys.some((selectedItem) => selectedItem === record.idCTSP);
        return isCTSelected ? (
          <Input
            type='number'
            defaultValue={record.soLuong}
            style={{ marginLeft: 20, width: 160 }}
            onChange={(e) => onChangeSL(record, e.target.value)}
          />
        ) : (
          <span>{`${Intl.NumberFormat('en-US').format(record.soLuong)}`}</span>
        );
      },
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
          <div
            className='custom-div'
            style={{
              backgroundColor: record.maMS,
              borderRadius: 6,
              width: 70,
              height: 25,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}><b>{record.maMS}</b></div >
        </>;
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
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
                onFinish={updateCTSanPham}
                form={form2}>
                <div className='row'>
                  <Form.Item label={<b>Tên sản phẩm </b>} >
                    <Select defaultValue={ctData.sanPham} disabled>
                      <Select.Option key={ctData.sanPham} value={ctData.sanPham}>
                        {ctData.tenSP}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className='row'>
                  <Form.Item label={<b>Mô tả </b>} hasFeedback rules={[{ required: true, message: 'Vui lòng nhập mô tả!', },]}>
                    <TextArea value={ctData.moTa} onChange={(e) => setCTDatas({ ...ctData, moTa: e.target.value })}></TextArea>
                  </Form.Item>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Kích thước </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.kichThuoc} onChange={(e) => setCTDatas({ ...ctData, kichThuoc: e })} >
                        {kt.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Màu Sắc</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.mauSac} onChange={(e) => setCTDatas({ ...ctData, mauSac: e })}>
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
                      <Select placeholder="Chọn một giá trị" value={ctData.chatLieu} onChange={(e) => setCTDatas({ ...ctData, chatLieu: e })}>
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
                      <Select placeholder="Chọn một giá trị" value={ctData.deGiay} onChange={(e) => setCTDatas({ ...ctData, deGiay: e })}>
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
                      <Select placeholder="Chọn một giá trị" value={ctData.danhMuc} onChange={(e) => setCTDatas({ ...ctData, danhMuc: e })}>
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
                      <Select placeholder="Chọn một giá trị" value={ctData.hang} onChange={(e) => setCTDatas({ ...ctData, hang: e })}>
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
                      <InputNumber
                        min={0}
                        placeholder='Nhập số lượng'
                        value={ctData.soLuong}
                        onChange={(e) => setCTDatas({ ...ctData, soLuong: e })}
                      ></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Giá bán </b>}>
                      <InputNumber
                        placeholder='Nhập giá bán'
                        value={ctData.giaBan}
                        onChange={(e) => setCTDatas({ ...ctData, giaBan: e })}
                      ></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Trạng thái </b>}>
                      <Select defaultValue={ctData.trangThai == 0 ? 'Còn bán' : 'Dừng bán'} onChange={(e) => setCTDatas({ ...ctData, trangThai: e })}>
                        <Select.Option value='0'>Còn Bán</Select.Option>
                        <Select.Option value='1'>Dừng Bán</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <label className='mb-2'><b>QR Code :</b></label>
                  <QRCode size={100} type="canvas" value={ctData.id} />
                  <label className='mb-2'><b>Hình ảnh :</b></label>
                  <SuaAnhCTSP></SuaAnhCTSP>
                </div>
                <div className='row'>
                  <div className='container text-center'>
                    <Button className='bg-warning text-dark rounded-pill border'
                      onClick={() => {
                        Modal.confirm({
                          centered: 'true',
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
              </Form>

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
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
          >

            {/* Form tìm kiếm */}
            {/* Các Thuộc Tính Dòng 1 */}
            <div className='row mt-3'>
              {/* Tên & Mã */}
              <div className="col-md-4">
                <Form.Item label="Tên & Mã" name="tenCT">
                  <Input className="border" />
                </Form.Item>
              </div>
              {/* Kích Thước */}
              <div className='col-md-4' >
                <Form.Item label="Kích Thước" name="idKT">
                  <Select placeholder="Chọn một giá trị" >
                    {kt.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Màu Sắc */}
              <div className='col-md-4'>
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
            </div>


            {/* Các Thuộc Tính Dòng 2 */}
            <div className='row'>
              {/* Chất Liệu */}
              <div className='col-md-4' >
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
              {/* Độ Cao */}
              <div className='col-md-4'>
                <Form.Item label="Đế giày" name="idDC">
                  <Select placeholder="Chọn một giá trị">
                    {dc.map(item => (
                      <Option key={item.ma} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Danh Mục */}
              <div className='col-md-4'>
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
            </div>

            {/* Các Thuộc Tính Dòng 3 */}
            <div className='row'>
              {/* Hãng */}
              <div className='col-md-4'>
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
              <div className='col-md-4'>
                <Form.Item label="Trạng thái" name="trangThaiCT">
                  <Select placeholder="Chọn một giá trị" defaultValue="1">
                    <Select.Option value='1'>Còn Bán</Select.Option>
                    <Select.Option value='0'>Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='col-md-4'>
                <Form.Item label="Số lượng" name="soLuongCT">
                  <Slider style={{ width: '200px' }} min={1} />
                </Form.Item>
              </div>
            </div>
            <div className='col'>
              <Form.Item style={{ marginLeft: 100 }} label="Giá bán" name="giaBanCT">
                <Slider style={{ width: '430px' }} min={1000000} max={10000000} step={1000000} />
              </Form.Item>
            </div>


            <div className='container-fluid'>
              <Form.Item className='text-center' style={{ paddingLeft: 360 }}>
                <Button type="primary" htmlType='reset' onClick={loadCTSP} icon={<RetweetOutlined />}>Làm mới</Button>
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
          <div className='text-end'>
            <a onClick={UpdateNhanh} className="btn btn-success bg-gradient fw-bold nut-them rounded-pill" role="button"> <HighlightOutlined />  Sửa sản phẩm </a>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={dataSource} columns={columns} pagination={{
                showQuickJumper: true,
                defaultPageSize: 5,
                position: ['bottomCenter'],
                defaultCurrent: 1,
                total: 100,
              }} rowSelection={rowSelection} />
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