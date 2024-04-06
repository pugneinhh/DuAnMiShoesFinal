import { getHeader, requestAdmin } from "../request";

export class TraHangAPI{
    static getHoaDonByMa = (ma) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/tra-hang/hoa-don/${ma}`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
}