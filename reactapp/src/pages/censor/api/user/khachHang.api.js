import { getHeader, requestAdmin, requestClient } from "../request";

export class KhachHangAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khach-hang`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khach-hang`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateStatus = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khach-hang/update`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static getOneByIdUser = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static timKiem = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khach-hang/search`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getDiaChiByKH = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang/dia-chi/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getDiaChiMacDinh = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang/dia-chi-mac-dinh/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateDiaChiMacDinh = (id) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khach-hang/update-tt-dc/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateDiaChiByID = (id, data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khach-hang/update-dia-chi/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static addDCKH = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khach-hang/add-dia-chi`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getDiaChiByKHClient = (id) => {
    return requestClient({
      method: "GET",
      url: `/khach-hang/dia-chi/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getDiaChiMacDinhKHClient = (id) => {
    return requestClient({
      method: "GET",
      url: `/khach-hang/dia-chi-mac-dinh/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateDiaChiMacDinhKHClient = (id) => {
    return requestClient({
      method: "POST",
      url: `/khach-hang/update-tt-dc/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static updateDiaChiByIDKHClient = (id, data) => {
    return requestClient({
      method: "POST",
      url: `/khach-hang/update-dia-chi/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static addDCKHClient = (data) => {
    return requestClient({
      method: "POST",
      url: `/khach-hang/add-dia-chi`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
