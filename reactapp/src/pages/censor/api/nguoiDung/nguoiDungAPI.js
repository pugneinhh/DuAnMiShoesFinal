import {getHeader,requestAdmin } from "../request";

export class NguoiDungAPI {
  static getALLNguoiDung = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/nguoi-dung`,
      //   params: filter,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static getDiaChiByIDND = (id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang/ban-hang/dia-chi/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static doiMatKhau = (id, data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/nguoi-dung/doi-mat-khau//${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static soSanhMk = (id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/nguoi-dung/MK/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
