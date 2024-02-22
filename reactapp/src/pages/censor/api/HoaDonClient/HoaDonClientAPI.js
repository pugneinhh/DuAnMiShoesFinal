import {
    requestAdmin
} from "../request";

export class HoaDonClientAPI {
    static getALLHoaDonOnlineByIdKH = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/client-hoa-don`,
            data: data,
        });
    };

    static getALLChiTietSanPhamClientOlByIdHD = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/client-hoa-don/hoa-don/${id}`,
            //   params: filter,
        });
    };  
   static DetailHoaDonClient = (idHD) => {
        return requestAdmin({
          method: "GET",
          url: `/client-hoa-don/detail-hoa-don/${idHD}`,
        });
    }; 
   
}