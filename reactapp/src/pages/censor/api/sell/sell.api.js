import { Value } from "sass";
import { requestAdmin } from "../request";

export class SellAPI {
  static getAllCustomers = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/khach-hang",
    });
  };

  static getAllSizes = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/kich-thuoc",
    });
  };

  static getAllColors = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/mau-sac",
    });
  };

  static getAllMeterials = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/chat-lieu",
    });
  };

  static getAllSoles = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/de-giay",
    });
  };

  static getAllCategories = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/danh-muc",
    });
  };

  static getAllBrands = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/hang",
    });
  };

  static getAllProducts = () => {
    return requestAdmin({
      method: "GET",
      url: "/ban-hang/getALLCTSP",
    });
  };

  static addBill = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/ban-hang/add-hoa-don",
      data: data,
    });
  };

  static getAllHoaDonCho = () => {
    return requestAdmin({
      method: "GET",
      url: "/ban-hang/hoa-don/hoa-don-cho",
    });
  };

  static getAllHoaDonChoHomNay = () => {
    return requestAdmin({
      method: "GET",
      url: "/ban-hang/hoa-don/hoa-don-cho-hom-nay",
    });
  };

  static getAllHDCTByHD = (ma) => {
    return requestAdmin({
      method: "GET",
      url: `/ban-hang/hien-thi-hdct/${ma}`,
    });
  };

  static addInvoice = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/ban-hang/addHDCT",
      data: data,
    });
  };

  static updateTraSau = (ma,idNV) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/tra-sau/hoa-don/${ma}/${idNV}`,
    });
  }

  static getLinkVnpay = (hoaDon, money) => {
    return requestAdmin({
      method: "GET",
      url: `/vnppayment/chuyen-khoan/${hoaDon}/${money}`,
    });
  };

  static getVoucherNoLimited = () => {
    return requestAdmin({
      method: "GET",
      url: `/ban-hang/voucher/no-limited`,
    });
  };

  static getVoucherWithIDKH = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/ban-hang/voucher/${id}`,
    });
  };
  static deleteInvoiceAndRollBackProduct = (idCTSP, ma) => {
    return requestAdmin({
      method: "DELETE",
      url: `/ban-hang/delete-hoa-don-chi-tiet/${idCTSP}/${ma}`,
    });
  };
  static updateSL = (idCTSP, ma, Value) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/updateSL/${idCTSP}/${ma}/${Value}`,
    });
  };

  static updateSL1 = (idCTSP, idHD) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/updateSL1/${idCTSP}/${idHD}`,
    });
  };

  static updateKH = (ma, idKH) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/nguoi-dung/update-nguoi-dung/${ma}/${idKH}`,
    });
  };

  static updateReturnKhachLe = (ma) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/nguoi-dung/update-khach-le/${ma}`,
    });
  };

  static updateThanhTien = (idHD) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/update-thanh-tien/${idHD}`,
    });
  };

  static updateVoucherToHD = (idHD, idVoucher) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/them-voucher/${idHD}/${idVoucher}`,
    });
  };
  static thanhToanTienMat = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/thanh-toan/thanh-toan-tien-mat`,
      data: data,
    });
  };

  static thanhToanChuyenKhoan = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/thanh-toan/thanh-toan-chuyen-khoan`,
      data: data,
    });
  };


  static thanhToanHoaDon = (ma,idNV,idVoucher) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/thanh-toan/hoa-don/${ma}/${idNV}/${idVoucher}`,
    });
  };

  static updateVanChuyen = (ma, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/update-van-chuyen/${ma}`,
      data: data,
    });
  };

  static deleteVanChuyen = (ma) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/delete-van-chuyen/${ma}`,
    });
  };

  static addBillClient = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/ban-hang/addHDClient",
      data: data,
    });
  };

  static getSLAndSLT = (idSP,ma) => {
    return requestAdmin({
      method: "GET",
      url : `/ban-hang/hoa-don/san-pham/so-luong/${idSP}/${ma}`,
    });
  };

  static updateTienVanChuyen = (ma,tien) => {
    return requestAdmin({
      method: "PUT",
      url : `/ban-hang/hoa-don/update-tien-van-chuyen/${ma}/${tien}`,
    });
  }

  static getThanhTienbyMaHD = (ma) => {
    return requestAdmin({
      method: "GET",
      url : `/ban-hang/hoa-don/so-tien/${ma}`,
    });
  }

  static voucherTotNhat = (idKH,money) => {
    return requestAdmin({
      method: "GET",
      url : `/ban-hang/hoa-don/voucher-tot-nhat/${idKH}/${money}`,
    });
  }

  static voucherSapDatDuoc = (idKH,money) => {
    return requestAdmin({
      method: "GET",
      url : `/ban-hang/hoa-don/khuyen-mai-sap-dat-duoc/${idKH}/${money}`,
    });
  }

  static detailHoaDon = (ma) => {
    return requestAdmin({
      method: "GET",
      url : `/ban-hang/detail-hoa-don/${ma}`,
    });
  }
}