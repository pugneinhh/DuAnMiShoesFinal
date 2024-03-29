import {
    requestAdmin
} from "../request";

export class HoaDonAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `admin/hoa-don`,
            //   params: filter,
        });
    };

    static getAllbyTT = (trangThai) => {
        return requestAdmin({
            method: "GET",
            url: `admin/hoa-don/${trangThai}`,
            //   params: filter,
        });
    };

    static detailHD = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/hoa-don/detail-hoa-don/${id}`,
        });
    };
        static detailSanPham = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/hoa-don/hoa-don-san-pham/${id}`,
        });
    };
    static getAllLichSuHoaDon = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/hoa-don/detail-lich-su-hoa-don/${id}`,
        });
    };
       static getAllTimeLine = (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/hoa-don/ngay-hoa-don-time-line/${id}`,
        });
    };
    static updateTTHoaDon = (idHD,maNV,data) => {
        return requestAdmin({
          method: "PUT",
          url: `/admin/hoa-don/update-hoa-don/${idHD}/${maNV}`,
          data: data,
        });
    };
    static themSanPham = (idHD,maNV,idCTSP) => {
        return requestAdmin({
           method: "PUT",
           url: `/admin/hoa-don/them-san-pham/${idHD}/${idCTSP}/${maNV}`,
          // data: data, 
        });
    }
   static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/hoa-don/search`,
            data: data,
        });
    }; 
    static huyHoaDon = (id) => {
        return requestAdmin({
            method: "PUT",
            url: `/admin/hoa-don/huy-hoa-don/${id}`,
        })
    }
    
}