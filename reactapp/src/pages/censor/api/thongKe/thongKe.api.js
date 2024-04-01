import { getHeader, requestAdmin } from "../request";

export class ThongKeAPI {
    static getToken = getHeader();
    static getAllThongKeNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/ngay`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static getAllThongKeThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/thang`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static getAllThongKeNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/nam`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static getDoanhThuNgayTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-ngay-truoc`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static getDoanhThuThangTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-thang-truoc`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static getDoanhThuNamTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-nam-truoc`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static bieuDoNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-ngay`,
            //   params: filter,
        });
    };
    static bieuDoTuan = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-tuan`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static bieuDoThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-thang`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static bieuDoNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-nam`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-thang`,
            headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-ngay`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonTuan = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-tuan`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-nam`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };

    static sanPhamBanChayThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-thang`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static sanPhamBanChayTuan = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-tuan`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static sanPhamBanChayNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-ngay`,
            //   params: filter,
            headers: {
                'Authorization': this.getToken}
        });
    };
    static sanPhamBanChayNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-nam`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static sanPhamSapHet = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-sap-het`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static loadSanPhamNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-ngay`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
    static loadSanPhamNgayTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-ngay-truoc`, headers: {
                'Authorization': this.getToken}
            //   params: filter,
        });
    };
}    