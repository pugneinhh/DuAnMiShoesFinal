import {
    requestAdmin
} from "../request";

export class VoucherAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `admin/voucher`,
            //   params: filter,
        });
    };

    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/voucher/add`,
            data: data,
        });
    };

    static update = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/voucher/update/${id}`,
            data: data,
        });
    };

    static updateTTHD = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/voucher/updateTTHD/${id}`,
            data: data,
        });
    };
    static updateTTNgung = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/voucher/updateTTNgung/${id}`,
            data: data,
        });
    };
    static updateTTSap = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/voucher/updateTTSap/${id}`,
            data: data,
        });
    };

    static detail = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/voucher/detail/${id}`,
        });
    };
   static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/voucher/search-voucher`,
            data: data,
        });
    }; 

}