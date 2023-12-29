import { Button, DatePicker, Divider, Form, Input, InputNumber, Modal, Popconfirm, Select, Slider, Switch, Table, Tag } from "antd";
import axios from "axios";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { InfoCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from 'moment';
import { toast } from "react-toastify";
// import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Switch } from "antd";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import moment from 'moment';
// import { toast } from "react-toastify";


const ModalSanPham = (props) => {
    const { openSanPham, setOpenSanPham } = props;


    const handleClose = () => {
        setOpenSanPham(false);
        console.log("đóng")
    };

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
            dataIndex: "id",
            key: "id",
            render: (id, record, index) => {
                ++index;
                return index;
            },
            showSorterTooltip: false,
        },
        {
            title: "Ảnh",
            dataIndex: "tenSP",
            center: "true",
            sorter: (a, b) => a.ma - b.ma,
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "tenSP",
            center: "true",
            sorter: (a, b) => a.ma - b.ma,
        },
      
        {
            title: "Số Lượng",
            dataIndex: "soLuong",
        },
        {
            title: "Kích thước",
            dataIndex: "soLuong",
        },
        {
            title: "Màu sắc",
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


        },
    ]
    return (
        <Modal
            title="Sản phẩm"
            centered
            open={openSanPham}
            onCancel={handleClose}
            footer={
                <button className="btn btn-primary" onClick={handleClose}>Hủy</button>
            }
            width={1100}
            height={600}
        >
        
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
                                <Table className='text-center'  columns={columns} pagination={{
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
        </Modal>
    )
}
export default ModalSanPham;