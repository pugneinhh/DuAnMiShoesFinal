import React, { useState, useEffect } from "react";
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
              console.log("idSP  =", suaIDSP);
              setSelectedRowKeys(suaIDSP);
              onSelectedSanPham(suaIDSP);
            })
            .catch(error => console.error('Error adding item:', error));
          };

          loadSanPham();
      }, [suaIDSP]);
     
      // useEffect(() =>{
      //   setSelectedRowKeys(suaIDSP);
      //   onSelectedSanPham(suaIDSP); 
      // },[]);
      
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


      const rowSelection = {
        selectedRowKeys,
        // type : 'checkbox',
        onChange: handleCheckboxChange,
        // selectedRowKeys : selectedRowKeys,
       // defultSelectedRowKeys : suaIDSP
      };



      const dataSource = sanPham.map((item, index) => ({
        key: item.idSP,
       // checkbox: ++index,
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
        defaultSelectedRowKeys={selectedRowKeys}
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


