import {
    requestClient
} from "../request";

export class BanHangClientAPI{
    static addHD = (data) => {
        return requestClient({
            method : 'POST',
            url: 'ban-hang-client/add-hoa-don',
            data: data,
        });
    };

    static checkout = (data) => {
      return requestClient({
          method : 'POST',
          url: 'ban-hang-client/check-out',
          data: data,
      });
  };

    static addHDCT = (data) => {
        return requestClient({
            method : 'POST',
            url: 'ban-hang-client/addHDCT',
            data: data,
        });
    };
    static updateVoucherToHD = (idHD, idVoucher) => {
        return requestClient({
          method: "PUT",
          url: `ban-hang-client/them-voucher/${idHD}/${idVoucher}`,
        });
      };
    static thanhToanTienMat = (data) => {
        return requestClient({
          method: "POST",
          url: `ban-hang-client/thanh-toan-tien-mat`,
          data: data,
        });
    };
    static thanhToanChuyenKhoan = (data) => {
        return requestClient({
          method: "POST",
          url: `ban-hang-client/thanh-toan-chuyen-khoan`,
          data: data,
        });
    };
    static thanhToanHoaDon = (id) => {
        return requestClient({
          method: "PUT",
          url: `ban-hang-client/thanh-toan-hoa-don/${id}`,
        });
    };
    static getLinkVnpay = ( money) => {
        return requestClient({
          method: "POST",
          url: `ban-hang-client/chuyen-khoan/${money}`,
        });
      };
}