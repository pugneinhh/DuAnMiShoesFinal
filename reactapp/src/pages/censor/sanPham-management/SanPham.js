import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Slider,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Badge,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTshirt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SanPham.css";
import { ChiTietSanPhamAPI } from "../api/SanPham/chi_tiet_san_pham.api";
import { SanPhamAPI } from "../api/SanPham/sanPham.api";
import { alignPropType } from "react-bootstrap/esm/types";

export default function SanPham() {
  //Form
  const nav = useNavigate();
  const [soLuongBatDau, setSoLuongBatDau] = useState(100);
  const [soLuongKetThuc, setSoLuongKetThuc] = useState(900);
  const themSP = (res) => {
    console.log(res);

    nav("/admin-them-san-pham");
  };
  const [selectedValue, setSelectedValue] = useState("1");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };

  const onChange = (value) => {
    setSoLuongBatDau(value[0]);
    setSoLuongKetThuc(value[1]);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues);
    timKiemCT(allValues);
  };
  const timKiemCT = (dataSearch) => {
    SanPhamAPI.search(dataSearch)
      .then((response) => {
        setSanPhams(response.data);
        console.log(response.data);
        console.log(response.data.lenght);
      })
      .catch((error) => console.error("Error adding item:", error));
  };
  //Table
  const [sanPham, setSanPhams] = useState([]);
  const [listMS, setListMs] = useState([]);
  const [listKT, setListKt] = useState([]);

  const loadListMauSac = (id) => {
    if (!listMS[id]) {
      SanPhamAPI.getListMauSacBySanPhamId(id).then((res) => {
        setListMs((prevListMS) => ({
          ...prevListMS,
          [id]: res.data,
        }));
      });
    }
  };
  
  const loadListKichThuoc = (id) => {
    if (!listKT[id]) {
      SanPhamAPI.getListKichThuocBySanPhamId(id).then((res) => {
        setListKt((prevListKT) => ({
          ...prevListKT,
          [id]: res.data,
        }));
      });
    }
  };

  const loadSanPham = () => {
    SanPhamAPI.getAll().then((res) => {
      setSanPhams(res.data);
      res.data.forEach((sp) => {
        loadListMauSac(sp.idSP);
        loadListKichThuoc(sp.idSP);
      });
    });
  };

  useEffect(() => {
    loadSanPham();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "idSP",
      align: "center",
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
      align: "center",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Màu sắc",
      key: "mauSac",
      align: "center",
      width: 120,
      render: (record) => {
        const mauSacList = listMS[record.idSP] || [];
        return (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {mauSacList.map((mau, index) => (
              <div key={index} style={{ width: '50%', padding: '0.5rem' }}>
              <Tag 
              style={{
                width: 40,
                height:20,
                border: '1px solid #C6C5C5',
                borderColor: '#C6C5C5',  }} 
                color={mau}>
              </Tag>
             </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Kích thước",
      key: "kichThuoc",
      align: "center",
      width: 120,
      render: (record) => {
        const kichThuocList = listKT[record.idSP] || [];
        return (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {kichThuocList.map((kt, index) => (
               <div key={index} style={{ width: '50%', padding: '0.5rem' }}>
              <Tag
              style={{
                textAlign: "center",
                width: 40,
                height:20,
                backgroundColor: "white",
                border: '1px solid #C6C5C5',
                borderColor: '#C6C5C5',  }} 
                >
                  {kt}
              </Tag>
             </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      align: "center"
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">Còn bán</Tag>
          ) : (
            <Tag color="red">Dừng bán</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      dataIndex: "idSP",

      render: (title) => (
        <Space size="middle">
          <a>
            <Link to={`/admin-showct/${title}`} className="btn btn-danger">
              <BsFillEyeFill className="mb-1" />
            </Link>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <FaTshirt size={35} /> Quản lý sản phẩm
          </h4>
        </Divider>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <FilterFilled size={30} /> Bộ lọc
          </h5>
          <hr />
          <Form
            className="row"
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
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
          >
            <div className="col-md-4">
              <Form.Item label="Tên & Mã" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập tên hoặc mã"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                placeholder="Chọn trạng thái"
                label="Trạng Thái"
                name="trangThai"
              >
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Số lượng" name="soLuong">
              <Slider
                    range
                    step={100}
                    defaultValue={[100, 1000]}
                    min={100}
                    max={1000}
                    onChange={onChange}
                  />
              </Form.Item>
            </div>
            <Form.Item className="text-center" style={{ paddingLeft: 200 }}>
              <Button
                type="primary"
                htmlType="reset"
                onClick={loadSanPham}
                icon={<RetweetOutlined />}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end">
          <button onClick={themSP} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm sản phẩm{" "}
            </span>
          </button>
        </div>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <BookFilled size={30} /> Danh sách sản phẩm
          </h5>
          <hr />
          <div className="ms-3"></div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={sanPham}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: 100,
                }}
              />
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
  );
}
