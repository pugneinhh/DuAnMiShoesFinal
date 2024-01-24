import { requestAdmin } from "../request";

export class KhachHangAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/khach-hang`,
            //   params: filter,
        });
    };

    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/khach-hang`,
            data: data,
        });
    };

    static update = (data) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/khach-hang`,
            data: data,
        });
    };

    static updateStatus = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/khach-hang/update`,
            data: data,
        });
    };

    static getOneByIdUser = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/khach-hang/${id}`,
        });
    };
    // static getAddressByUser = (id) => {
    //     return requestAdmin({
    //         method: "GET",
    //         url: `/admin/khach-hang/dia-chi/${id}`,
    //     });
    // };
}