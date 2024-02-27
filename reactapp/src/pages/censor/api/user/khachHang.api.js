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
    static timKiem = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/khach-hang/search`,
            data: data,
        });
    }; 
    static getDiaChiByKH= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/khach-hang/dia-chi/${id}`,
        });
    };
    static getDiaChiMacDinh= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/khach-hang/dia-chi-mac-dinh/${id}`,
        });
    };
    static updateDiaChiMacDinh= (id) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/khach-hang/update-tt-dc/${id}`,
        });
    };

    static updateDiaChiByID= (id,data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/khach-hang/update-dia-chi/${id}`,
            data: data,
        });
    };

    static addDCKH = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/khach-hang/add-dia-chi`,
            data: data,
        });
    }; 
}