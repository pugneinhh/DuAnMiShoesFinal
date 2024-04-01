import { getHeader, requestAdmin } from "../request";

export class HoaDonAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `admin/hoa-don`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static getAllbyTT = (trangThai) => {
    return requestAdmin({
      method: "GET",
      url: `admin/hoa-don/${trangThai}`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };


  static detailHD = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detailSanPham = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/hoa-don-san-pham/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getAllLichSuHoaDon = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-lich-su-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getAllTimeLine = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/ngay-hoa-don-time-line/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateTTHoaDon = (id, maNV, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/update-hoa-don/${id}/${maNV}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/hoa-don/search`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static huyHoaDon = (id) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/huy-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}

