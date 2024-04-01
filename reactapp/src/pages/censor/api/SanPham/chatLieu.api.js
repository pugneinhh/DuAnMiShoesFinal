import { getHeader, requestAdmin } from "../request";

export class ChatLieuAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/chat-lieu`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/chat-lieu/tim-kiem`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/chat-lieu/add`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `admin/chat-lieu/update/${id}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/chat-lieu/detail/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}
