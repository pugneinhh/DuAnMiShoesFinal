import { requestAdmin } from "../request";

export class NguoiDungAPI {
  static getALLNguoiDung = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/nguoi-dung`,
      //   params: filter,
    });
  };

}
