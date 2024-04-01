import { getHeader, requestAdmin } from "../request";

export class NhanVienAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `admin/nhan-vien`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/nhan-vien`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/nhan-vien`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateStatus = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/employee/update`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getOneByIdUser = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/nhan-vien/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static timKiem = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/nhan-vien/search`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
