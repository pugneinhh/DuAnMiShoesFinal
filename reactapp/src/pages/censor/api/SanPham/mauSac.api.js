import {
    requestAdmin
} from "../request";

export class MauSacAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/mau-sac`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/mau-sac/tim-kiem`,
            data: data,
        });
    }; 
    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/mau-sac/add`,
            data: data,
        });
    };
    static update = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `admin/mau-sac/update/${id}`,
            data: data,
        });
    };
    static detail= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/mau-sac/detail/${id}`,
        });
    };
}