import { requestAdmin } from "../request";

export class ThanhToanAPI {
  static LichSuThanhToanByIdHD = (idHD) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/thanh-toan/${idHD}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
