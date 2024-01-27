import {
    requestAdmin
} from "../request";

export class NguoiDungVoucherAPI {
    static getAllByVoucher = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/nguoi-dung-voucher/voucher/${id}`,
        });
    };

    static getNguoiDungVoucher = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/nguoi-dung-voucher/ngv/${id}`,
        });
    };

    static create = (id,data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/nguoi-dung-voucher/add/${id}`,
            data: data,
        });
    };

    static delete = (idND,idV) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/nguoi-dung-voucher/delete-ndv/${idND}/${idV}`,
        });
    };
    static updateTTNgung = (idV,idKH) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/nguoi-dung-voucher/update/da-ket-thuc/${idV}/${idKH}`,

        });
    };
    static updateTTHD = (idV,idKH) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/nguoi-dung-voucher/update/da-ket-thuc/${idV}/${idKH}`,
          
        });
    };
    static updateTTSap = (idV,idKH) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/nguoi-dung-voucher/update/sap-bat-dau/${idV}/${idKH}`,
           
        });
    };

    static getByNguoiDung = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/nguoi-dung-voucher/nguoi-dung/${id}`,
        });
    };
  
}