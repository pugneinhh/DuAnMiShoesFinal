import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { SellAPI } from "../../pages/censor/api/sell/sell.api";

const initialState = [];

//     const id = uuid();
//     return [
//       {
//         stt: 1,
//         id: id,
//         ma: `HDTQ1`,
//         nhanVien: "Phanh",
//         nguoiDung: null,
//         voucher: null,
//         ngayMua: null,
//         giaGoc: 0,
//         giaGiamGia: 0,
//         thanhTien: 0,
//         diemSuDung: 0,
//         giaTriDiem: null,
//         tenNguoiNhan: null,
//         soDienThoai: null,
//         diaChi: null,
//         qrCode: null,
//         ghiChu: null,
//         ngayDuKienNhan: null,
//         ngayNhan: "null",
//         ngayTraHang: null,
//         nguoiTao: "Phanh",
//         nguoiSua: null,
//         ngaySua: null,
//         trangThai: 0,
//         key: id,
//       },
//  ];

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    SetBill: (state, action) => {
      return action.payload;
    },
    CreateBill: (state, action) => {
      console.log("Dài", state.length);
      const data = action.payload;
      const index = state.findIndex((period) => period.id === data.id);
      if (index !== -1) return;
      const newBill = {
        stt: state.length + 1,
        id: data.id,
        ma: data.ma,
        trangThai: 0,
        key: data.key,
        tenNguoiDung: data.tenNguoiDung,
        // ngayTao : data.ngayTao,
        loaiHoaDon: 1,
        nhanVien: data.nhanVien,
        nguoiDung: data.nguoiDung,
        voucher: data.voucher,
        ngayMua: data.ngayMua,
        giaGoc: data.giaGoc,
        giaGiamGia: data.giaGiamGia,
        thanhTien: data.thanhTien,
        diemSuDung: null,
        giaTriDiem: data.giaTriDiem,
        tenNguoiNhan: data.tenNguoiNhan,
        soDienThoai: data.soDienThoai,
        diaChi: data.diaChi,
        qrCode: data.qrCode,
        ghiChu: data.ghiChu,
        ngayDuKienNhan: data.ngayDuKienNhan,
        ngayNhan: data.ngayNhan,
        ngayTraHang: data.ngayTraHang,
        nguoiTao: data.nguoiTao,
        //  nguoiSua: data.nguoiSua,
        //  ngaySua: data.ngaySua,
        gtNguoiDung: null,
        email: data.email,
        diemNguoiDung: null,
        tienVanChuyen: data.tienVanChuyen,
      };
      state.unshift(newBill);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
    UpdateBill: (state, action) => {
      const updatedBill = action.payload; // backend
      const index = state.findIndex((period) => period.key === updatedBill.key);
      console.log(updatedBill.giaGoc);
      if (index !== -1) {
        state[index].ngaySua = updatedBill.ngaySua;
        state[index].ngayThanhToan = updatedBill.ngayThanhToan;
        state[index].voucher = updatedBill.voucher;
        state[index].ngayMua = updatedBill.ngayMua;
        state[index].giaGoc = updatedBill.giaGoc;
        state[index].giaGiam = updatedBill.giaGiam;
        state[index].thanhTien =
          parseFloat(!updatedBill.giaGoc ? 0 : updatedBill.giaGoc) -
          parseFloat(!updatedBill.giaGiamGiam ? 0 : updatedBill.giaGiam);
        state[index].diemSuDung = updatedBill.diemSuDung;
        state[index].giaTriDiem = updatedBill.giaTriDiem;
      }
    },
    RemoveBill: (state, action) => {
      return state.filter((item) => item.key !== action.payload.key);
    },
    GetBillByKey: (state, action) => {
      const data = action.payload;
      const index = state.findIndex((period) => period.key === data.activeKey);

      console.log("Bill", state[index]);
      return state[index];
    },
    UpdateKHToBill: (state, action) => {
      const updatedBill = action.payload; // backend
      const index = state.findIndex((period) => period.key === updatedBill.key);
      console.log(index);
      console.log(updatedBill);
      if (index !== -1) {
        state[index].nguoiDung = updatedBill.nguoiDung;
        state[index].tenNguoiDung = updatedBill.tenNguoiDung;
        state[index].gtNguoiDung = updatedBill.gtNguoiDung;
        state[index].diemNguoiDung = updatedBill.diemNguoiDung;
      }
    },

    UpdateVoucherToBill: (state, action) => {
      const updatedBill = action.payload; // backend
      const index = state.findIndex((period) => period.key === updatedBill.key);
      console.log(index);
      console.log(updatedBill);
      if (index !== -1) {
        state[index].voucher = updatedBill.voucher;
      }
    },
    UpdateNullClient: (state, action) => {
      const updatedBill = action.payload; // backend
      const index = state.findIndex((period) => period.key === updatedBill.key);
      if (index !== -1) {
        state[index].nguoiDung = null;
        state[index].tenNguoiDung = null;
        state[index].gtNguoiDung = null;
        state[index].diemNguoiDung = null;
      }
    },
    UpdateNullVoucher: (state, action) => {
      const updatedBill = action.payload; // backend
      const index = state.findIndex((period) => period.key === updatedBill.key);
      if (index !== -1) {
        state[index].voucher = null;
      }
    },
    UpdateVanChuyenToBill: (state, action) => {
      const updatedBill = action.payload; // backend
      const index = state.findIndex((period) => period.key === updatedBill.key);
      console.log(index);
      console.log(updatedBill);
      if (index !== -1) {
        state[index].tenNguoiNhan = updatedBill.tenNguoiNhan;
        state[index].email = updatedBill.email;
        state[index].soDienThoai = updatedBill.soDienThoai;
        state[index].tienVanChuyen = updatedBill.tienVanChuyen;
        state[index].ngayDuKienNhan = updatedBill.ngayDuKienNhan;
        state[index].diaChi = updatedBill.diaChi;
      }
    },
  },
});

export const {
  SetBill,
  CreateBill,
  UpdateBill,
  RemoveBill,
  GetBillByKey,
  UpdateKHToBill,
  UpdateNullClient,
  UpdateNullVoucher,
  UpdateVoucherToBill,
  UpdateVanChuyenToBill,
} = billSlice.actions;
export default billSlice.reducer;
export const GetBill = (state) => state.bill;
