import React, { useState, useEffect, Text, View, Component , } from "react";
import axios from "axios";
import {
  Table,
  Tag,
  Form,
  Input,
} from "antd";


const TableKhachHang = () => {
    const [khachHang, setKhachHangs] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const loadKhachHang = async () => {
            const result = await axios.get("http://localhost:8080/khach-hang", {
              validateStatus: () => {
                return true;
              },
            });
            if (result.status === 302) {
              setKhachHangs(result.data);
            }
          };
          loadKhachHang();
      }, []);
     
      const handleCheckboxChange = (selectedKeys , selectedRowKeys) => {
    //   if (selectedRowKeys !== null){
    //     setSelectedRowKeys(selectedKeys);
    //     onSelectedSanPham(selectedKeys);

    //   };
    }

      const columnsKhachHang= [

        {
          title: "#",
          dataIndex: "idKH",
          key: "idKH",
          render: (id, record, index) => {
            ++index;
            return index;
          },
          showSorterTooltip: false,
        },
        {
          title: "Mã",
          dataIndex: "maKH",
          key: "maKH",
          sorter: (a, b) => a.maKH.slice(2) - b.maKH.slice(2),
        },
        {
          title: "Tên",
          dataIndex: "tenKH",
          key:"tenKH",
        },
        {
          title: "Ảnh",
          dataIndex: "anh",
          key:"anh",
        },
        {
          title: "Số điện thoại",
          dataIndex: "sdt",
          key: "sdt",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
      ];



      const rowSelection = {
        selectedRowKeys,      
        onChange: handleCheckboxChange,
        
        // onCancel: () => handleCancel,
      };



      const dataSource = khachHang.map((item, index) => ({
        key: item.idKH,
        checkbox: ++index,
        idKH: item.idKH,
        maKH: item.maKH,
        tenKH: item.tenKH,
        anh: item.anh,
        sdt: item.sdt,      
        email : item.email
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
        columns={columnsKhachHang}
        dataSource={dataSource}  
        pagination={{ defaultPageSize: 5 }}
       /> 
        </div>

      );
};

export default TableKhachHang;


