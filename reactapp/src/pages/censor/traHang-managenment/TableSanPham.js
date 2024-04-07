import React, { useState, useEffect } from "react";
import { Table, Form, InputNumber, Button } from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAll,
  GetReturnBill,
  LoadReturnBill,
  ReloadReturnBill,
  UpdateReturnBill,
} from "../../../store/reducer/ReturnBill.reducer";
import { UpdateNewBill } from "../../../store/reducer/NewBill.reducer";

const TableSanPham = ({ onSelectedSP, sanPhamHDCT }) => {
  const [form] = Form.useForm();
  const [khachHang, setKhachHangs] = useState([]);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");
  const dispatch = useDispatch();
  let returnHoaDon = useSelector(GetReturnBill);
  console.log("sanPhamHDCT", sanPhamHDCT);
  console.log("selected row keys",selectedRowKeys);
  const loadKhachHang = () => {
    KhachHangAPI.getAll().then((result) => {
      setKhachHangs(result.data);
    });
  };

  useEffect(() => {
    loadKhachHang();
  }, []);
  useEffect(() => {
    dispatch(ReloadReturnBill());
    sanPhamHDCT.map((item) =>
      dispatch(
        LoadReturnBill({
          key: item.idHDCT,
          idHD: item.idHD,
          idCTSP: item.idCTSP,
          tenSP: item.tenSP,
          soLuong: item.soLuong,
          donGia: item.giaSauGiam,
          soLuongHienTai: 0,
          tenMS: item.tenMS,
          tenKT: item.tenKT,
          idHDCT: item.idHDCT,
          giaTriKhuyenMai: item.giaTriKhuyenMai,
          giaGiam: item.giaGiam,
        })
      )
    );
  }, [sanPhamHDCT]);
  // useEffect(() => {
  //   setSelectedRowKeys(sanPhamHDCT);
  //   onSelectedSP(sanPhamHDCT);
  // }, [sanPhamHDCT]);

  const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
    // if (selectedRowKeys.indexOf(item => item.soLuongHienTai === 0) !== -1) {
    //   console.log("số lượng k đc = 0");
    //   return;
    // }
    if (selectedRowKeys !== null) {
      setSelectedRowKeys(selectedKeys);
      onSelectedSP(selectedRowKeys);
    }
  };
  const handleIncrease = (idHDCT, soLuong) => {
    console.log("record" + soLuong);
    dispatch(UpdateReturnBill({ key: idHDCT, soLuongHienTai: soLuong + 1 }));
  };
  const handleDecrease = (idHDCT, soLuong) => {
    console.log("record" + soLuong);

    // dispatch(UpdateReturnBill({key:record.idHDCT,soLuongHienTai:record.soLuongHienTai-1}))
  };
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
            <Button
              type="primary"
              onClick={() =>
                {
                dispatch(
                  UpdateReturnBill({
                    key: record.idHDCT,
                    soLuongHienTai: record.soLuongHienTai - 1,
                  })
                ) ;
          
                (dispatch(UpdateNewBill({key:record.idHDCT,soLuong:record.soLuongHienTai - 1}))) 
                
              }
            }
              disabled={record.soLuongHienTai === 0}
            >
              -
            </Button>
            <InputNumber
              value={record.soLuongHienTai}
              min={0}
              max={record.soLuong}
              style={{ margin: "0 16px" }}
              readOnly
            />
            <Button
              type="primary"
              onClick={() =>
                {
                dispatch(
                  UpdateReturnBill({
                    key: record.idHDCT,
                    soLuongHienTai: record.soLuongHienTai + 1,
                  })
                ) ;
                
                (dispatch(UpdateNewBill({key:record.idHDCT,soLuong:record.soLuongHienTai + 1}))) 
                
              }
            }
              disabled={record.soLuongHienTai === record.soLuong}
            >
              +
            </Button>
          </Form.Item>
          <Form.Item>
            {record.soLuongHienTai}/{record.soLuong}
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
    idSP: item.idCTSP,
    tenSP: item.tenSP,
    soLuong: item.soLuong,
    donGia: item.giaSauGiam,
    tenMS: item.tenMS,
    tenKT: item.tenKT,
    idHDCT: item.idHDCT,
    giaTriKhuyenMai: item.giaTriKhuyenMai,
    giaGiam: item.giaGiam,
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
      dataSource={returnHoaDon}
      pagination={false}
    />
  );
};

export default TableSanPham;
