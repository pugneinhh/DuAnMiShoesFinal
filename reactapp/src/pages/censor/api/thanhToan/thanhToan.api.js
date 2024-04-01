import { getHeader,requestAdmin } from "../request";

export class ThanhToanAPI {
  static LichSuThanhToanByIdHD = (idHD) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/thanh-toan/${idHD}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
