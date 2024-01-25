import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
} from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";

const TableKhachHang = ({onSelectedKH,suaKH}) => {
    const [khachHang, setKhachHangs] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const loadKhachHang =  () => {
             KhachHangAPI.getAll().then((result) => {
              setKhachHangs(result.data);
              console.log("khacgs",result.data);
          
        });
      }
          loadKhachHang();
      }, []);
     

      useEffect(() => {
        setSelectedRowKeys(suaKH);
        onSelectedKH(suaKH);
      },[suaKH]);

      
      const handleCheckboxChange = (selectedKeys , selectedRowKeys) => {
      if (selectedRowKeys !== null){
        setSelectedRowKeys(selectedKeys);
        onSelectedKH(selectedKeys);
      

      };
    }

      const columnsKhachHang= [

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
          title: "Mã",
          dataIndex: "maND",
          key: "maND",
          sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
        },
        {
          title: "Tên",
          dataIndex: "tenND",
          key:"tenND",
        },
        {
          title: "Điểm",
          dataIndex: "diem",
          key:"diem",
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
      };


      const dataSource = khachHang.map((item, index) => ({
        key: item.idND,
       // checkbox: ++index,
        idND: item.idND,
        maND: item.maND,
        tenND: item.tenND,
        diem: item.diem,
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
        defaultSelectedRowKeys={selectedRowKeys}
        columns={columnsKhachHang}
        dataSource={dataSource}  
        pagination={{ defaultPageSize: 5 }}
       /> 
        </div>

      );
};

export default TableKhachHang;


