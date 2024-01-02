import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Radio,
    Divider,
    Modal,
    Table,
    AutoComplete,
    notification
} from 'antd';
import { Link } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Cascader } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import "./SanPham.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { keys } from '@antv/util';
import { App } from 'antd';
import tr from 'date-fns/esm/locale/tr/index.js';


export default function AddSanPham() {
    //Form
    const [selectedValue, setSelectedValue] = useState('1');
    const handleChange = (value) => {
        console.log(`Selected value: ${value}`);
        setSelectedValue(value);
    };
    const { Option } = Select;
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);

    };
    const onChange = (selectedOption) => {
        // In ra giá trị của key khi có sự thay đổi
        console.log('Selected key:', selectedOption);
    };
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    //Load table
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
            title: "Tên",
            dataIndex: "tenSP",
            center: "true",
        },
        {
            title: "Số lượng",
            dataIndex: "",
        },
        {
            title: "Giá bán",
            dataIndex: "",
        }, ,
        {
            title: "Upload ảnh",
            dataIndex: "",
        },
    ]
    //Add CTSP
    const addCTSanPham = (value) => {
        console.log(value);
        axios.post('http://localhost:8080/ctsp/add', value)
            .then(response => {
                console.log(response.data);
                loadSP();
                form.resetFields();
            })
            .catch(error => console.error('Error adding item:', error));
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
    }

    //Load san pham
    const [openSP, setOpenSP] = useState(false);
    const [optionsSP, setOptionsSP] = useState([]);
    useEffect(() => {
        loadSP();
    }, []);
    const loadSP = async () => {
        const result = await axios.get("http://localhost:8080/san-pham/getAll", {
            validateStatus: () => {
                return true;
            }
        });
        setOptionsSP(result.data);
    };
    const addSanPham = (value) => {
        console.log(value);
        axios.post('http://localhost:8080/san-pham/add', value)
            .then(response => {
                console.log(response.data);
                loadSP();
                form1.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));
    }
    //Load Kích Thước
    const [openKT, setOpenKT] = useState(false);
    const [openSelectKT, setSelectKT] = useState(false);
    const [ktData, setKTData] = useState([]);
    const [optionsKT, setOptionsKT] = useState([]);
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
            setKTData(result.data);
            const loadOKT = result.data.map(item => ({
                key: item.id,
                value: item.id,
                label: item.ten,
            }));
            setOptionsKT(loadOKT);
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
    // Load Màu Sắc
    const [openMS, setOpenMS] = useState(false);
    const [msData, setMSData] = useState([]);
    const [optionsMS, setOptionsMS] = useState([]);
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
            setMSData(result.data);
            const loadOMS = result.data.map(item => ({
                key: item.id,
                value: item.id,
                label: item.ten,
            }));
            setOptionsMS(loadOMS);
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
    // Load Chất Liệu
    const [openCL, setOpenCL] = useState(false);
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
            console.log(cl);
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
    // Load Độ Cao
    const [openDC, setOpenDC] = useState(false);
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
    // Load Danh Mục
    const [openDM, setOpenDM] = useState(false);
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
    // Load Hãng
    const [openH, setOpenH] = useState(false);
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
    //Hiển Thị 
    const [tableData, setTableData] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const formTableChange = (changedValues, allValues) => {
        const newData = { ...tableData[tableData.length - 1], ...changedValues };
        setTableData([...tableData.slice(0, -1), newData]);
    };

    return (
        <div className='container-fluid' style={{ borderRadius: 20 }}>
            <div className="container-fluid">
                <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <PlusCircleOutlined size={35} /> Thêm sản phẩm</h4></Divider>
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
                    form={form}
                    onFinish={addCTSanPham}
                >
                    <div>
                        {/* Sản Phẩm */}
                        <div className=' bg-light m-2 p-3 pt-2' style={{
                            border: '1px solid #ddd', // Border color
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
                            borderRadius: '8px'
                        }}>
                            <h5><IoIosAddCircleOutline size={30} /> Thông tin sản phẩm</h5>
                            <hr />
                            {/* Sản Phẩm  */}
                            <div className='row'>
                                <Form.Item className='col' style={{ paddingLeft: 235 }} name='sanPham' label={<b>Tên Sản Phẩm </b>}
                                    hasFeedback rules={[{ required: true, message: '', },]}>
                                    <Select
                                        onChange={handleChange}
                                        placeholder="Chọn một giá trị"
                                        style={{ height: 40, width: 613 }}
                                        showSearch
                                        className='me-1'

                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {optionsSP.map(item => (
                                            <Select.Option
                                                key={item.id}
                                                value={item.id}>
                                                {item.ten}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item className='col mt-1' style={{ paddingLeft: 140 }} >
                                    <Button className='bg-success text-white' onClick={() => setOpenSP(true)}> <b>+</b> </Button>
                                    <Modal
                                        title="Thêm Sản Phẩm"
                                        centered
                                        open={openSP}
                                        onOk={() => setOpenSP(false)}
                                        onCancel={() => setOpenSP(false)}
                                        footer={[
                                            <Button onClick={() => setOpenSP(false)}>Hủy</Button>,
                                            <Button type="primary" onClick={() => {
                                                Modal.confirm({
                                                    centered: true,
                                                    title: 'Thông báo',
                                                    content: 'Bạn có chắc chắn muốn thêm không?',
                                                    onOk: () => { form1.submit(); },
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
                                            onFinish={addSanPham}
                                            form={form1}>

                                            <div className='row'>
                                                <div className="container">
                                                    <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                        <Input className="border" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </Modal>
                                </Form.Item>
                            </div>
                            {/* Mô Tả */}
                            <Form.Item name='moTa' label={<b>Mô tả </b>}
                                hasFeedback rules={[{ required: true, message: '', },]}>
                                <TextArea rows={5} placeholder='Nhập mô tả sản phẩm' className='w-75' />
                            </Form.Item>
                            {/* Chất liệu & Hãng */}
                            <div className='row'>
                                <div className='col'>
                                    {/* Chất Liệu */}
                                    <div className='row'>
                                        <Form.Item className='col' style={{ paddingLeft: 180, height: 10 }} name='chatLieu' label={<b>Chất liệu </b>}
                                            hasFeedback rules={[{ required: true, message: '', },]}>
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }}>
                                                {cl.map(item => (
                                                    <Select.Option key={item.id} value={item.id}>
                                                        {item.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item style={{ paddingLeft: 323 }}>
                                            <Button style={{ width: 250, height: 30, }} className='bg-success text-white' onClick={() => setOpenCL(true)}> <b>Thêm chất liệu </b></Button>
                                            <Modal
                                                title="Thêm Chất Liệu"
                                                centered
                                                open={openCL}
                                                onOk={() => setOpenCL(false)}
                                                onCancel={() => setOpenCL(false)}
                                                footer={[
                                                    <Button onClick={() => setOpenCL(false)}>Hủy</Button>,
                                                    <Button type="primary" onClick={() => {
                                                        Modal.confirm({
                                                            centered: true,
                                                            title: 'Thông báo',
                                                            content: 'Bạn có chắc chắn muốn thêm không?',
                                                            onOk: () => { form1.submit(); },
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
                                                    onFinish={addChatLieu}
                                                    form={form1}>

                                                    <div className='row'>
                                                        <div className="container">
                                                            <Form.Item label="Tên" name='ten'>
                                                                <Input className="border" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Modal>
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* Hãng */}
                                <div className='col'>
                                    <div className='row'>
                                        <Form.Item className='col' style={{ paddingRight: 410, height: 10 }} name='hang' label={<b>Hãng </b>}
                                            hasFeedback rules={[{ required: true, message: '', },]}>
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }} className='me-2'>
                                                {h.map(item => (
                                                    <Select.Option key={item.id} value={item.id}>
                                                        {item.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item style={{ paddingLeft: 100 }}>
                                            <Button style={{ width: 250, height: 30, }} className='bg-success text-white w-1' onClick={() => setOpenH(true)}> <b>Thêm hãng</b> </Button>
                                            <Modal
                                                title="Thêm Hãng"
                                                centered
                                                open={openH}
                                                onOk={() => setOpenH(false)}
                                                onCancel={() => setOpenH(false)}
                                                footer={[
                                                    <Button onClick={() => setOpenH(false)}>Hủy</Button>,
                                                    <Button type="primary" onClick={() => {
                                                        Modal.confirm({
                                                            centered: true,
                                                            title: 'Thông báo',
                                                            content: 'Bạn có chắc chắn muốn thêm không?',
                                                            onOk: () => { form1.submit(); },
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
                                                    form={form1}>

                                                    <div className='row'>
                                                        <div className="container">
                                                            <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                                <Input className="border" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Modal>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            {/* Đế giày & Danh mục */}
                            {/* Đế giày*/}
                            <div className='row'>
                                <div className='col'>
                                    <div className='row'>
                                        <Form.Item className='col' style={{ paddingLeft: 180, height: 10 }} name='deGiay' label={<b>Đế giày </b>}
                                            hasFeedback rules={[{ required: true, message: '', },]}>
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }} className='me-2' onChange={onChange}>
                                                {dc.map(item => (
                                                    <Select.Option key={item.id} value={item.id}>
                                                        {item.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item style={{ paddingLeft: 323 }}>
                                            <Button style={{ width: 250, height: 30, }} className='bg-success text-white' onClick={() => setOpenDC(true)}><b>Thêm đế giày</b></Button>
                                            <Modal
                                                title="Thêm Độ Cao"
                                                centered
                                                open={openDC}
                                                onOk={() => setOpenDC(false)}
                                                onCancel={() => setOpenDC(false)}
                                                footer={[
                                                    <Button onClick={() => setOpenDC(false)}>Hủy</Button>,
                                                    <Button type="primary" onClick={() => {
                                                        Modal.confirm({
                                                            centered: true,
                                                            title: 'Thông báo',
                                                            content: 'Bạn có chắc chắn muốn thêm không?',
                                                            onOk: () => { form1.submit(); },
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
                                                    onFinish={addDoCao}
                                                    form={form1}>

                                                    <div className='row'>
                                                        <div className="container">
                                                            <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                                <Input className="border" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Modal>
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* Danh mục */}
                                <div className='col'>
                                    <div className='row'>
                                    <Form.Item className='col' style={{ paddingRight: 410, height: 10 }} name='danhMuc' label={<b>Danh mục </b>}
                                        hasFeedback rules={[{ required: true, message: '', },]}>
                                        <Select placeholder="Chọn một giá trị" style={{ width: 250 }} className='me-2'>
                                            {dm.map(item => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.ten}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                       
                                    </Form.Item>
                                    <Form.Item style={{ paddingLeft:100}}>
                                    <Button style={{ width: 250, height: 30, }}  className='bg-success text-white w-1' onClick={() => setOpenDM(true)}><b>Thêm danh mục</b></Button>
                                        <Modal
                                            title="Thêm Danh Mục"
                                            centered
                                            open={openDM}
                                            onOk={() => setOpenDM(false)}
                                            onCancel={() => setOpenDM(false)}
                                            footer={[
                                                <Button onClick={() => setOpenDM(false)}>Hủy</Button>,
                                                <Button type="primary" onClick={() => {
                                                    Modal.confirm({
                                                        centered: true,
                                                        title: 'Thông báo',
                                                        content: 'Bạn có chắc chắn muốn thêm không?',
                                                        onOk: () => { form1.submit(); },
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
                                                onFinish={addDanhMuc}
                                                form={form1}>

                                                <div className='row'>
                                                    <div className="container">
                                                        <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                            <Input className="border" />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Modal>
                                    </Form.Item>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* Kích thước và màu sắc */}
                        <div className=' bg-light m-2 p-3 pt-2' style={{
                            border: '1px solid #ddd', // Border color
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
                            borderRadius: '8px'
                        }}>
                            <h5><MdAddTask size={30} /> Kích thước và màu sắc</h5>
                            <hr />
                            {/* Kích Thước */}
                            <div className='row'>
                            <Form.Item className='col' style={{ paddingLeft: 235 }} label={<b>Kích thước </b>} name="kichThuoc"
                            hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống kích thước !', },]}>
                                <Select style={{
                                    width : '630px',
                                    height: '50px'
                                }}
                                    // mode="multiple"
                                    placeholder="Chọn một giá trị"
                                    className='me-2'
                                    onChange={onChange}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {ktData.map(item => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.ten}
                                        </Select.Option>
                                    ))}
                                </Select>                                                            
                            </Form.Item>
                            <Form.Item className='col mt-2' style={{ paddingLeft: 140 }}>
                                <Button className='bg-success text-white w-1' onClick={() => setSelectKT(true)}> + </Button>
                                {/* Modal chọn */}
                                <Modal
                                    title="Danh Sách Kích Thước"
                                    centered
                                    open={openSelectKT}
                                    onOk={() => setSelectKT(false)}
                                    onCancel={() => setSelectKT(false)}
                                    footer={[
                                        <Button onClick={() => setOpenKT(false)}>Hủy</Button>,
                                        <Button type="primary" onClick={() => {
                                            Modal.confirm({
                                                centered: true,
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
                                    width={500}>
                                    <div className='text-end'> <Button className='bg-success text-white w-1' onClick={() => { setOpenKT(true); setSelectKT(false); }}>+ Thêm kích thước </Button></div>
                                    <div className='row'>
                                        {ktData.map(item => (
                                            <div className='col-md-2 mt-3 mb-3' ><Radio.Button>{item.ten}</Radio.Button></div>
                                        ))}
                                    </div>
                                </Modal>
                                {/* Modal tạo mới */}
                                <Modal
                                    title="Thêm Kích Thước"
                                    centered
                                    open={openKT}
                                    onOk={() => { setOpenKT(false); setSelectKT(true); }}
                                    onCancel={() => { setOpenKT(false); setSelectKT(true); }}
                                    footer={[
                                        <Button onClick={() => setOpenKT(false)}>Hủy</Button>,
                                        <Button type="primary" onClick={() => {
                                            Modal.confirm({
                                                centered: true,
                                                title: 'Thông báo',
                                                content: 'Bạn có chắc chắn muốn thêm không?',
                                                onOk: () => { form1.submit(); },
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
                                        onFinish={addKichThuoc}
                                        form={form1}>

                                        <div className='row'>
                                            <div className="container">
                                                <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                    <Input className="border" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </Modal>
                                <br />
                                </Form.Item>
                            </div>
                            {/* Màu Sắc */}
                            <div className='row'>
                            <Form.Item className='col' style={{ paddingLeft: 235 }} label={<b>Màu sắc </b>} name='mauSac'
                            hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống màu sắc!', },]}>
                                <Select
                                    style={{
                                        width : '630px',
                                        height: '50px'
                                    }}
                                    // mode="multiple"
                                    placeholder="Chọn một giá trị"
                                    className='me-2'
                                    onChange={onChange}
                                >
                                    {msData.map(item => (
                                        <Select.Option
                                            centered
                                            key={item.id}
                                            value={item.id}
                                        >
                                            <div style={{
                                                backgroundColor: `${item.ma}`,
                                                borderRadius: 6,
                                                width: 500,
                                                height: 25,
                                            }}></div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item className='col mt-2' style={{ paddingLeft: 140 }}>
                            <Button className='bg-success text-white w-1' onClick={() => setOpenMS(true)}> + </Button>
                                <Modal
                                    title="Thêm Màu Sắc"
                                    centered
                                    open={openMS}
                                    onOk={() => setOpenMS(false)}
                                    onCancel={() => setOpenMS(false)}
                                    footer={[
                                        <Button onClick={() => setOpenMS(false)}>Hủy</Button>,
                                        <Button type="primary" onClick={() => {
                                            Modal.confirm({
                                                centered: true,
                                                title: 'Thông báo',
                                                content: 'Bạn có chắc chắn muốn thêm không?',
                                                onOk: () => { form1.submit(); },
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
                                        onFinish={addMauSac}
                                        form={form1}>

                                        <div className='row'>
                                            <div className="container">
                                                <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                    <Input className="border" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </Modal>
                            </Form.Item>
                            </div>
                        </div>

                        {/* Table */}
                        <div className=' bg-light m-2 p-3 pt-2' style={{
                            border: '1px solid #ddd', // Border color
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
                            borderRadius: '8px'
                        }}>
                            <h5><InfoCircleOutlined size={30} /> Chi tiết sản phẩm</h5>
                            <hr />
                            <div className='text-start mt-3'>
                                <Form.Item >
                                    <Button className='ms-3 me-2' href='/san-pham'>Hủy</Button>
                                    <Button className='bg-success text-white' onClick={() => {
                                        Modal.confirm({
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
                                    }}>Thêm Sản Phẩm</Button>
                                </Form.Item>
                            </div>
                            <Table dataSource={tableData} columns={columns}></Table>
                        </div>
                    </div>
                </Form>
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