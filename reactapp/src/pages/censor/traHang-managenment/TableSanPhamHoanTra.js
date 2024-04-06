import React, { useState, useEffect } from "react";
import { Table, Form, Input } from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";

const TableSanPhamHoanTra = ({ onSelectedSP, sanPhamHoanTra }) => {
  const [form] = Form.useForm();
  const [khachHang, setKhachHangs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");

  // const loadKhachHang = () => {
  //   KhachHangAPI.getAll().then((result) => {
  //     setKhachHangs(result.data);
  //   });
  // };

  // useEffect(() => {
  //   loadKhachHang();
  // }, []);

  // const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
  //   if (selectedRowKeys !== null) {
  //     setSelectedRowKeys(selectedKeys);
  //     onSelectedSP(selectedKeys);
  //   }
  // };

  const columnsKhachHang = [
    {
      title: "#",
      dataIndex: "idHDCT",
      key: "idHDCT",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Sản phẩm",
      dataIndex: "tenSP",
      key: "tenSP",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
    },
    {
      title: "Tổng tiền",
      dataIndex: "diem",
      key: "diem",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    // onChange: handleCheckboxChange,
  };

  const dataSource = sanPhamHoanTra.map((item, index) => ({
    key: item.idHDCT,
    idSP:item.idCTSP,
    tenSP: item.tenSP,
    soLuong: item.soLuong,
    donGia: item.giaSauGiam,
    tenMS:item.tenMS,
    tenKT:item.tenKT,
    idHDCT:item.idHDCT,
    giaTriKhuyenMai: item.giaTriKhuyenMai,
    giaGiam:item.giaGiam,
    disabled: item.giaTriKhuyenMai !== null,
  }));

  return (
    <div className="container">
      <Table
        rowSelection={rowSelection}
        defaultSelectedRowKeys={selectedRowKeys}
        columns={columnsKhachHang}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
};

export default TableSanPhamHoanTra;
