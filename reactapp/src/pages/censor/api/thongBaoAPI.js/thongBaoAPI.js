import { getHeader, requestAdmin,requestClient } from "../request";

export class ThongBaoAPI {
  static getToken = getHeader();
  static getALlThongBaoAdmin = () => {

    // return requestAdmin.get(`/admin/thong-bao/getAll`);
    return requestAdmin({
      method: "GET",
      url: `/admin/thong-bao/getAll`,
      headers: {
        'Authorization': this.getToken}
      //   params: filter,
    });
  };

  static countThongBaoAdmin = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/thong-bao/count`,
      headers: {
        'Authorization': this.getToken}
      //   params: filter,
    });
  };

  static getALlThongBaoKH = (tokens) => {
    return requestClient({
      method: "GET",
      url: `/KH/thong-bao/getAll`,
      params: { token: tokens },
    });
  };

  static countThongBaoKH = (tokens) => {
    return requestClient({
      method: "GET",
      url: `/KH/thong-bao/count`,
      params: { token: tokens },
    });
  };

  static updateStatus = (id) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/thong-bao/da-xem/${id}`,
      //   params: filter,
    });
  };
}    