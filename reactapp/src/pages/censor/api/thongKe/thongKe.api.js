import { requestAdmin } from "../request";

export class ThongKeAPI {
    static getAllThongKeNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/ngay`,
            //   params: filter,
        });
    };
    static getAllThongKeThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/thang`,
            //   params: filter,
        });
    };
    static getAllThongKeNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/nam`,
            //   params: filter,
        });
    };
    static getDoanhThuNgayTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-ngay-truoc`,
            //   params: filter,
        });
    };
    static getDoanhThuThangTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-thang-truoc`,
            //   params: filter,
        });
    };
    static getDoanhThuNamTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-nam-truoc`,
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
            //   params: filter,
        });
    };
    static bieuDoThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-thang`,
            //   params: filter,
        });
    };
    static bieuDoNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-nam`,
            //   params: filter,
        });
    };
    static trangThaiHoaDonThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-thang`,
            //   params: filter,
        });
    };
    static trangThaiHoaDonNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-ngay`,
            //   params: filter,
        });
    };
    static trangThaiHoaDonTuan = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-tuan`,
            //   params: filter,
        });
    };
    static trangThaiHoaDonNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-nam`,
            //   params: filter,
        });
    };

    static sanPhamBanChayThang = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-thang`,
            //   params: filter,
        });
    };
    static sanPhamBanChayTuan = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-tuan`,
            //   params: filter,
        });
    };
    static sanPhamBanChayNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-ngay`,
            //   params: filter,
        });
    };
    static sanPhamBanChayNam = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-nam`,
            //   params: filter,
        });
    };
    static sanPhamSapHet = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-sap-het`,
            //   params: filter,
        });
    };
    static loadSanPhamNgay = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-ngay`,
            //   params: filter,
        });
    };
    static loadSanPhamNgayTruoc = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-ngay-truoc`,
            //   params: filter,
        });
    };
}    