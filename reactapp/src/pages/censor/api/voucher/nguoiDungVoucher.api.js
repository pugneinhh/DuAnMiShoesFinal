import {
    requestAdmin
} from "../request";

export class NguoiDungVoucherAPI {
    static getAllByVoucher = (id) => {
        return requestAdmin({
          method: "GET",
          url: `/admin/nguoi-dung-voucher/voucher/${id}`,
          headers: {
            Authorization: this.getToken,
          },
        });
    };

    static getNguoiDungVoucher = (id) => {
        return requestAdmin({
          method: "GET",
          url: `/admin/nguoi-dung-voucher/ngv/${id}`,
          headers: {
            Authorization: this.getToken,
          },
        });
    };

    static create = (id,data) => {
        return requestAdmin({
          method: "POST",
          url: `/admin/nguoi-dung-voucher/add/${id}`,
          data: data,
          headers: {
            Authorization: this.getToken,
          },
        });
    };

    static delete = (idND,idV) => {
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/delete-ndv/${idND}/${idV}`,
          headers: {
            Authorization: this.getToken,
          },
        });
        
    };
    static updateTTNgung = (idV,idKH) => {
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/update/da-ket-thuc/${idV}/${idKH}`,
          headers: {
            Authorization: this.getToken,
          },
        });
    };
    static updateTTHD = (idV,idKH) => {
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/update/da-ket-thuc/${idV}/${idKH}`,
          headers: {
            Authorization: this.getToken,
          },
        });
    };
    static updateTTSap = (idV,idKH) => {
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/update/sap-bat-dau/${idV}/${idKH}`,
          headers: {
            Authorization: this.getToken,
          },
        });
    };

    static getByNguoiDung = (id) => {
        return requestAdmin({
          method: "GET",
          url: `/admin/nguoi-dung-voucher/nguoi-dung/${id}`,
          headers: {
            Authorization: this.getToken,
          },
        });
    };

    static getSearchKhachHang = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/nguoi-dung-voucher/searchKhachHang`,
            data: data,
                      headers: {
                'Authorization': this.getToken}
        });
    };
  
}