import { requestAdmin } from "../request";

export class HomeAPI {
    //Get sản phẩm mới
    static getAllNewSanPham = () => {
        return requestAdmin({
            method: "GET",
            url: `/home/new`,
        });
    };   
     //Get sản phẩm hot
    static getHotSale = () => {
        return requestAdmin({
            method: "GET",
            url: `/home/hot`,
        });
    };
    //Get sản phẩm
    static getAllSanPham = () => {
        return requestAdmin({
            method: "GET",
            url: `/home`,
        });
    };
    //Get giá
    static getGia = (tenSP) => {
        return requestAdmin({
            method: "GET",
            url: `/home/${tenSP}`,
        });
    };
}