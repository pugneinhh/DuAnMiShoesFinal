import { getHeader, requestAdmin } from "../request";

export class SanPhamAPI {
  
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham`,
      headers: {
        Authorization: getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `admin/san-pham/tim-kiem`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
