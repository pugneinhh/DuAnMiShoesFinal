import {
    requestAdmin
} from "../request";

export class KichThuocAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/kich-thuoc`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/kich-thuoc/tim-kiem`,
            data: data,
        });
    }; 
    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/kich-thuoc/add`,
            data: data,
        });
    };
    static update = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `admin/kich-thuoc/update/${id}`,
            data: data,
        });
    };
    static detail= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/kich-thuoc/detail/${id}`,
        });
    };
}