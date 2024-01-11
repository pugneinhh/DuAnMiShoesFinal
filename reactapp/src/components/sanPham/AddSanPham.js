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
import { MdAddTask, MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Cascader } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import "./SanPham.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';
import { DeleteOutlined, InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { keys } from '@antv/util';
import { App } from 'antd';
import tr from 'date-fns/esm/locale/tr/index.js';
import CloudinaryUpload from './UpAnh';
import { useNavigate } from 'react-router-dom';
import convert from 'color-convert';


export default function AddSanPham() {
    //Form
    const nav = useNavigate();
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
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

    const [tableData, setTableData] = useState([]);
    const [dataKichThuoc, setDataKichThuocs] = useState([]);
    const [dataSanPham, setDataSanPhams] = useState([]);
    const [dataMauSac, setDataMauSacs] = useState([]);
    const [dataChatLieu, setDataChatLieus] = useState([]);
    const [dataHang, setDataHangs] = useState([]);
    const [dataDeGiay, setDataDeGiays] = useState([]);
    const [dataDanhMuc, setDataDanhMucs] = useState([]);
    const [dataMoTa, setDataMoTas] = useState([]);

    const handleDelete = (key) => {
        const updatedData = tableData.filter(item => item.key !== key);
        setTableData(updatedData);
    };

    const handleLinkAnhChange = (linkAnh, index) => {
        // Tìm dòng tương ứng trong dataSource
        const updatedDataSource = tableData.map((item) => {
            if (item.key === index) {
                // Cập nhật giá trị ghiChu cho dòng đó
                return { ...item, ghiChu: linkAnh };
            }
            return item;
        });
        // Cập nhật state với dataSource mới
        setTableData(updatedDataSource);
    };


    const onChangeKT = (selectedOption) => {
        setDataKichThuocs(selectedOption);
    };
    const onChangeMS = (selectedOption) => {
        setDataMauSacs(selectedOption);
    };
    const onChangeCL = (selectedOption) => {
        setDataChatLieus(selectedOption);
    };
    const onChangeH = (selectedOption) => {
        setDataHangs(selectedOption);
    };
    const onChangeDG = (selectedOption) => {
        setDataDeGiays(selectedOption);
    };
    const onChangeDM = (selectedOption) => {
        setDataDanhMucs(selectedOption);
    };
    const onChangeMT = (e) => {
        setDataMoTas(e.target.value)
    };
    const onChangeSP = (selectedOption) => {
        setDataSanPhams(selectedOption)
    };
    const onChangeSL = (record, value) => {
        const newData = [...tableData];
        const index = newData.findIndex(item => item.key === record.key);
        if (index > -1) {
            newData[index].soLuong = value;
            setTableData(newData);
        }
    };
    const onChangeGB = (record, value) => {
        const newData = [...tableData];
        const index = newData.findIndex(item => item.key === record.key);
        if (index > -1) {
            newData[index].giaBan = value;
            setTableData(newData);
        }
    };


    const loadDuLieuThem = () => {
        const newDataKT = ktData.filter((data) =>
            dataKichThuoc.includes(data.ten)
        );
        const newDataMS = msData.filter((data) =>
            dataMauSac.includes(data.ma)
        );
        const newDataCL = cl.filter((data) =>
            dataChatLieu.includes(data.ten)
        );
        const newDataH = h.filter((data) =>
            dataHang.includes(data.ten)
        );
        const newDataDG = dc.filter((data) =>
            dataDeGiay.includes(data.ten)
        );
        const newDataDM = dm.filter((data) =>
            dataDanhMuc.includes(data.ten)
        );
        const newDataSP = optionsSP.filter((data) =>
            dataSanPham.includes(data.ten)
        );
        if (dataKichThuoc.length > 0 && dataMauSac.length > 0) {
            let index = 1;
            const nameProduct = selectedValue
            setTableData([])
            for (let i = 0; i < newDataKT.length; i++) {
                for (let j = 0; j < newDataMS.length; j++) {
                    const newSanPham = {
                        key: `${newDataSP[0].ten} - ${newDataKT[i].ten} ${newDataMS[j].ten}`,
                        tenCt: `${newDataSP[0].ten} - [${newDataKT[i].ten} ${newDataMS[j].ten}]`,
                        maMau: newDataMS[j].ma,
                        sanPham: newDataSP[0].id,
                        moTa: dataMoTa,
                        chatLieu: newDataCL[0].id,
                        hang: newDataH[0].id,
                        deGiay: newDataDG[0].id,
                        danhMuc: newDataDM[0].id,
                        mauSac: newDataMS[j].id,
                        kichThuoc: newDataKT[i].id,
                        ghiChu: null,
                        soLuong: 1,
                        giaBan: 1000000,
                        stt: index++,

                    };
                    setTableData((prevData) => [...prevData, newSanPham]);

                }
            }
        } else {
            setTableData([])
        }

    }

    useEffect(() => {
        loadDuLieuThem()
    }, [dataKichThuoc, dataMauSac]);

    console.log(tableData)
    //Load table
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "key"
        },
        {
            title: "Tên",
            dataIndex: "tenCt",
            center: "true",
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            render: (_, record) => (
                <Input
                    type='number'
                    rules={[{ required: true, alert: 'Không để trống số lượng', },]}
                    style={{ width: 100 }}
                    defaultValue={1}
                    onChange={(e) => onChangeSL(record, e.target.value)}
                />
            ),
        },
        {
            title: "Giá bán",
            dataIndex: "giaBan",
            render: (_, record) => {
                return <>
                    <Input
                        formatter={(value) =>
                            `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                        type='number'
                        rules={[{ required: true, alert: 'Không để trống giá', },]}
                        style={{ width: 100 }}
                        defaultValue={1000000}
                        onChange={(e) => onChangeGB(record, e.target.value)}></Input> VNĐ
                </>;
            }
        },
        {
            title: "Màu",
            dataIndex: "maMau",
            render: (_, record) => {
                return <>
                    <div
                        className='custom-div'
                        style={{
                            backgroundColor: record.maMau,
                            borderRadius: 6,
                            width: 60,
                            height: 25,
                        }}></div >
                </>;
            }
        },
        {
            title: "Upload ảnh",
            dataIndex: "ghiChu",
            render: (_, record) => {
                return <>
                    <CloudinaryUpload onLinkAnhChange={(imageUrl) => handleLinkAnhChange(imageUrl, record.key)}></CloudinaryUpload>
                </>;
            }
        },
        {
            title: "Hành động",
            dataIndex: "ghiChu",
            render: (_, record) => {
                return <>
                    <Button onClick={() => handleDelete(record.key)} style={{ height: 50, backgroundColor: 'red', color: 'white', borderRadius: 5 }}><MdDelete size={30} /></Button>
                </>;
            }
        },
    ]

    //CTSP
    const [optionsCTSP, setOptionsCTSP] = useState([]);
    useEffect(() => {
        loadCTSP();
    }, []);
    const loadCTSP = async () => {
        const result = await axios.get("http://localhost:8080/ctsp/show", {
            validateStatus: () => {
                return true;
            }
        });
        setOptionsCTSP(result.data);
    };

    const addCTSanPham = () => {
        const chekTrung = (code) => {
            return optionsCTSP.some(ctsp => ctsp.tenCt === code);
        };

        for (let i = 0; i < tableData.length; i++) {
            if (chekTrung(tableData[i].tenCt)) {
                toast.error('Sản phẩm "' + tableData[i].tenCt + '" đã tồn tại', {
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

        for (let i = 0; i < tableData.length; i++) {
            if (tableData[i].ghiChu == null) {
                toast.error('Không để trống ảnh!', {
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

        for (let i = 0; i < tableData.length; i++) {
            axios.post('http://localhost:8080/ctsp/add', tableData[i])
                .then(response => {
                    console.log(response.data);
                    loadCTSP();
                    loadSP();
                    form1.resetFields();
                    form.resetFields();
                    setTableData([])
                })
                .catch(error => console.error('Error adding item:', error));
        }

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
    const [ten, setTenMaus] = useState('');
    const doiMau = (e) => {
        const ma = e.target.value;
        const hexCode = ma.replace("#", "").toUpperCase();
        const rgb = convert.hex.rgb(hexCode);
        const colorName = convert.rgb.keyword(rgb);
        if (colorName === null) {
            console.log("hehe")
        } else {
            console.log(colorName);
            setTenMaus(colorName);
        }
    };

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
        const chekTrung = (code) => {
            return msData.some(color => color.ma === code);
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
                    loadMS();
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
                                    hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên sản phẩm!', },]}>
                                    <Select
                                        onChange={onChangeSP}
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
                                                value={item.ten}>
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
                                hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống mô tả!', },]}>
                                <TextArea rows={5} value={dataMoTa} onChange={onChangeMT} placeholder='Nhập mô tả sản phẩm' className='w-75' />
                            </Form.Item>
                            {/* Chất liệu & Hãng */}
                            <div className='row'>
                                <div className='col'>
                                    {/* Chất Liệu */}
                                    <div className='row'>
                                        <Form.Item className='col' style={{ paddingLeft: 180, height: 10 }} name='chatLieu' label={<b>Chất liệu </b>}
                                            hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống chất liệu !', },]}>
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }} onChange={onChangeCL}>
                                                {cl.map(item => (
                                                    <Select.Option key={item.id} value={item.ten}>
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
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }} className='me-2' onChange={onChangeH}>
                                                {h.map(item => (
                                                    <Select.Option key={item.id} value={item.ten}>
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
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }} className='me-2' onChange={onChangeDG}>
                                                {dc.map(item => (
                                                    <Select.Option key={item.id} value={item.ten}>
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
                                            <Select placeholder="Chọn một giá trị" style={{ width: 250 }} className='me-2' onChange={onChangeDM}>
                                                {dm.map(item => (
                                                    <Select.Option key={item.id} value={item.ten}>
                                                        {item.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>

                                        </Form.Item>
                                        <Form.Item style={{ paddingLeft: 100 }}>
                                            <Button style={{ width: 250, height: 30, }} className='bg-success text-white w-1' onClick={() => setOpenDM(true)}><b>Thêm danh mục</b></Button>
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
                            <div className='row' style={{ paddingLeft: 219 }}>
                                <div className='col'>
                                    <Form.Item label={<b>Kích thước </b>} name="kichThuoc"
                                        hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống kích thước!', },]}>
                                        <Select style={{
                                            width: 650,
                                            height: '50px'
                                        }}
                                            mode="multiple"
                                            placeholder="Chọn một giá trị"
                                            className='me-2'
                                            onChange={onChangeKT}
                                        >
                                            {ktData.map(item => (
                                                <Select.Option key={item.id} value={item.ten}>
                                                    {item.ten}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='col' style={{ paddingLeft: 150, paddingTop: 10 }}>
                                    <Form.Item>
                                        <Button className='bg-success text-white w-1' onClick={() => setOpenKT(true)}> + </Button>
                                        <Modal
                                            title="Thêm Kích Thước"
                                            centered
                                            open={openKT}
                                            onOk={() => setOpenKT(false)}
                                            onCancel={() => setOpenKT(false)}
                                            footer={[
                                                <Button onClick={() => setOpenKT(false)}>Hủy</Button>,
                                                <Button type="primary" onClick={() => {
                                                    Modal.confirm({
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
                            </div>
                            {/* Màu Sắc */}
                            <div className='row' style={{ paddingLeft: 219 }}>
                                <div className='col'>
                                    <Form.Item label={<b>Màu sắc </b>} name="mauSac" hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống màu sắc!', },]}>
                                        <Select style={{
                                            width: 650,
                                            height: '50px'
                                        }}
                                            mode="multiple"
                                            placeholder="Chọn một giá trị"
                                            className='me-2'
                                            onChange={onChangeMS}
                                        >
                                            {msData.map(item => (
                                                <Select.Option key={item.id} value={item.ma}>
                                                    {item.ten}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='col' style={{ paddingLeft: 150, paddingTop: 10 }}>
                                    <Form.Item>
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
                                                onFinish={addMauSac}
                                                form={form1}>
                                                <Form.Item label="Màu" name='ma' hasFeedback rules={[{ required: true, message: 'Vui lòng chọn màu', },]} >
                                                    <Input className="border" type="color" onChange={doiMau} />
                                                </Form.Item>
                                                <Form.Item label=" Mã" name='ma' hasFeedback rules={[{ required: true, message: '', },]} >
                                                    <Input readOnly="true" className="border" type="text" />
                                                </Form.Item>
                                                <Form.Item label="Tên" hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                                                    <Input
                                                        type='text'
                                                        value={ten}
                                                        readOnly />
                                                </Form.Item>
                                            </Form>
                                        </Modal>
                                    </Form.Item>
                                </div>
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
                                            centered: 'true',
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
                            <Table dataSource={tableData} rowKey={"key"} columns={columns}></Table>
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