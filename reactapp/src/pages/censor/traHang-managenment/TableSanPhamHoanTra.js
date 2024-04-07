import React, { useState, useEffect } from "react";
import { Table, Form, Input } from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";
import { useDispatch, useSelector } from "react-redux";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";
import { DeleteNewBill, GetNewBill, LoadNewBill } from "../../../store/reducer/NewBill.reducer";

const TableSanPhamHoanTra = ({ onSelectedSP, sanPhamHoanTra }) => {
  const [form] = Form.useForm();
  const [khachHang, setKhachHangs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");
  const dispatch= useDispatch();
  let newBill = useSelector(GetNewBill);
  let totalNewBill = newBill.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.tongTien;
  }, 0);; // đây là tổng tiền của bill mới
  console.log("sanPhamHoanTra",sanPhamHoanTra);
  console.log("newBill",newBill);
  console.log("Tổng tiền bill",totalNewBill);
  // const loadKhachHang = () => {
  //   KhachHangAPI.getAll().then((result) => {
  //     setKhachHangs(result.data);
  //   });
  // };

  useEffect(() => {
    dispatch(DeleteNewBill());

    sanPhamHoanTra.map((item) => {
      dispatch(LoadNewBill({
        key: item.idHDCT,
        idCTSP:item.idCTSP,
        tenSP: item.tenSP,
        soLuong: item.soLuongHienTai,
        donGia: item.donGia,
        tenMS:item.tenMS,
        tenKT:item.tenKT,
        idHDCT:item.idHDCT,
        tongTien: parseFloat(item.soLuongHienTai) * parseFloat(item.donGia)
      }))
    })
  
  }, [sanPhamHoanTra]);

  // const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
  //   if (selectedRowKeys !== null) {
  //     setSelectedRowKeys(selectedKeys);
  //     onSelectedSP(selectedKeys);
  //   }
  // };

  const columnsKhachHang = [
    {
      title: "#",
      dataIndex: "idCTSP",
      key: "idCTSP",
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
      dataIndex: "tongTien",
      key: "tongTien",
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
    soLuong: item.soLuongHienTai,
    donGia: item.donGia,
    tenMS:item.tenMS,
    tenKT:item.tenKT,
    idHDCT:item.idHDCT,
    giaTriKhuyenMai: item.giaTriKhuyenMai,
    giaGiam:item.giaGiam,
    disabled: item.giaTriKhuyenMai !== null,
    tongTien: parseFloat(item.soLuongHienTai) * parseFloat(item.donGia)
  }));

  return (
    <div className="container">
      <Table
        rowSelection={rowSelection}
        defaultSelectedRowKeys={selectedRowKeys}
        columns={columnsKhachHang}
        dataSource={newBill}
        pagination={false}
      />
    </div>
  );
};

export default TableSanPhamHoanTra;
