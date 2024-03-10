import { requestAdmin } from "../request";

export class ThongBaoAPI {
    static getALlThongBaoAdmin = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-bao/getAll`,
            //   params: filter,
        });
    };

    static countThongBaoAdmin = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-bao/count`,
            //   params: filter,
        });
    };

    static getALlThongBaoKH = (filter) => {
        return requestAdmin({
            method: "GET",
            url: `/KH/thong-bao/getAll`,
            params: filter,
        });
    };

    static countThongBaoKH = (filter) => {
        return requestAdmin({
            method: "GET",
            url: `/KH/thong-bao/count`,
            params: filter,
        });
    };
 
}    