import {
    requestAdmin
} from "../request";

export class BanHangClientAPI{
    static addHD = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'ban-hang-client/add-hoa-don',
            data: data,
        });
    };

    static checkout = (data) => {
      return requestAdmin({
          method : 'POST',
          url: 'ban-hang-client/check-out',
          data: data,
      });
  };

    static addHDCT = (data) => {
        return requestAdmin({
            method : 'POST',
            url: 'ban-hang-client/addHDCT',
            data: data,
        });
    };
    static updateVoucherToHD = (idHD, idVoucher) => {
        return requestAdmin({
          method: "PUT",
          url: `ban-hang-client/them-voucher/${idHD}/${idVoucher}`,
        });
      };
    static thanhToanTienMat = (data) => {
        return requestAdmin({
          method: "POST",
          url: `ban-hang-client/thanh-toan-tien-mat`,
          data: data,
        });
    };
    static thanhToanChuyenKhoan = (data) => {
        return requestAdmin({
          method: "POST",
          url: `ban-hang-client/thanh-toan-chuyen-khoan`,
          data: data,
        });
    };
    static thanhToanHoaDon = (id) => {
        return requestAdmin({
          method: "PUT",
          url: `ban-hang-client/thanh-toan-hoa-don/${id}`,
        });
    };
    static getLinkVnpay = ( money) => {
        return requestAdmin({
          method: "POST",
          url: `ban-hang-client/chuyen-khoan/${money}`,
        });
      };
}