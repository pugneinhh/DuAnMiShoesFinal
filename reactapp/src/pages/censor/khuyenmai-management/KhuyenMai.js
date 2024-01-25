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
  EyeOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  FilterFilled,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { LuBadgePercent } from "react-icons/lu";
import moment from "moment";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PromotionAPI } from "../../censor/api/promotion/promotion.api";
import BanHang from "../../censor/banHang-management/BanHang";

const KhuyenMai = () => {
  const currentTime = moment(); // thời gian hiện tại

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

  const [khuyenMai, setKhuyenMais] = useState([]);

  const checkAndUpdateStatus = () => {
    const currentDate = new Date();
    // Lặp qua dữ liệu và kiểm tra điều kiện
    const updatedData = khuyenMai.map((item) => {
      if (
        new Date(item.ngay_bat_dau) < currentDate &&
        new Date(item.ngay_ket_thuc) > currentDate &&
        item.trang_thai !== 2
      ) {
        item.trang_thai = 1;
        return { ...item, status: "Hoạt động" };
      } else if (new Date(item.ngay_ket_thuc) < currentDate) {
        item.trang_thai = 2;
        return { ...item, status: "Hết hạn" };
      }
      return item;
    });

    setKhuyenMais(updatedData);
  };
  const loadKhuyenMai = async () => {
    const result = await PromotionAPI.getAll()
      .then((response) => {
        setKhuyenMais(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // tự update
  useEffect(() => {
    loadKhuyenMai();
  }, []);

  useEffect(() => {
    const handleUpdateStatus = (status) => {
      const currentTime = new Date();
      khuyenMai.forEach((x) => {
        currentTime > new Date(x.ngay_bat_dau) &&
        currentTime < new Date(x.ngay_ket_thuc)
          ? PromotionAPI.updateAutoStart(x.id, x)
          : currentTime > new Date(x.ngay_ket_thuc)
          ? PromotionAPI.updateAutoClose(x.id, x)
          : console.log("Không có dữ liệu update");
      });
      if (
        !dataSearch.ma &&
        !dataSearch.ten &&
        !dataSearch.ngay_bat_dau &&
        !dataSearch.ngay_ket_thuc &&
        !dataSearch.loai &&
        !dataSearch.gia_tri_khuyen_mai
      ) {
        loadKhuyenMai();
      }
    };
    const time = setInterval(handleUpdateStatus, 10000);
    return () => {
      clearInterval(time);
    };
  }, [khuyenMai]);

  // tìm kiếm

  const [dataSearch, setDataSearch] = useState({});
  const onChangeFilter = (changedValues, allValues) => {
    console.log("hi", changedValues);
    console.log("ob", allValues);
    timKiemKhuyenMai(allValues);
    setDataSearch(allValues);
  };

  const timKiemKhuyenMai = (dataSearch) => {
    PromotionAPI.search(dataSearch)
      .then((response) => {
        console.log(response.data);
        setKhuyenMais(response.data);
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // hết tìm kiếm

  const updateTrangThai = async (id, value) => {
    await PromotionAPI.updateClosePromotion(id, value).then((response) => {
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

  const updateTrangThai1 = async (id, value) => {
    await PromotionAPI.updateOpenPromotion(id, value).then((response) => {
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
      dataIndex: "gia_tri_khuyen_mai",
      key: "gia_tri_khuyen_mai",
      render: (gia_tri_khuyen_mai, x) => (
        <>
          {x.loai === "Tiền Mặt" || x.loai === "Tiền mặt"
            ? new Intl.NumberFormat("vi-Vi", {
                style: "currency",
                currency: "VND",
              }).format(gia_tri_khuyen_mai)
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
        ,
        {
          text: "Tạm dừng",
          value: "3",
        },
      ],
      onFilter: (value, record) => record.trangThai === parseInt(value),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <Link
              to={{ pathname: `/admin-sua-khuyen-mai/${record.id}` }}
              className="btn rounded-pill"
            >
              <EyeOutlined
                style={{
                  fontSize: 30,
                  backgroundColor: "#ffff00",
                  borderRadius: 90,
                  borderWidth: 10,
                  borderColor: "#000000",
                }}
              />
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

  return (
    <div className="container">
      <Breadcrumb
        style={{ marginTop: "10px" }}
        items={[
          {
             href: '/admin-ban-hang',
            //path: '/admin-ban-hang',
            title:  <HomeOutlined />,
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
                  <button className="btn btn-warning nut-tim-kiem rounded-pill fw-bold">
                    <ReloadOutlined />
                    Làm mới
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>

          <div className="text-end">
            <br />
            <Link
              to="/admin-them-khuyen-mai"
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
                dataSource={khuyenMai}
                columns={columns}
                id="bang"
                pagination={{
                  showQuickJumper: true,
                  defaultCurrentPage: 1,
                  defaultPageSize: 5,
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
