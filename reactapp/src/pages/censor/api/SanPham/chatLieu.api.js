import {
    requestAdmin
} from "../request";

export class ChatLieuAPI {
    static getAll = () => {
        return requestAdmin({
            method: "GET",
            url: `/admin/chat-lieu`,
            //   params: filter,
        });
    };
    static search = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/chat-lieu/tim-kiem`,
            data: data,
        });
    }; 
    static create = (data) => {
        return requestAdmin({
            method: "POST",
            url: `/admin/chat-lieu/add`,
            data: data,
        });
    };
    static update = (id,data) => {
        return requestAdmin({
            method: "PUT",
            url: `admin/chat-lieu/update/${id}`,
            data: data,
        });
    };
    static detail= (id) => {
        return requestAdmin({
            method: "GET",
            url: `/admin/chat-lieu/detail/${id}`,
        });
    };
}