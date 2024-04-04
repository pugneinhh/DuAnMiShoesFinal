import React, { useState, useEffect } from "react";
import { Table, Form, Input } from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";


const TableSanPham = ({ onSelectedSP, suaKH }) => {
  const [form] = Form.useForm();
  const [khachHang, setKhachHangs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");

  const loadKhachHang = () => {
    KhachHangAPI.getAll().then((result) => {
      setKhachHangs(result.data);
    });
  };

  useEffect(() => {
    loadKhachHang();
  }, []);

  useEffect(() => {
    setSelectedRowKeys(suaKH);
    onSelectedSP(suaKH);
  }, [suaKH]);

  const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
    if (selectedRowKeys !== null) {
      setSelectedRowKeys(selectedKeys);
      onSelectedSP(selectedKeys);
    }
  };

  const columnsKhachHang = [
    {
      title: "#",
      dataIndex: "idND",
      key: "idND",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Sản phẩm",
      dataIndex: "maND",
      key: "maND",
   
    },
    {
      title: "Số lượng",
      dataIndex: "tenND",
      key: "tenND",
    },
    {
      title: "Đơn giá",
      dataIndex: "diem",
      key: "diem",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleCheckboxChange,
  };

  const dataSource = khachHang.map((item, index) => ({
    key: item.idND,
    // checkbox: ++index,
    idND: item.idND,
    maND: item.maND,
    tenND: item.tenND,
    diem: item.diem,
    sdt: item.sdt,
    email: item.email,
  }));

  return (
   
      <Table
        rowSelection={rowSelection}
        defaultSelectedRowKeys={selectedRowKeys}
        columns={columnsKhachHang}
        dataSource={dataSource}
        pagination={false}
      />
   
  );
};

export default TableSanPham;
