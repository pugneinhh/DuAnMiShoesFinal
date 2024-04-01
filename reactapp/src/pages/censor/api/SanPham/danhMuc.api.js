import { getHeader, requestAdmin } from "../request";

export class DanhMucAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/danh-muc`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/danh-muc/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/danh-muc/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateDM = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `admin/danh-muc/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detailDM = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/danh-muc/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
