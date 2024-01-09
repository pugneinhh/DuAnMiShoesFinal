import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Divider,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { FilterFilled, UnorderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoInformation } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { BsMap } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

export default function KhachHang() {
  const [khachHang, setKhachHang] = useState([]);

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    loadKhachHang();
  }, []);

  const loadKhachHang = async () => {
    const result = await axios.get("http://localhost:8080/khach-hang", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setKhachHang(result.data);
    }
    console.log(result.data);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "idND",
      key: "idND",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSortTooltip: false,
    },
    {
      title: "Mã Khách Hàng",
      dataIndex: "maND",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "tenND",
      sorter: (a, b) => a.ten - b.ten,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      sorter: (a, b) => a.cccd - b.cccd,
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      sorter: (a, b) => a.SDT - b.SDT,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      sorter: (a, b) => a.ngaySinh - b.ngaySinh,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai == 0 ? (
            <Tag color="red">
               Không hoạt động
            </Tag>
          ) : (
            <Tag color="green">
              Hoạt động
            </Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Hoạt động",
          value: "0",
        },
        {
          text: "Không Hoạt động",
          value: "1",
        },
      ],
      onFilter: (value, record) => record.trangThai.toString() === value,
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (record) => (
        <Space size="middle">
          <a>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<IoInformation size={15} />}
              onClick={() => {}}
            />
          </a>
          <a>
            <Button
              type="primary"
              className="btn btn-success text-center"
              shape="circle"
              icon={<BsPencilSquare size={15} />}
              onClick={() => {}}
            />
          </a>
          <a>
            <Button
              type="primary"
              className="btn btn-warning text-center"
              shape="circle"
              icon={<BsMap size={15} />}
              onClick={() => {}}
            />
          </a>
        </Space>
      ),
      center: "true",
    },
  ];

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [bordered] = useState(false);
  const [size] = useState("large");
  const [expandable] = useState(undefined);
  const [showHeader] = useState(true);
  const [hasData] = useState(true);
  const [tableLayout] = useState();
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");
  const [ellipsis] = useState(false);
  const [yScroll] = useState(false);
  const [xScroll] = useState();

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps = {
    bordered,
    size,
    expandable,
    showHeader,
    scroll,
    tableLayout,
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <Divider orientation="left" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <FaTag size={20} />
            Quản lý khách hàng
          </h4>
        </Divider>
        {/* form tìm kiếm */}
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
            className="row col-md-12"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            // onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
            form={form}
          >
            <div className="col-md-4">
              <Form.Item label="Tìm kiếm" name="tenVoucher">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập mã hoặc tên hoặc sđt ..."
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Trạng thái" name="trangThaiVoucher">
                <Select
                  defaultValue={"Tất cả"}
                  style={{ borderColor: "yellow" }}
                >
                  <Select.Option value="0">Hoạt động</Select.Option>
                  <Select.Option value="1">Không hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="text-end ">
              <Button type="primary" htmlType="reset">
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* hết form tìm kiếm */}
        {/* view add nhân viên */}
        <div className=" text-end mt-3">
          <Link
            to="#"
            className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill"
          >
            {" "}
            <PlusCircleOutlined /> Thêm{" "}
          </Link>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <div>
          <Table
            {...tableProps}
            pagination={{
              showQuickJumper: true,
              position: [top, bottom],
              defaultPageSize: 5,
              defaultCurrent: 1,
              total: 100,
            }}
            columns={tableColumns}
            dataSource={hasData ? khachHang : []}
            scroll={scroll}
          />
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
    </div>
  );
}
