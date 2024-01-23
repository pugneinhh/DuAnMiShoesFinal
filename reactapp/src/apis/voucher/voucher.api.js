import { requestAdmin } from "../../helper/request";

export class SoleAPI {
  static fetchAll = (filter) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/voucher`,
      params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/voucher`,
      data: data,
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher`,
      data: data,
    });
  };
}
