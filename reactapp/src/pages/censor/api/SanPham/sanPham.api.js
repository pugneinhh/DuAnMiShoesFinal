import { getHeader, requestAdmin } from "../request";

export class SanPhamAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `admin/san-pham/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
