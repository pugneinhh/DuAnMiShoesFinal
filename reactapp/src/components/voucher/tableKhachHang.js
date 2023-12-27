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
            const result = await axios.get("http://localhost:8080/nguoi-dung/hien-thi", {
              validateStatus: () => {
                return true;
              },
            });
            if (result.status === 302) {
              setKhachHangs(result.data);
              console.log(result.data);
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
          dataIndex: "id",
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
          key: "ma",
          sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
        },
        {
          title: "Tên",
          dataIndex: "ten",
          key:"ten",
        },
        {
          title: "Điểm",
          dataIndex: "diem",
          key:"diem",
        },
        {
          title: "Số điện thoại",
          dataIndex: "soDienThoai",
          key: "soDienThoai",
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
      console.log(khachHang);


      const dataSource = khachHang.map((item, index) => ({
        key: item.id,
        checkbox: ++index,
        id: item.id,
        ma: item.ma,
        ten: item.ten,
        diem: item.diem,
        soDienThoai: item.soDienThoai,      
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


