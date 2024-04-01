import { getHeader, requestAdmin } from "../request";

export class HangAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hang`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/hang/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/hang/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `admin/hang/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hang/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
