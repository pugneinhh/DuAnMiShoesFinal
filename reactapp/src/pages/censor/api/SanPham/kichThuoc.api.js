import { getHeader, requestAdmin } from "../request";

export class KichThuocAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/kich-thuoc`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/kich-thuoc/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/kich-thuoc/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `admin/kich-thuoc/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/kich-thuoc/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
