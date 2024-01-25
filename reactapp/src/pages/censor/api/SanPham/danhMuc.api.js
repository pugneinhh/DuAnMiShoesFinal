import {
    requestAdmin
} from "../request";

export class DanhMucAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/danh-muc`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/danh-muc/tim-kiem`,
            data: data,
        });
    }; 
    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/danh-muc/add`,
            data: data,
        });
    };
    static updateDM = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `admin/danh-muc/update/${id}`,
            data: data,
        });
    };
    static detailDM = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/danh-muc/detail/${id}`,
        });
    };
}