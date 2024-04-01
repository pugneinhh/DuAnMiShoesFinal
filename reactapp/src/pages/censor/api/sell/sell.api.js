import { Value } from "sass";
import { requestAdmin } from "../request";

export class SellAPI {
  static getAllCustomers = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/khach-hang",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllSizes = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/kich-thuoc",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllColors = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/mau-sac",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllMeterials = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/chat-lieu",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllSoles = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/de-giay",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllCategories = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/danh-muc",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllBrands = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/hang",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllProducts = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/ban-hang/getALLCTSP",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static addBill = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/admin/ban-hang/add-hoa-don",
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllHoaDonCho = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/ban-hang/hoa-don/hoa-don-cho",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllHoaDonChoHomNay = () => {
    return requestAdmin({
      method: "GET",
      url: "/admin/ban-hang/hoa-don/hoa-don-cho-hom-nay",
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllHDCTByHD = (ma) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hien-thi-hdct/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static addInvoice = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/admin/ban-hang/addHDCT",
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateTraSau = (ma,idNV) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/tra-sau/hoa-don/${ma}/${idNV}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  }

  static getLinkVnpay = (hoaDon, money) => {
    return requestAdmin({
      method: "GET",
      url: `/vnppayment/chuyen-khoan/${hoaDon}/${money}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getVoucherNoLimited = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/voucher/no-limited`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getVoucherWithIDKH = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/voucher/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static deleteInvoiceAndRollBackProduct = (idCTSP, ma) => {
    return requestAdmin({
      method: "DELETE",
      url: `/admin/ban-hang/delete-hoa-don-chi-tiet/${idCTSP}/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateSL = (idCTSP, ma, Value) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/updateSL/${idCTSP}/${ma}/${Value}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateSL1 = (idCTSP, idHD) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/updateSL1/${idCTSP}/${idHD}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateKH = (ma, idKH) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/nguoi-dung/update-nguoi-dung/${ma}/${idKH}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateReturnKhachLe = (ma) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/nguoi-dung/update-khach-le/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateThanhTien = (idHD) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/update-thanh-tien/${idHD}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateVoucherToHD = (idHD, idVoucher) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/them-voucher/${idHD}/${idVoucher}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static thanhToanTienMat = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/thanh-toan/thanh-toan-tien-mat`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static thanhToanChuyenKhoan = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/thanh-toan/thanh-toan-chuyen-khoan`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };


  static thanhToanHoaDon = (ma,idNV,idVoucher) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/thanh-toan/hoa-don/${ma}/${idNV}/${idVoucher}`,
      headers: {
        Authorization: this.getToken,
      },
    });
    
  };

  static updateVanChuyen = (ma, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/update-van-chuyen/${ma}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static deleteVanChuyen = (ma) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/delete-van-chuyen/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static addBillClient = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/admin/ban-hang/addHDClient",
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getSLAndSLT = (idSP,ma) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/san-pham/so-luong/${idSP}/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateTienVanChuyen = (ma,tien) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/update-tien-van-chuyen/${ma}/${tien}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  }

  static getThanhTienbyMaHD = (ma) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/so-tien/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  }

  static voucherTotNhat = (idKH,money) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/voucher-tot-nhat/${idKH}/${money}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  }

  static voucherSapDatDuoc = (idKH,money,idV) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/khuyen-mai-sap-dat-duoc/${idKH}/${money}/${idV}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  }

  static detailHoaDon = (ma) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/detail-hoa-don/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  }
}