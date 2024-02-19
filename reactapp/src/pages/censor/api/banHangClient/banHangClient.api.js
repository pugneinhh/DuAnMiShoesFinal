import {
    requestAdmin
} from "../request";

export class BanHangClientAPI{
    static addHD = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'ban-hang-client/add-hoa-don',
            data: data,
        });
    };
    static addHDCT = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'ban-hang-client/addHDCT',
            data: data,
        });
    };
}