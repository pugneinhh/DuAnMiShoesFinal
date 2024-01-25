import {
    requestAdmin
} from "../request";

export class SanPhamAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/san-pham`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `admin/san-pham/tim-kiem`,
            data: data,
        });
    }; 

}