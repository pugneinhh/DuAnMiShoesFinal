import React, { useState, useEffect, Text, View } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Tag,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Divider,
  Modal,
} from "antd";
import "./KhuyenMai.scss";
import {
  EyeOutlined,
  PlusCircleOutlined,
  StopOutlined,
  UnorderedListOutlined,
  FilterFilled,
  SearchOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { LuBadgePercent } from "react-icons/lu";
import moment from "moment";
import { Link } from "react-router-dom";
import ThemKhuyenMai from "./ThemKhuyenMai";
import SuaKhuyenMai from "./SuaKhuyenMai";
import { IoInformation } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const KhuyenMai = () => {
  const currentTime = moment(); // thời gian hiện tại
  const [dataGoc, setDataGoc] = useState([]);
  const [dataSearchResult, setDataSearchResult] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const onChangeFilter=(changedValues, allValues)=>{

    console.log("hi",changedValues);
    // console.log("gtri",value);
    setDataSearch(allValues);
    // setDataSearch(e);
    console.log(dataSearch);
    timKiemKhuyenMai(dataSearch);


    // if (allValues === null) loadKhuyenMai();
  }
  //call api tìm kiếm
  const timKiemKhuyenMai=(dataSearch)=>{
    axios.post('http://localhost:8080/khuyen-mai/search-khuyen-mai',dataSearch)
    .then(response => {
        // Update the list of items
        setDataGoc(response.data);
        console.log("tìm kím:",response.data);
    })
    .catch(error => console.error('Error adding item:', error));
  }

  const onChange = (value) => {
    console.log("changed", value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("Tất cả");

  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [promotions, setPromotions] = useState([]);

  const [khuyenMai, setKhuyenMais] = useState([]);

  const checkAndUpdateStatus = () => {
    const currentDate = new Date();
    // Lặp qua dữ liệu và kiểm tra điều kiện
    const updatedData = dataGoc.map(item => {
      if ((new Date(item.ngay_bat_dau) < currentDate) && (new Date(item.ngay_ket_thuc) > currentDate) && (item.trang_thai !== 2)){
        item.trang_thai = 1
        return { ...item, status: 'Hoạt động' };
      }
      else if (new Date(item.ngay_ket_thuc) < currentDate) {
        item.trang_thai = 2
        return { ...item, status: 'Hết hạn' };
      } 
      return item;
    });

    // Cập nhật state "data" với dữ liệu mới
    setDataGoc(updatedData);
  };

  useEffect(() => {

      timKiemKhuyenMai(dataSearch);
      // checkAndUpdateStatus();
  }, [dataSearch]);

  useEffect(() => {
      loadKhuyenMai();
      if (dataGoc.length === khuyenMai.length) {
      setDataGoc(khuyenMai)
      }
      // setDataGoc(khuyenMai);
  },[khuyenMai]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("http://localhost:8080/khuyen-mai");
  //     setKhuyenMais(response.data);
  //   };
  //   fetchData();
  //   console.log("Khuyến mại:",khuyenMai);
  // }, [khuyenMai]);

    // Hàm kiểm tra và cập nhật trạng thái
    


  useEffect(() => {

    const checkAndUpdateStatus = () => {
      const currentDate = new Date();

      // Lặp qua dữ liệu và kiểm tra điều kiện
      const updatedData = khuyenMai.map(item => {
        if ((new Date(item.ngay_bat_dau) < currentDate) && (new Date(item.ngay_ket_thuc) > currentDate) && (item.trang_thai !== 2)){
          item.trang_thai = 1
          return { ...item, status: 'Hoạt động' };
        }
        else if (new Date(item.ngay_ket_thuc) < currentDate) {
          item.trang_thai = 2
          return { ...item, status: 'Hết hạn' };
        } 
        return item;
      });

      // Cập nhật state "data" với dữ liệu mới
      setKhuyenMais(updatedData);
    };
    // Gọi hàm kiểm tra và cập nhật khi component được mount
    checkAndUpdateStatus();
    // Clear interval khi component bị hủy
    // return () => clearInterval(intervalId);
  }, [khuyenMai.trang_thai,khuyenMai.ngay_ket_thuc,khuyenMai.ngay_bat_dau]); // useEffect sẽ chạy khi "data" thay đổi

  const updateTrangThai = async(id, value) => {
   await axios
      .put(`http://localhost:8080/khuyen-mai/updateTrangThai/${id}`, value)
      .then((response) => {
        if (response.status === 200) {
          loadKhuyenMai();
          // checkAndUpdateStatus();
        toast("✔️ Cập nhật thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      });
  };

  const updateTrangThai1 = async(id, value) => {
    await axios
      .put(`http://localhost:8080/khuyen-mai/updateTrangThai1/${id}`, value)
      .then((response) => {
        if (response.status === 200) {
          loadKhuyenMai();
          // checkAndUpdateStatus();
        toast("✔️ Cập nhật thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      });
  };

  const loadKhuyenMai = async () => {
    await axios
      .get("http://localhost:8080/khuyen-mai")
      .then((response) => {
        setKhuyenMais(response.data);
        // setDataGoc(response.data);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const columns = [
    {
      title: "#",
      selector: (row) => promotions.indexOf(row) + 1,
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
      center: "true",

      sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
    },
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Loại",
      dataIndex: "loai",
      key: "loai",
      filters: [
        {
          text: "Tiền Mặt",
          value: "Tiền Mặt",
        },
        {
          text: "Phần Trăm",
          value: "Phần Trăm",
        },
      ],
      onFilter: (value, record) => record.loai.indexOf(value) === 0,
    },
    {
      title: "Giá trị giảm",
      dataIndex: "gia_tri_giam",
      key: "gia_tri_giam",
      render: (gia_tri_giam, x) => (
        <>
          {x.loai === "Tiền Mặt" || x.loai === "Tiền mặt"
            ? new Intl.NumberFormat("vi-Vi", {
                style: "currency",
                currency: "VND",
              }).format(gia_tri_giam)
            : gia_tri_giam + "%"}
        </>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      render: (ngay_bat_dau) => (
        <>{moment(ngay_bat_dau).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),
    },
    {
      title: "Ngày kết thúc ",
      dataIndex: "ngay_ket_thuc",
      render: (ngay_ket_thuc) => (
        <>{moment(ngay_ket_thuc).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag
              color="#f50
                "
            >
              Sắp bắt đầu
            </Tag>
          ) : trang_thai === 1 ? (
            <Tag
              color="#87d068
                "
            >
              Đang diễn ra
            </Tag>
          ) : (
            <Tag color="#ff0000">Đã kết thúc</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Sắp bắt đầu",
          value: "0",
        },
        {
          text: "Đang diễn ra",
          value: "1",
        },
        {
          text: "Đã kết thúc",
          value: "2",
        },
      ],
      onFilter: (value, record) => record.trang_thai === parseInt(value),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <Link
              to={{ pathname: `/sua-khuyen-mai/${record.id}` }}
              className="btn rounded-pill"
            >
              <InfoCircleOutlined
                style={{
                  fontSize: 30,
                  backgroundColor: "#ffff00",
                  borderRadius: 90,
                }}
              />
            </Link>
          </a>
          <>
            {new Date(record.ngay_ket_thuc) > currentTime ? (
              record.trang_thai === 2 ? (
                <a className="btn rounded-pill" 
                //onClick={() =>updateTrangThai1(record.id,record)}
                onClick={() => {
                  Modal.confirm({
                    title: "Thông báo",
                    content: "Bạn có chắc chắn muốn sửa không?",
                    onOk: () => {
                      updateTrangThai1(record.id,record)
                      // form.finish();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}>
                  <PlayCircleOutlined
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ffff00",
                      borderRadius: 90,
                    }}
                  />
                </a>
              ) : (
                <a className="btn rounded-pill" 
                //onClick={() =>updateTrangThai(record.id,record)}>
                onClick={() => {
                  Modal.confirm({
                    title: "Thông báo",
                    content: "Bạn có chắc chắn muốn sửa không?",
                    onOk: () => {
                      updateTrangThai(record.id,record)
                      // form.finish();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}>
                  <PauseCircleOutlined
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ffff00",
                      borderRadius: 90,
                    }}
                  />
                </a>
              )
            ) : (
              <a className="btn rounded-pill" disabled>
                <PlayCircleOutlined
                  style={{
                    fontSize: 30,
                    backgroundColor: "#ffff00",
                    borderRadius: 90,
                  }}
                />
              </a>
            )}
          </>
        </Space>
      ),
      center: "true",
    },
  ];
  return (
    <div className="container">
      <div>
        <div className="container-fluid">
          <Divider orientation="center" color="none">
            <h2 className="text-first pt-1 fw-bold">
              <LuBadgePercent /> Quản lý đợt giảm giá
            </h2>
          </Divider>

          <div className="bg-light m-2 p-3" style={{ borderRadius: 20 }}>
            <div className="text-first fw-bold">
              <FilterFilled /> Bộ lọc
            </div>
            <hr />
            <Form
              className=" row col-md-12"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onChangeFilter}
              // onChange={timKiem}
              size={componentSize}
              style={{
                maxWidth: 1600,
              }}
              form={form}
            >
              <div className="col-md-4">
                <Form.Item label="Mã KM" name="maKM">
                  <Input
                    placeholder="Mã khuyến mại"
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
                <Form.Item label="Loại" name="loai">
                  <select
                    value={selectedValue}
                    onChange={handleChange}
                    className="rounded-pill border-warning"
                    id="abc"
                  >
                    <option value="Tất cả">Tất cả</option>
                    <option value="Tiền mặt">Tiền mặt</option>
                    <option value="Phần trăm">Phần trăm</option>
                  </select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Tên KM" name="tenKM">
                  <Input
                    placeholder="Tên khuyến mại "
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
                <Form.Item label="Giá trị giảm" name="giaTriGiam">
                  {selectedValue === "Tiền mặt" ? (
                    <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChange}
                      style={{ width: "100%" }}
                      className="rounded-pill border-warning"
                    />
                  ) : selectedValue === "Phần trăm" ? (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChange}
                      style={{ width: "100%" }}
                      className="rounded-pill border-warning"
                    />
                  ) : (
                    <Input
                      className="rounded-pill border-warning"
                      disabled
                    ></Input>
                  )}
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Ngày bắt đầu" name="ngayBatDau">
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày bắt đầu"
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
                <Form.Item label="Ngày kết thúc" name="ngayKetThuc">
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày kết thúc"
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-1"></div>
              <div className="col-md-4">
                <Form.Item className="text-center">
                  {/* <Button className="btn btn-warning nut-tim-kiem">Tìm kiếm</Button> */}
                  <button className="btn btn-warning nut-tim-kiem rounded-pill fw-bold">
                    <SearchOutlined />
                    Làm mới
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>

          <div className="text-end">
            {/* <a name="" id="" class="btn btn-warning bg-gradient fw-bold nut-them" role="button">                
            </a> */}
            <br />

            <Link
              to="/frm-khuyen-mai"
              className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill"
            >
              <PlusCircleOutlined /> Thêm đợt giảm giá
            </Link>
          </div>
          <div className="text-first fw-bold">
            <p>
              <UnorderedListOutlined /> Danh sách đợt giảm giá
            </p>
          </div>
          <hr />
          <div className="container-fluid mt-4">
            <div>
              <Table
                dataSource={dataGoc}
                columns={columns}
                id="bang"
                pagination={{ defaultPageSize: 5 }}
              />
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </div>
  );
};
export default KhuyenMai;
