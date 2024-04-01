import { getHeader, requestAdmin } from "../request";

export class DeGiayAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/de-giay`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/de-giay/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/de-giay/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `admin/de-giay/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/de-giay/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
