import { requestAdmin } from "../request";

export class NhanVienAPI {
    static fetchAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/employee`,
            //   params: filter,
        });
    };

    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/nhan-vien`,
            data: data,
        });
    };

    static update = (data) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/nhan-vien`,
            data: data,
        });
    };

    static updateStatus = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/employee/update`,
            data: data,
        });
    };

    static getOneByIdUser = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/nhan-vien/${id}`,
        });
    };
}