import {
    requestAdmin
} from "../request";

export class HangAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/hang`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/hang/tim-kiem`,
            data: data,
        });
    }; 
    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/hang/add`,
            data: data,
        });
    };
    static update = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `admin/hang/update/${id}`,
            data: data,
        });
    };
    static detail= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/hang/detail/${id}`,
        });
    };
}