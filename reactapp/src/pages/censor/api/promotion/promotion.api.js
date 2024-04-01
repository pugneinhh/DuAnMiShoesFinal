import { getHeader, requestAdmin } from "../request";

export class PromotionAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khuyen-mai/hien-thi`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/admin/khuyen-mai/add",
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khuyen-mai/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateAutoClose = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateAutoStart = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai1/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateClosePromotion = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai2/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateOpenPromotion = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai3/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khuyen-mai/search-khuyen-mai`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateProductByPromotion = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ctsp/updateKM/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static showProductByPromotion = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/showKM/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static deletePromotion = (id) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/ctsp/deleteKM/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static showSPByProduct = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham/showSP/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static loadCTSPBySP = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/showCTSP/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static loadSP = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
