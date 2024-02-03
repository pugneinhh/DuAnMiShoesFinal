import { requestAdmin } from "../request";

export class LoginAPI {
    //Đăng nhập
    static login = (dataLogin) => {
        return requestAdmin({
            method: "POST",
            url: `/api/login`,
            data: dataLogin
        });
    };
}