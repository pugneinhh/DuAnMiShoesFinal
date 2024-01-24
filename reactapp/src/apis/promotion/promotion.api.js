import {requestAdmin} from "../../helper/request";

export class PromotionAPI{
    static fetchAll = (filter) => {
        return requestAdmin({
            method: 'GET',
            url: `/admin/khuyen-mai`,
            params: filter,
        });
    };
    
    static getAll = (filter) => {
        return requestAdmin({
            method: 'GET',
            url: `/admin/khuyen-mai/hien-thi`,
            params: filter,
        });
    };

    static create = (data) => {
        return requestAdmin({
            method : "POST",
            url : "/admin/khuyen-mai/add",
            data:data,
       });
    };

    static update = (data) => {
        return requestAdmin({
            method: "PUT",
            url: "/admin/khuyen-mai/update",
            data:data,
        });
    };
}