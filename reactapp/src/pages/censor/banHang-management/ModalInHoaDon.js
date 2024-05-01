import { Button, Modal, Tag } from "antd";
import logo from "../../../assets/images/logo.png";
import { FormattedNumber, IntlProvider } from "react-intl";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import {  toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";
import { RemoveBill,GetBill } from "../../../store/reducer/Bill.reducer";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";

const ModalInHoaDon = (props) => {
  const componnentRef = useRef();
  const {openInHoaDon, setOpenInHoaDon , openThanhToan , setActiveKey} = props;
  const [hoaDondetail, setHoaDondetail] = useState([]);
  const [trangThai, setTrangThai] = useState([]);
  const [listSanPhams, setlistSanPhams] = useState([]);
  const id = props.id;
  const hoaDons = useSelector(GetBill);

  const loadHoaDon =  () => {
    HoaDonAPI.chiTietHoaDonTheoMa(id).then((res) => {
      if (!res.data) return;
      setHoaDondetail(res.data);
      setTrangThai(res.data.trangThai);
    });
  }


  const handleCloseInHoaDon = () => {
    setActiveKey(hoaDons.filter((h) => h.key !== id)[0] ? hoaDons.filter((h) => h.key !== id)[0].key : null);
    setOpenInHoaDon(false);
  };

  const loadListSanPhams =  () => {
    HoaDonAPI.hoaDonSanPhamTheoMa(id).then((res) => {
      if (!res.data) return;
      setlistSanPhams(res.data);
      
    });
  };




  useEffect(() => {
    if (id && openInHoaDon)  {
    if (listSanPhams.length > 0) {
      handlePrint();
      setlistSanPhams([]);
      setHoaDondetail([]);
      return handleCloseInHoaDon();
    }
    loadHoaDon();
    loadListSanPhams();
    }
  },[id,openThanhToan,hoaDondetail,trangThai,listSanPhams]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Thực hiện công việc bạn muốn ở đây
  //     if (id && !hoaDondetail ) {
  //       loadHoaDon();
  //       loadListSanPhams();
  //       }
  //   }, 1000);

  //   // Đảm bảo dọn dẹp interval khi component unmount hoặc khi useEffect chạy lại
  //   return () => clearInterval(interval);
  // }, []);

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
    return (
      <Modal
        footer={[]}
        title="In hóa đơn"
        centered
        open={openInHoaDon}
        onOk={handleCloseInHoaDon}
        onCancel={handleCloseInHoaDon}
        width={1000}
        height={600}
        zIndex={20000}
      >
        <>
          <div ref={componnentRef} className="row">
            <div className="col-md-2">
              <img
                src={logo}
                style={{ width: 150, height: 150, marginLeft: 30 }}
              />
            </div>

            <h2 className=" my-5  py-2 col-md-10 " style={{ paddingLeft: 250 }}>
              {" "}
              MI SHOES
            </h2>
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
                ) : trangThai == 5 ? (
                  <Tag color="success">Thành công</Tag>
                ) : trangThai == 10 ? (
                  <Tag color="orange">Trả hàng</Tag>
                ) : trangThai == -1 ? (
                  <Tag color="red">Hủy</Tag>
                ) : trangThai == -2 ? (
                  <Tag color="pink">Hoàn tiền</Tag>
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
                <p>{hoaDondetail.sdt}</p>
              </div>
              <div className="mt-4">
                <p>{hoaDondetail.ghiChuHD}</p>
              </div>
            </div>
            <div className="container-fuild mt-3 row  radius">
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
                      {listSanPham.giaGiam > 0 ? (
                        <div className="text-danger">
                          <h6>
                            <del>
                              <IntlProvider locale="vi-VN">
                                <div>
                                  <FormattedNumber
                                    value={
                                      parseInt(listSanPham.thanhTienSP) +
                                      parseInt(listSanPham.giaGiam)
                                    }
                                    currency="VND"
                                    minimumFractionDigits={0}
                                  />
                                  {" VND"}
                                </div>
                              </IntlProvider>
                            </del>
                          </h6>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="text-danger">
                        <h6>
                          <IntlProvider locale="vi-VN">
                            <div>
                              <FormattedNumber
                                value={listSanPham.thanhTienSP}
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                              {" VND"}
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
                          border: "1px solid black", // Thêm viền đen với độ dày 1px
                        }}
                      ></div>
                      <h6>x{listSanPham.soLuongSP}</h6>
                    </div>

                    <div className="col-md-2 text-danger mt-5">
                      <h6>
                        <IntlProvider locale="vi-VN">
                          <div>
                            <FormattedNumber
                              value={
                                listSanPham.thanhTienSP * listSanPham.soLuongSP
                              }
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                            {" VND"}
                          </div>
                        </IntlProvider>
                      </h6>
                    </div>
                    {listSanPham.trangThai == 2 ? (
                      <div className="col-md-2  mt-5">
                        <Button
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Trả hàng
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <hr className="mt-3"></hr>
                  </tr>
                ))}
              </div>

              <tr className="pt-3 row">
                <div className="col-md-6">
                  <div className="row">
                    <h6 className="col-md-3 mt-2">Mã giảm giá:</h6>

                    {hoaDondetail?.voucher == null
                      ? "Không có voucher"
                      : hoaDondetail?.voucher.ma}
                  </div>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <div className="d-flex">
                    <h6 className="col-md-6">Tiền hàng:</h6>{" "}
                    <p className="col-md-6">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={
                              hoaDondetail.giaGiam == null
                                ? parseFloat(hoaDondetail.thanhTien)
                                : parseFloat(hoaDondetail.thanhTien) +
                                  parseFloat(hoaDondetail.giaGiam)
                            }
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                          {" VND"}
                        </div>
                      </IntlProvider>
                    </p>
                  </div>
                  <div className="d-flex">
                    <h6 className="col-md-6">Phí vận chuyển:</h6>
                    <p className="col-md-6">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={hoaDondetail.tienVanChuyen}
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                          {" VND"}
                        </div>
                      </IntlProvider>
                    </p>
                  </div>
                  <div className="d-flex">
                    <h6 className="col-md-6">Tổng tiền giảm:</h6>
                    <p className="col-md-6">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={
                              hoaDondetail.giaGiam
                                ? "-" + hoaDondetail.giaGiam
                                : 0
                            }
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                          {" VND"}
                        </div>
                      </IntlProvider>
                    </p>{" "}
                  </div>
                  <div className="d-flex">
                    <h6 className="col-md-6">Tổng giảm:</h6>
                    <p className="col-md-6">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={hoaDondetail.thanhTien}
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                          {" VND"}
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
    );
};
export default ModalInHoaDon;
