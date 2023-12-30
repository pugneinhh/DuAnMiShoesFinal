import React, { useState, useEffect, Text, View, Component , } from "react";
import axios from "axios";
import {
  Table,
  Tag,
  Form,
  Input,
} from "antd";
import "./KhuyenMai.scss";

const TableSanPham = ({onSelectedSanPham , suaIDSP}) => {
    const [sanPham, setSanPhams] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const loadSanPham = async () => {
            await axios.get("http://localhost:8080/san-pham")
            .then(response =>{

              setSanPhams(response.data)
            })
            .catch(error => console.error('Error adding item:', error));
          };
          loadSanPham();
      }, []);
     

      const handleCheckboxChange = (selectedKeys , selectedRowKeys) => {
        console.log("selected row key",selectedRowKeys);
      if (selectedRowKeys !== null){
        setSelectedRowKeys(selectedKeys);
        onSelectedSanPham(selectedKeys);

      };
    }

      const columnsSanPham = [

        {
          title: "#",
          dataIndex: "idSP",
          key: "idSP",
          render: (id, record, index) => {
            ++index;
            return index;
          },
          showSorterTooltip: false,
        },
        {
          title: "Mã",
          dataIndex: "ma",
          key: "ma",
          sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
        },
        {
          title: "Tên",
          dataIndex: "ten",
          key:"ten",
        },
        {
          title: "Số lượng",
          dataIndex: "soLuong",
          key:"soLuong",
        },
        {
          title: "Trạng thái",
          dataIndex: "trangThai",
          key: "trangThai",
          render: (trangThai) => (
            <>
              {trangThai === "0" ? (
                <Tag
                  color="#87d068
                    "
                >
                  Đang bán
                </Tag>
              ) : (
                <Tag
                  color="#f50
                    "
                >
                  Hết hàng
                </Tag>
              )}
            </>
          ),
        },
      ];

      const handleCancel = (selectedKey) => {
        const response =  axios.delete(`http://localhost:8080/san-pham/${selectedKey}`)
        .then (response => {
          console.log("Xóa ",selectedKey);
          console.log("Còn lại",selectedRowKeys.filter(row => row !== selectedKey));
          setSelectedRowKeys(selectedRowKeys.filter(row => row !== selectedKey))
          onSelectedSanPham(selectedRowKeys.filter(row => row !== selectedKey));

        })
        .catch(error => console.error('Error deleting product:', error));



      };




      const rowSelection = {
        selectedRowKeys,   
        onChange: handleCheckboxChange,
        // getCheckboxProps : record => ({        
        //   disabled: selectedRowKeys.includes(record.key)}),
      };



      const dataSource = sanPham.map((item, index) => ({
        key: item.idSP,
        checkbox: ++index,
        idSP: item.idSP,
        ma: item.ma,
        ten: item.ten,
        soLuong: item.soLuong,
        trangThai: item.trangThai,      
      }));

     
      return (
        <div className="container">
          <Form>
            <Form.Item label="Tìm kiếm" name="key">
              <Input placeholder="Tìm kiếm"  className="rounded-pill border-warning"/>
            </Form.Item>
          </Form>

        <Table
        rowSelection={rowSelection}
        columns={columnsSanPham}
        dataSource={dataSource}  
        pagination={{
          showQuickJumper: true,
          defaultCurrentPage:1, 
          defaultPageSize:5,
          total: dataSource.length,
        }}
       /> 
        </div>

      );
};

export default TableSanPham;


