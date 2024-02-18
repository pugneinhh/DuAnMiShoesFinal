import {
    requestAdmin
} from "../request";

export class GioHangAPI{
    static getByIDKH = (idKH) => {
        return requestAdmin({
            method: "GET",
            url: `gio-hang/detailGH/${idKH}`,
            
        });
    };
    static getByID = (id) => {
        return requestAdmin({
            method: "GET",
            url: `gio-hang/detailGHByID/${id}`,
        });
    };
    static addGH = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'gio-hang/addGH',
            data: data,
        });
    };
    static getAllGHCTByIDGH = (id) => {
        return requestAdmin({
            method: "GET",
            url: `gio-hang-chi-tiet/getAll/${id}`,
        });
    };
    static addGHCT = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'gio-hang-chi-tiet/addGHCT',
            data: data,
        });
    };
    static updateSLGHCT = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'gio-hang-chi-tiet/updateSLGHCT',
            data: data,
        });
    };
}