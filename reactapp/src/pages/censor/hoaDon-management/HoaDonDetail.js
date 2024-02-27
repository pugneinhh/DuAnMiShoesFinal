import React, { useEffect, useRef, useState } from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaCheckCircle } from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { GiNotebook, GiPiggyBank, GiReturnArrow } from "react-icons/gi";
import { FaTruckFast } from "react-icons/fa6";
import { Button, Modal, Table, Tag, Input, Flex, Form } from "antd";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HoaDonDetail.css";
import moment from "moment";
import { Image } from "cloudinary-react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../assets/images/logo.png";
import { FormattedNumber, IntlProvider } from "react-intl";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import ModalTimeLine from "./ModalTimeLine";
import ModalSanPham from "./ModalSanPham";
import { get, set } from "local-storage";
import { ThanhToanAPI } from "../api/thanhToan/thanhToan.api";
export default function HoaDonDetail() {
  const { id } = useParams();
  const [openModalTimeLine, setOpenModalTimeLine] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSanPham, setOpenSanPham] = useState(false);
  const [activeKey, setActiveKey] = useState(0);
  const [listHDTimeLine, setlistHDTimeLine] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalOpen(false);
    setOpenModalTimeLine(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenModalTimeLine(false);
    setOpenSanPham(false);
  };
  const [openXuat, setOpenXuat] = useState(false);
  const componnentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componnentRef.current,
    documentTitle: "hoaDon",
    onAfterPrint: () =>
      toast("🦄 Thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }),
  });

  const { TextArea } = Input;
  const [hoaDondetail, setHoaDondetail] = useState([]);
  const [maNV, setmaNV] = useState("");
  useEffect(() => {
    const storedData = get("userData");
    setmaNV(storedData.ma);
    loadHoaDon();
    loadListSanPhams();
    loadLichSuThanhToan();
    loadTimeLineHoaDon();
  }, []);
  // load hóa đơn
 
  const loadHoaDon = async () => {
    HoaDonAPI.detailHD(id).then((res) => {
      setHoaDondetail(res.data);
      setTrangThai(res.data.trangThai);
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };


  // update trạng thái hóa đơn
  const handleSubmit = (values) => {
    HoaDonAPI.updateTTHoaDon(id, maNV, values).then((res) => {
      console.log("values",values);
        console.log("trang thau", trangThai);
      loadHoaDon();
      loadTimeLineHoaDon();
      form.resetFields();
      setIsModalOpen(false);
      toast("🦄 Thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const [LichSuThanhToan, setLichSuThanhToan] = useState([]);
  const loadLichSuThanhToan = () => {
    ThanhToanAPI.LichSuThanhToanByIdHD(id).then((res) => {
      setLichSuThanhToan(res.data);
    });
  };

  //lịch sử thanh toán
  const columLichSuThanhToan = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSortTooltip: false,
    },
    {
      title: "Mã Giao dịch",
      dataIndex: "maVNP",
      key: "maVNP",
    },
    {
      title: "Số tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (tongTien) => (
        <>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tongTien)}
        </>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "ngayTao",
      center: "true",
      render: (ngayTao) => <>{moment(ngayTao).format("hh:mm:ss DD/MM/YYYY")}</>,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "phuongThuc",
      key: "phuongThuc",
      render: (trangThai) => (
        <>
          {trangThai == 0 ? (
            <Tag color="#00cc00">Tiền mặt</Tag>
          ) : (
            <Tag color="#FFD700">Chuyển khoản</Tag>
          )}
        </>
      ),
    },
    {
      title: "Người xác nhận",
      dataIndex: "nguoiTao",
      center: "true",
    },
    {
      title: "Ghi chú",
      dataIndex: "moTa",
      center: "true",
    },
  ];

  const [trangThai, setTrangThai] = useState([]);

  const [listSanPhams, setlistSanPhams] = useState([]);

  const loadListSanPhams = () => {
    HoaDonAPI.detailSanPham(id).then((res) => {
      setlistSanPhams(res.data);
    });
  };
  const textButton = [
    "Xác nhận",
    "Chờ vận chuyển",
    "Đang vận chuyển",
    "Đã thanh toán",
    "Thành công",
  ];

  const loadTimeLineHoaDon = () => {
    HoaDonAPI.getAllLichSuHoaDon(id).then((res) => {
      setlistHDTimeLine(res.data);
    });
  };
  const showIcon = (trangThai) => {
    if (trangThai === "0") {
      return GiNotebook;
    } else if (trangThai === "1") {
      return SlNotebook;
    } else if (trangThai === "2") {
      return RiTruckFill;
    } else if (trangThai === "3") {
      return FaTruckFast;
    } else if (trangThai === "4") {
      return GiPiggyBank;
    } else if (trangThai === "5") {
      return FaCheckCircle;
    } else if (trangThai === "-1") {
      return GiReturnArrow;
    }
  };
  const showTitle = (trangThai) => {
    if (trangThai === "0") {
      return "Chờ xác nhận";
    } else if (trangThai === "1") {
      return "Xác Nhận";
    } else if (trangThai === "2") {
      return "Chờ vận chuyển";
    } else if (trangThai === "3") {
      return "Đang vận chuyển";
    } else if (trangThai === "4") {
      return "Đã thanh toán";
    } else if (trangThai === "5") {
      return "Thành công";
    } else if (trangThai === "-1") {
      return "Hủy";
    }
  };
  const showTitleButtonVanDon = (trangThai) => {
    if (trangThai === "0") {
      return "Xác nhận";
    } else if (trangThai === "1") {
      return "Chờ vận chuyển";
    } else if (trangThai === "2") {
      return "Đang vận chuyển";
    } else if (trangThai === "3") {
      return "Đã thanh toán";
    } else if (trangThai === "4") {
      return "Thành công";
    }
     else if (trangThai === "-1") {
      return "Hủy";
    }
  };
  return (
    <div className="container mt-4 radius  ">
      <div className="container-fuild  row pt-3 pb-4 bg-light rounded border-danger ">
        <div className="scroll-hoa-don mb-4">
          <div className="hoa-don-cuon-ngang">
            <Timeline
              minEvents={6}
              // maxEvents={10}
              style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
              placeholder
            >
              {listHDTimeLine.map((item, index) => (
                <TimelineEvent
                  minEvents={6}
                  key={index}
                  color={"#3d874d"}
                  icon={showIcon(item.trangThai)}
                  values={showTitle(item.trangThai)}
                  isOpenEnding={true}
                  title={showTitle(item.trangThai)}
                  subtitle={moment(item.ngayTao).format("hh:mm:ss DD/MM/YYYY")}
                />
              ))}
            </Timeline>
          </div>
        </div>

        {/* xác nhận đơn hàng */}

        <div className="col-md-2 ">
          <>
            {hoaDondetail.loaiHD == 0 ? (
              <>
                {trangThai == 0 ? (
                  <Button className="ms-5 " type="primary" onClick={showModal}>
                    {showTitleButtonVanDon(trangThai)}
                  </Button>
                ) : trangThai == 1 ? (
                  <Button className="ms-5 " type="primary" onClick={showModal}>
                    {showTitleButtonVanDon(trangThai)}
                  </Button>
                ) : trangThai == 2 ? (
                  <Button className="ms-5 " type="primary" onClick={showModal}>
                    {showTitleButtonVanDon(trangThai)}
                  </Button>
                ) : trangThai == 3 ? (
                  <Button className="ms-5 " type="primary" onClick={showModal}>
                    {showTitleButtonVanDon(trangThai)}
                  </Button>
                ) : trangThai == 4 ? (
                  <Button className="ms-5 " type="primary" onClick={showModal}>
                    {showTitleButtonVanDon(trangThai)}
                  </Button>
                ) : (
                  <>
                  
                  </>
                )}
              </>
            ) : (
              <> </>
            )}
            <Modal
              title="Xác nhận đơn hàng"
              footer={[]}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  name="moTaHoatDong"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống ghi chú!",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Button
                  style={{ marginLeft: 200 }}
                  className="bg-success text-light"
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn tiếp tục?",
                      onOk: () => {
                        form.submit();
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
                  Xác nhận
                </Button>
              </Form>
            </Modal>
          </>
        </div>
        <div className="col-md-2 ">
          <>
            <>
              {trangThai == 0 ? (
                <Button className="ms-5 btn btn-danger " type="primary">
                  Hủy
                </Button>
              ) : trangThai == 1 ? (
                <Button className="ms-5 btn btn-danger " type="primary">
                  Hủy
                </Button>
              ) : trangThai == 2 ? (
                <Button className="ms-5 btn btn-danger " type="primary">
                  Hủy
                </Button>
              ) : (
                <></>
              )}
            </>
          </>
        </div>
        <div className="col-md-2">
          <>
            <Button type="primary" onClick={() => setOpenXuat(true)}>
              Xuất hóa đơn
            </Button>
            <Modal
              footer={[]}
              title="In hóa đơn"
              centered
              open={openXuat}
              onOk={() => setOpenXuat(false)}
              onCancel={() => setOpenXuat(false)}
              width={1000}
              height={600}
            >
              <>
                <div ref={componnentRef} className="row">
                  <div className="col-md-2">
                    <img
                      src={logo}
                      style={{ width: 150, height: 150, marginLeft: 30 }}
                    />
                  </div>

                  <h2
                    className=" my-5  py-2 col-md-10 "
                    style={{ paddingLeft: 250 }}
                  >
                    {" "}
                    MI SHOES
                  </h2>
                  <div className="col-md-3">
                    <div style={{ marginLeft: 30 }}>
                      <h6>Tên khách hàng:</h6>
                    </div>
                    <div className="mt-4" style={{ marginLeft: 30 }}>
                      <h6>Số điện thoại:</h6>
                    </div>
                    <div className="mt-4" style={{ marginLeft: 30 }}>
                      <h6>Địa chỉ:</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div>
                      <p>{hoaDondetail.tenKH}</p>
                    </div>
                    <div className="mt-4">
                      <p>{hoaDondetail.sdtKH}</p>
                    </div>
                    <div className="mt-4">
                      <p>{hoaDondetail.diaChi}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="ps-4">
                      <h6>Trạng thái:</h6>
                    </div>
                    <div className="mt-4 ps-4">
                      <h6>Loại:</h6>
                    </div>
                    <div className="mt-4 ps-4">
                      <h6>Thành tiền:</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div>
                      {trangThai == 0 ? (
                        <Tag color="purple">Chờ xác nhận</Tag>
                      ) : trangThai == 1 ? (
                        <Tag color="red">Xác nhận</Tag>
                      ) : trangThai == 2 ? (
                        <Tag color="blue">Chờ vận chuyển</Tag>
                      ) : trangThai == 3 ? (
                        <Tag color="cyan">Đang Vận chuyển</Tag>
                      ) : trangThai == 4 ? (
                        <Tag color="orange">Đã Thanh toán</Tag>
                      ) : (
                        <Tag color="green">Thành công</Tag>
                      )}
                    </div>
                    <div className="mt-4">
                      {hoaDondetail.loaiHD == 0 ? (
                        <Tag color="orange">Online</Tag>
                      ) : (
                        <Tag color="red">Tại quầy</Tag>
                      )}
                    </div>
                    <div className="mt-4">
                      <p>
                        {" "}
                        <IntlProvider locale="vi-VN">
                          <div>
                            <FormattedNumber
                              value={hoaDondetail.thanhTienHD}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </div>
                        </IntlProvider>
                      </p>
                    </div>
                  </div>
                  <div className="container-fuild mt-3 row  radius">
                    <div>
                      {listSanPhams.map((listSanPham, index) => (
                        <tr className="pt-3 row">
                          <div className="col-md-4">
                            <Image
                              cloudName="dtetgawxc"
                              publicId={listSanPham.urlHA}
                              width="100"
                              crop="scale"
                              href={listSanPham.urlHA}
                              style={{
                                width: 100,
                                height: 100,
                                marginLeft: 40,
                              }}
                            />
                            {/* <img src={listSanPham.tenHA} style={{ width: 100, height: 100, marginLeft: 40 }} />  */}
                          </div>
                          <div className="col-md-6 ">
                            <div className="mt-4">
                              <h6>
                                {listSanPham.tenHang} {listSanPham.tenSP}{" "}
                                {listSanPham.tenMauSac}
                              </h6>
                            </div>
                            <div className="text-danger">
                              <h6>
                                <IntlProvider locale="vi-VN">
                                  <div>
                                    <FormattedNumber
                                      value={listSanPham.giaBanSP}
                                      style="currency"
                                      currency="VND"
                                      minimumFractionDigits={0}
                                    />
                                  </div>
                                </IntlProvider>
                              </h6>
                            </div>
                            <div>Size:{listSanPham.tenKichThuoc}</div>
                            <div>x{listSanPham.soLuongSP}</div>
                          </div>

                          <div className="col-md-2 text-danger mt-5">
                            <h6>
                              <IntlProvider locale="vi-VN">
                                <div>
                                  <FormattedNumber
                                    value={
                                      listSanPham.gia * listSanPham.soLuongSP
                                    }
                                    style="currency"
                                    currency="VND"
                                    minimumFractionDigits={0}
                                  />
                                </div>
                              </IntlProvider>
                            </h6>
                          </div>
                        </tr>
                      ))}
                    </div>
                    <hr></hr>
                    <tr className="pt-3 row">
                      <div className="col-md-6"></div>
                      <div className="col-md-3"></div>
                      <div className="col-md-3">
                        <div className="d-flex">
                          <h6 className="col-md-6">Tiền hàng:</h6>{" "}
                          <p className="col-md-6">
                            <IntlProvider locale="vi-VN">
                              <div>
                                <FormattedNumber
                                  value={hoaDondetail.thanhTienHD}
                                  style="currency"
                                  currency="VND"
                                  minimumFractionDigits={0}
                                />
                              </div>
                            </IntlProvider>
                          </p>{" "}
                        </div>
                        <div className="d-flex">
                          <h6 className="col-md-6">Phí vận chuyển:</h6>{" "}
                          <p className="col-md-6">0 VND</p>{" "}
                        </div>
                        <div className="d-flex">
                          <h6 className="col-md-6">Tổng tiền giảm:</h6>{" "}
                          <p className="col-md-6">0 VND</p>{" "}
                        </div>
                        <div className="d-flex">
                          <h6 className="col-md-6">Tổng giảm:</h6>{" "}
                          <p className="col-md-6">
                            <IntlProvider locale="vi-VN">
                              <div>
                                <FormattedNumber
                                  value={hoaDondetail.thanhTien}
                                  style="currency"
                                  currency="VND"
                                  minimumFractionDigits={0}
                                />
                              </div>
                            </IntlProvider>
                          </p>
                        </div>
                      </div>
                    </tr>
                  </div>
                </div>
                <button
                  className="bg-primary text-light rounded-pill mt-5 fs-5"
                  style={{ marginLeft: 420 }}
                  onClick={handlePrint}
                >
                  Xuất hóa đơn
                </button>
              </>
            </Modal>
          </>
        </div>
        {/* lịch sử hóa đơn */}
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
        <div className="col-md-2 text-end">
          <>
            <Button
              className="me-5 bg-success"
              type="primary"
              onClick={() => setOpenModalTimeLine(true)}
            >
              Lịch sử
            </Button>
          </>
        </div>
      </div>
      {/* Lịch sử thanh toán */}
      <div className="container-fuild row mt-3 bg-light radius">
        <h5 style={{ marginTop: "20px", paddingTop: "20px" }}>
          Lịch sử thanh toán
        </h5>
        <hr />
        <Table
          columns={columLichSuThanhToan}
          dataSource={LichSuThanhToan}
          style={{ marginTop: "25px" }}
        />
      </div>
      {/* Thông tin đơn hàng */}
      <div className="container-fuild mt-3 row bg-light radius">
        <h5 style={{ marginTop: "20px", paddingTop: "20px" }}>
          Thông tin đơn hàng
        </h5>
        <hr />
        <div className="col-md-3">
          <div className="ps-4">
            <h6>Trạng thái:</h6>
          </div>
          <div className="mt-4 ps-4">
            <h6>Loại:</h6>
          </div>
          <div className="mt-4 ps-4">
            <h6>Địa chỉ:</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            {trangThai == 0 ? (
              <Tag color="purple">Chờ xác nhận</Tag>
            ) : trangThai == 1 ? (
              <Tag color="red">Xác nhận</Tag>
            ) : trangThai == 2 ? (
              <Tag color="blue">Chờ vận chuyển</Tag>
            ) : trangThai == 3 ? (
              <Tag color="cyan">Đang Vận chuyển</Tag>
            ) : trangThai == 4 ? (
              <Tag color="orange">Đã Thanh toán</Tag>
            ) : (
              <Tag color="green">Thành công</Tag>
            )}
          </div>
          <div className="mt-4">
            {hoaDondetail.loaiHD == 0 ? (
              <Tag color="orange">Online</Tag>
            ) : (
              <Tag color="red">Tại quầy</Tag>
            )}
          </div>
          <div className="mt-4">
            <p>{hoaDondetail.diaChi}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <h6>Tên khách hàng:</h6>
          </div>
          <div className="mt-4">
            <h6>Số điện thoại:</h6>
          </div>
          <div className="mt-4">
            <h6>Ghi chú :</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <p>{hoaDondetail.tenKH}</p>
          </div>
          <div className="mt-4">
            <p>{hoaDondetail.sdtKH}</p>
          </div>
          <div className="mt-4">
            <p>{hoaDondetail.ghiChuHD}</p>
          </div>
        </div>
      </div>

      <div
        className="d-flex bd-highlight"
        style={{ marginTop: "20px", paddingTop: "20px" }}
      >
        <div className="flex-grow-1 bd-highlight">
          <h5>Thông tin sản phẩm</h5>
        </div>
        {/* chỉnh sửa sản phẩm */}
        <>
          {hoaDondetail.loaiHD == 0 && trangThai == 0 ? (
            <div className="bd-highlight">
              <Button
                className="btn btn-danger "
                onClick={() => setOpenSanPham(true)}
              >
                Chỉnh sửa
              </Button>
              <ModalSanPham
                // idHD = {tab.id}
                activeKey={activeKey}
                openSanPham={openSanPham}
                setOpenSanPham={setOpenSanPham}
                onOk={handleCancel}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <div></div>
          )}
        </>
      </div>

      <hr></hr>

      {/* detail hóa đơn */}
      <div className="container-fuild mt-3 row bg-light radius">
        <div>
          {listSanPhams.map((listSanPham, index) => (
            <tr className="pt-3 row">
              <div className="col-md-3">
                <Image
                  cloudName="dtetgawxc"
                  publicId={listSanPham.urlHA}
                  width="100"
                  crop="scale"
                  href={listSanPham.urlHA}
                  style={{ width: 150, height: 150, marginLeft: 15 }}
                />
              </div>
              <div className="col-md-5 ">
                <div className="mt-1">
                  <h6>
                    {listSanPham.tenHang} {listSanPham.tenSP}{" "}
                  </h6>
                </div>
                <div className="text-danger">
                  <h6>
                    <del>
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={listSanPham.giaBanSP}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider>
                    </del>
                  </h6>
                </div>
                <div className="text-danger">
                  <h6>
                    <IntlProvider locale="vi-VN">
                      <div>
                        <FormattedNumber
                          value={listSanPham.thanhTienSP}
                          style="currency"
                          currency="VND"
                          minimumFractionDigits={0}
                        />
                      </div>
                    </IntlProvider>
                  </h6>
                </div>
                <h6>Size:{listSanPham.tenKichThuoc}</h6>
                <div
                  style={{
                    backgroundColor: `${listSanPham.tenMauSac}`,
                    borderRadius: 6,
                    width: 60,
                    height: 25,
                  }}
                ></div>
                <h6>x{listSanPham.soLuongSP}</h6>
              </div>

              <div className="col-md-2 text-danger mt-5">
                <h6>
                  <IntlProvider locale="vi-VN">
                    <div>
                      <FormattedNumber
                        value={listSanPham.thanhTienSP * listSanPham.soLuongSP}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                      />
                    </div>
                  </IntlProvider>
                </h6>
              </div>
              <div className="col-md-2  mt-5">
                <Button className=" btn btn-danger">Trả hàng</Button>
              </div>

              <hr className="mt-3"></hr>
            </tr>
          ))}
        </div>

        <tr className="pt-3 row">
          <div className="col-md-6"></div>
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <div className="d-flex">
              <h6 className="col-md-8">Tiền hàng:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={hoaDondetail.thanhTien}
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
            <div className="d-flex">
              <h6 className="col-md-8">Phí vận chuyển:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={hoaDondetail.tienVanChuyen}
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
            <div className="d-flex">
              <h6 className="col-md-8">Tổng tiền giảm:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={
                        listSanPhams.giaBanSP * listSanPhams.soLuongSP -
                        hoaDondetail.thanhTien
                      }
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
            <div className="d-flex">
              <h6 className="col-md-8">Tổng giảm:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={hoaDondetail.thanhTien}
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
          </div>
        </tr>
      </div>

      <ModalTimeLine
        openModalTimeLine={openModalTimeLine}
        setOpenModalTimeLine={setOpenModalTimeLine}
        idHD={id}
        setHD={id}
        // loadDiaChi={loadDiaChi}
        onOk={handleCancel}
        onCancel={handleCancel}
      />

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
      <ToastContainer />
    </div>
  );
}
