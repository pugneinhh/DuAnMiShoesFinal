import { getHeader, requestAdmin } from "../request";

export class VoucherAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `admin/voucher`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/voucher/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateTTHD = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTHD/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateTTNgung = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTNgung/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateTTSap = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTSap/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateTTTamDung = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTTamDung/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/voucher/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/voucher/search-voucher`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
