import { getHeader, requestAdmin } from "../request";

export class ChiTietSanPhamAPI {
  static getToken = getHeader();

  static showCTSP = (data) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/show`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static showCTSPBySanPhamId = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/showct/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static showCTSPKT = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/search/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static showAllCTSP = (data) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/detailsp`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static showDetailCTSP = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static createCTSP = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/ctsp/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateCTSP = (id,data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/ctsp/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static searchCTSP = (id,data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/ctsp/search-ctsp/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static searchCTSPBanHang = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/ctsp/search-ctsp-banhang`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllSanPham = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham/getAll`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createSanPham = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/san-pham/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllKichThuoc = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/kich-thuoc`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createKichThuoc = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/kich-thuoc/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllMauSac = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/mau-sac`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createMauSac = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/mau-sac/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllChatLieu = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/chat-lieu`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createChatLieu = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/chat-lieu/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllDeGiay = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/de-giay`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createDeGiay = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/de-giay/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllDanhMuc= () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/danh-muc`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createDanhMuc = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/danh-muc/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getAllHang= () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hang`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static createHang = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/hang/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
