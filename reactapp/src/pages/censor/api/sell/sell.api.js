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

  static getAllHDCTByHD = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/ban-hang/hien-thi-hdct/${id}`,
    });
  };

  static addInvoice = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/ban-hang/addHDCT",
      data: data,
    });
  };

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
  static deleteInvoiceAndRollBackProduct = (idCTSP, idHD) => {
    return requestAdmin({
      method: "DELETE",
      url: `/ban-hang/delete-hoa-don-chi-tiet/${idCTSP}/${idHD}`,
    });
  };
  static updateSL = (idCTSP, idHD, Value) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/updateSL/${idCTSP}/${idHD}/${Value}`,
    });
  };

  static updateKH = (idHD, idKH) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/nguoi-dung/update-nguoi-dung/${idHD}/${idKH}`,
    });
  };

  static updateReturnKhachLe = (idHD) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/nguoi-dung/update-khach-le/${idHD}`,
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

  static thanhToanHoaDon = (id,idNV) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/thanh-toan/hoa-don/${id}/${idNV}`,
    });
  };

  static updateVanChuyen = (idHD, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/ban-hang/hoa-don/update-van-chuyen/${idHD}`,
      data: data,
    });
  };
  static addBillClient = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/ban-hang/addHDClient",
      data: data,
    });
  };
}