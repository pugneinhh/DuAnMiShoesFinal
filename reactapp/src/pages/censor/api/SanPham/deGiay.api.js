import {
    requestAdmin
} from "../request";

export class DeGiayAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/de-giay`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/de-giay/tim-kiem`,
            data: data,
        });
    }; 
    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/de-giay/add`,
            data: data,
        });
    };
    static update = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `admin/de-giay/update/${id}`,
            data: data,
        });
    };
    static detail= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/de-giay/detail/${id}`,
        });
    };
}