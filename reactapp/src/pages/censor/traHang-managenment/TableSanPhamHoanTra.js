import React, { useEffect } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteNewBill, GetNewBill, LoadNewBill,UpdateGhiChuBill } from "../../../store/reducer/NewBill.reducer";
import { FormattedNumber, IntlProvider } from "react-intl";

const TableSanPhamHoanTra = ({ onSelectedSP, sanPhamHoanTra }) => {
  const dispatch= useDispatch();
  let newBill = useSelector(GetNewBill);


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
        tongTien: parseFloat(item.soLuongHienTai) * parseFloat(item.donGia),
        ghiChu:null,
      }))
    })
  
  }, [sanPhamHoanTra]);


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
      // render:(record)=>(
      //   <Badge color="#b5b5b5" count={record.soLuong}></Badge>
      // )
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
      render: (donGia) => {
        return (
          <IntlProvider locale="vi-VN">
            <div>
              <FormattedNumber
                value={donGia}
                // style="currency"
                currency="VND"
                minimumFractionDigits={0}
              />
              {" VND"}
            </div>
          </IntlProvider>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (tongTien) => {
        return (
          <IntlProvider locale="vi-VN">
            <div>
              <FormattedNumber
                value={tongTien}
                // style="currency"
                currency="VND"
                minimumFractionDigits={0}
              />
              {" VND"}
            </div>
          </IntlProvider>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "idHDCT",
      key: "idHDCT",
      render: (record) => {
        return (
          <Input
            placeholder="Ghi chú"
            onChange={(e) => {
              dispatch(
                UpdateGhiChuBill({
                  key: record,
                  ghiChu: e.target.value,
                })
              );
            }}
          />
        );
      },
    },
  ];




  return (
    <div className="container">
      <Table
        columns={columnsKhachHang}
        dataSource={newBill}
        pagination={false}
      />
    </div>
  );
};

export default TableSanPhamHoanTra;
