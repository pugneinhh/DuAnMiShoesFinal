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
  static doiMatKhau = (idNV, data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/nguoi-dung/doi-mat-khau/${idNV}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static doiMatKhauClient = (idNV, data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/khach-hang/doi-mat-khau/${idNV}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
