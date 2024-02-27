import { requestAdmin } from "../request";

export class NguoiDungAPI {
  static getALLNguoiDung = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/nguoi-dung`,
      //   params: filter,
    });
  };
  static getDiaChiByIDND = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang/ban-hang/dia-chi/${id}`,
    });
  }
}
