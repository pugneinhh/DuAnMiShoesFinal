import { getHeader, requestAdmin } from "../request";

export class MauSacAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/mau-sac`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/mau-sac/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/mau-sac/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `admin/mau-sac/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/mau-sac/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
