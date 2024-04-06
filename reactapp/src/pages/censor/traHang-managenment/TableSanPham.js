import React, { useState, useEffect } from "react";
import { Table, Form, InputNumber,Button } from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";


const TableSanPham = ({ onSelectedSP, sanPhamHDCT }) => {
  const [form] = Form.useForm();
  const [khachHang, setKhachHangs] = useState([]);
  const [currentQuantity, setCurrentQuantity] = useState(0);
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

  // useEffect(() => {
  //   setSelectedRowKeys(sanPhamHDCT);
  //   onSelectedSP(sanPhamHDCT);
  // }, [sanPhamHDCT]);

  const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
    if (selectedRowKeys !== null) {
      setSelectedRowKeys(selectedKeys);
      onSelectedSP(selectedKeys);
    }
  };
  const handleIncrease=()=>{
      setCurrentQuantity(currentQuantity+1);
  }
  const handleDecrease=(value)=>{
    setCurrentQuantity(currentQuantity-1);
}
  const columnSanPham = [
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
      render: (text, record) => (
        <Form layout="inline">
          <Form.Item label="Số lượng:">
            <Button type="primary" onClick={handleDecrease} disabled={currentQuantity === 0}>
              -
            </Button>
            <InputNumber
              value={currentQuantity}
              min={0}
              max={record.soLuong}
              style={{ margin: '0 16px' }}
              readOnly
            />
            <Button type="primary" onClick={handleIncrease} disabled={currentQuantity === record.soLuong}>
              +
            </Button>
          </Form.Item>
          <Form.Item>
            {currentQuantity}/{record.soLuong}
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleCheckboxChange,
  };

  const dataSource = sanPhamHDCT.map((item, index) => ({
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
      <Table
      rowSelection={{
        ...rowSelection,
        getCheckboxProps: (record) => ({
          disabled: record.disabled, // Sử dụng thuộc tính disabled trong getCheckboxProps
        }),
      }}
        defaultSelectedRowKeys={selectedRowKeys}
        columns={columnSanPham}
        dataSource={dataSource}
        pagination={false}
      />
   
  );
};

export default TableSanPham;
