import { requestAdmin } from "../request";

export class SellAPI{
    
    static getAllCustomers = () => {
        return requestAdmin({
            method: 'GET',
            url: '/admin/khach-hang'
        });
    };

    static getAllSizes = () => {
        return requestAdmin({
            method : 'GET',
            url: '/admin/kich-thuoc'
        });
    };

    static getAllColors = () => {
        return requestAdmin({
            method : 'GET',
            url: '/admin/mau-sac'
        });
    };

    static getAllMeterials = () => {
        return requestAdmin({
            method : 'GET',
            url: '/admin/chat-lieu'
        });
    };

    static getAllSoles = () => {
        return requestAdmin({
            method : 'GET',
            url: '/admin/de-giay'
        });
    };

    static getAllCategories = () => {
        return requestAdmin({
            method : 'GET',
            url: '/admin/danh-muc'
        });
    };

    static getAllBrands = () => {
        return requestAdmin({
            method : 'GET',
            url: '/admin/hang'
        });
    };

    static getAllProducts = () => {
        return requestAdmin({
            method : 'GET',
            url: '/ban-hang/getALLCTSP'
        });
    };

    static addBill = (data) => {
        return requestAdmin({
            method : 'POST',
            url: '/ban-hang/add-hoa-don',
            data: data,
        });
    };

    static addInvoice = (data) => {
        return requestAdmin({
            method : 'POST',
            url: '/ban-hang/addHDCT',
            data: data,
        });
    };

    static getLinkVnpay = (data,money) => {
        return requestAdmin({
            method : 'GET',
            url: `/vnpayment/chuyen-khoan/${data}/${money}`,
        });
    };
}