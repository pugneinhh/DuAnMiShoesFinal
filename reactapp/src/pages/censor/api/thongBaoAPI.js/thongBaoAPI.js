import { requestAdmin } from "../request";

export class ThongBaoAPI {
  static getALlThongBaoAdmin = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/thong-bao/getAll`,
      //   params: filter,
    });
  };

  static countThongBaoAdmin = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/thong-bao/count`,
      //   params: filter,
    });
  };

  static getALlThongBaoKH = (tokens) => {
    return requestAdmin({
      method: "GET",
      url: `/KH/thong-bao/getAll`,
      params: { token: tokens },
    });
  };

  static countThongBaoKH = (tokens) => {
    return requestAdmin({
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