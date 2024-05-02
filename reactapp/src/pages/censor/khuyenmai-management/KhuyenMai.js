import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Divider,
  Modal,
  Breadcrumb,
} from "antd";
import "./KhuyenMai.scss";
import { BiSolidDiscount } from "react-icons/bi";
import {
  HomeOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  FilterFilled,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { LuBadgePercent } from "react-icons/lu";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PromotionAPI } from "../../censor/api/promotion/promotion.api";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GetInvoice, UpdateKMInvoice, UpdateKMNULLInvoice } from "../../../store/reducer/DetailInvoice.reducer";
import { dispatch } from "../../../store/redux/store";
import { Update } from "../../../store/reducer/Bill.reducer";

const KhuyenMai = () => {
  const currentTime = moment(); // thời gian hiện tại
   const nav = useNavigate();
   const themKM = (res) => {
     nav("/admin-them-khuyen-mai");
   };
  const onChange = (value) => {};
  const ctspHD = useSelector(GetInvoice);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("Tất cả");

  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = useState("default");
  let items = [];

  const [khuyenMai, setKhuyenMais] = useState([]);


  const loadKhuyenMai =  () => {
     PromotionAPI.getAll()
      .then((response) => {
        setKhuyenMais(response.data);
        console.log("Ngày tạo ", response.data);
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // tự update
  useEffect(() => {
    loadKhuyenMai();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!dataSearch.ma && !dataSearch.ten && !dataSearch.gia_tri_khuyen_mai && !dataSearch.loai && !dataSearch.ngay_bat_dau && !dataSearch.ngay_ket_thuc ) {
        loadKhuyenMai();
      }
    }, 60000); // 60000 milliseconds = 1 phút
    return () => clearInterval(intervalId);

  }, []);

  // tìm kiếm

  const [dataSearch, setDataSearch] = useState({});

  const onChangeFilter = (changedValues, allValues) => {
    timKiemKhuyenMai(allValues);
    setDataSearch(allValues);
  };

  const timKiemKhuyenMai = (dataSearch) => {
    PromotionAPI.search(dataSearch)
      .then((response) => {
        setKhuyenMais(response.data);
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // hết tìm kiếm

  const updateTrangThai = async (id, value) => {
    await PromotionAPI.updateClosePromotion(id, value).then((response) => {
      dispatch(UpdateKMNULLInvoice({tenKM: response.ten,loaiKM: response.loai}))
       // console.log("items ",items);
      if (response.status === 200) {
        loadKhuyenMai();
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
    ctspHD.forEach((item,index)=> {
      if (items.length === 0) {items.push({hoaDon : item.hoaDon , total : item.total});
      console.log("items ",items);}
      else {
        if (items.filter(i => i.hoaDon === item.hoaDon).length > 0){
          let index = items.indexOf(i => i.hoaDon === item.hoaDon);
          items[index].total += item.total;
          console.log("items ",items);

        } else {
          items.push({hoaDon : item.hoaDon , total : item.total});
          console.log("items ",items);

        }
      }
      });
      console.log("items ",items);

      for (let i = 0 ; i < items.length ; i++) {
      dispatch(Update({key : items[i].hoaDon, thanhTien : items[i].total}));
      }
    };
  

  const updateTrangThai1 = async (id, value) => {
    await PromotionAPI.updateOpenPromotion(id, value).then((response) => {
      console.log("RES ",response);
      dispatch(UpdateKMInvoice({tenKM: response.ten,loaiKM: response.loai,giaTriKhuyenMai: response.gia_tri_khuyen_mai}))
      ctspHD.forEach((item,index)=> {
        let newItems = {hoaDon : item.hoaDon , total : item.total};
        if (items.length === 0) items.push(newItems);
        else if (items.filter(i => i.hoaDon === newItems.hoaDon).length > 0){
            let index = items.indexOf(i => i.hoaDon === newItems.hoaDon);
            items[index].total += newItems.total;
          }
        });
        for (let i = 0 ; i < items.length ; i++) {
        dispatch(Update({key : items[i].hoaDon, thanhTien : items[i].total}));
        }
        console.log("items ",items);
      if (response.status === 200) {
        loadKhuyenMai();
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

  const columns = [
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
      center: "true",

      // sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
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
          text: "Tiền mặt",
          value: "Tiền mặt",
        },
        {
          text: "Phần trăm",
          value: "Phần trăm",
        },
      ],
      onFilter: (value, record) => record.loai.indexOf(value) === 0,
    },
    {
      title: "Giá trị giảm",
      dataIndex: "gia_tri_khuyen_mai",
      key: "gia_tri_khuyen_mai",
      render: (gia_tri_khuyen_mai, x) => (
        <>
          {x.loai === "Tiền Mặt" || x.loai === "Tiền mặt"
            ? new Intl.NumberFormat("vi-Vi", {
                currency: "VND",
              }).format(gia_tri_khuyen_mai) + " VND"
            : gia_tri_khuyen_mai + "%"}
        </>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      render: (ngay_bat_dau) => (
        <>{moment(ngay_bat_dau).format("DD/MM/YYYY, HH:mm:ss")}</>
      ),
    },
    {
      title: "Ngày kết thúc ",
      dataIndex: "ngay_ket_thuc",
      render: (ngay_ket_thuc) => (
        <>{moment(ngay_ket_thuc).format("DD/MM/YYYY, HH:mm:ss")}</>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) => (
        <>
          {trangThai === 0 ? (
            <Tag
              color="#f50
                "
            >
              Sắp diễn ra
            </Tag>
          ) : trangThai === 1 ? (
            <Tag
              color="#87d068
                "
            >
              Đang diễn ra
            </Tag>
          ) : trangThai === 2 ? (
            <Tag color="#ff0000">Đã kết thúc</Tag>
          ) : (
            <Tag color="#000000">Tạm dừng</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Sắp diễn ra",
          value: 0,
        },
        {
          text: "Đang diễn ra",
          value: 1,
        },
        {
          text: "Đã kết thúc",
          value: 2,
        },
        ,
        {
          text: "Tạm dừng",
          value: 3,
        },
      ],
      onFilter: (value, record) => record.trangThai === parseInt(value),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <Link
              to={{ pathname: `/admin-sua-khuyen-mai/${record.id}` }}
              className="btn btn-danger"
            >
              <BsFillEyeFill size={20} />
            </Link>
          </a>
          <>
            {new Date(record.ngay_ket_thuc) > currentTime ? (
              record.trangThai === 3 ? (
                <a
                  className="btn rounded-pill"
                  //onClick={() =>updateTrangThai1(record.id,record)}
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn sửa không?",
                      onOk: () => {
                        updateTrangThai1(record.id, record);
                        // form.finish();
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }}
                >
                  <PlayCircleOutlined
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ffff00",
                      borderRadius: 90,
                    }}
                  />
                </a>
              ) : (
                <a
                  className="btn rounded-pill"
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn sửa không?",
                      onOk: () => {
                        updateTrangThai(record.id, record);
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }}
                >
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

  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");
  const [ellipsis] = useState(false);
  const [yScroll] = useState(false);
  const [xScroll] = useState();
  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  return (
    <div className="">
      <Breadcrumb
        style={{ marginTop: "10px" }}
        items={[
          {
            href: "/admin-ban-hang",
            //path: '/admin-ban-hang',
            title: <HomeOutlined />,
          },
          {
            href: "/admin-khuyen-mai",
            title: (
              <>
                <BiSolidDiscount size={15} style={{ paddingBottom: 2 }} />

                <span>Giảm giá</span>
              </>
            ),
          },
          {
            title: (
              <>
                <LuBadgePercent size={15} style={{ paddingBottom: 2 }} />
                <span>Đợt giảm giá</span>{" "}
              </>
            ),
          },
        ]}
      />
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
                <Form.Item label="Mã KM" name="ma">
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
                    status="warning"
                  >
                    <option value="">Tất cả</option>
                    <option value="Tiền mặt">Tiền mặt</option>
                    <option value="Phần trăm">Phần trăm</option>
                  </select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Tên KM" name="ten">
                  <Input
                    placeholder="Tên khuyến mại "
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
                <Form.Item label="Giá trị giảm" name="gia_tri_khuyen_mai">
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
                <Form.Item label="Ngày bắt đầu" name="ngay_bat_dau">
                  <DatePicker
                    showTime
                    style={{ width: "100%" }}
                    placeholder="Ngày bắt đầu"
                    format="YYYY-MM-DD HH:mm:ss"
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
                <Form.Item label="Ngày kết thúc" name="ngay_ket_thuc">
                  <DatePicker
                    showTime
                    style={{ width: "100%" }}
                    placeholder="Ngày kết thúc"
                    format="YYYY-MM-DD HH:mm:ss"
                    className="rounded-pill border-warning"
                  />
                </Form.Item>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-1"></div>
              <div className="col-md-4">
                <Form.Item className="text-center">
                  <button className="btn btn-warning nut-tim-kiem rounded-pill fw-bold" onClick= {() => loadKhuyenMai()}>
                    <ReloadOutlined />
                    Làm mới
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>

          <div className="text-end">
            <br />
     

            <button onClick={themKM} class="button-them">
              <span class="text">
                <PlusCircleOutlined /> Thêm
              </span>
            </button>
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
                dataSource={khuyenMai.sort((a, b) =>  { const dateA = new Date(a.ngayTao);
                  const dateB = new Date(b.ngayTao);
                  return dateB - dateA; })}
                columns={columns}
                id="bang"
                scroll={scroll}
                pagination={{
                  showQuickJumper: true,
                  position: [top, bottom],
                  defaultCurrentPage: 1,
                  defaultPageSize: 5,
                  pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
                  showSizeChanger: true,
                  total: khuyenMai.length,
                }}
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
