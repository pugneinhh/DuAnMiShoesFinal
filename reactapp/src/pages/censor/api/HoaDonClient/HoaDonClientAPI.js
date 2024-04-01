import {
  requestClient
} from "../request";

export class HoaDonClientAPI {
  static getALLHoaDonOnlineByIdKH = (data) => {
    return requestClient({
      method: "POST",
      url: `/client-hoa-don`,
      data: data,
    });
  };

  static getALLChiTietSanPhamClientOlByIdHD = (id) => {
    return requestClient({
      method: "GET",
      url: `/client-hoa-don/hoa-don/${id}`,
      //   params: filter,
    });
  };
  static DetailHoaDonClient = (idHD) => {
    return requestClient({
      method: "GET",
      url: `/client-hoa-don/detail-hoa-don/${idHD}`,
    });
  };
  static SearchHDClient = (data) => {
    return requestClient({
      method: "POST",
      url: `/client-hoa-don/search`,
      data: data,
    });
  };
}