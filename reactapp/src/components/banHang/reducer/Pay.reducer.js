import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    SetPay: (state, action) => {
      return action.payload;
    },
    AddPay: (state, action) => {
      const data = action.payload;
      const index = state.findIndex((item) => item.id === data.id);
      if (index === -1) {
        const newPay = {
          stt: state.length + 1,
          id: data.id,
          hoaDon: data.hoaDon,
          phuongThuc: data.phuongThuc,
          tienMat: data.tienMat,
          chuyenKhoan: data.chuyenKhoan,
          tongTien: data.tongTien,
          phuongThucVNP: data.phuongThucVNP,
          moTa: data.moTa,
          ngayTao: data.ngayTao,
          ngaySua: data.ngaySua,
          nguoiTao: data.nguoiTao,
          nguoiSua: data.nguoiSua,
          trangThai: data.trangThai,
        };
        state.unshift(newPay);
        state.forEach((item, index) => {
          item.stt = index + 1;
        });
      }
    },
  },
});
export const {AddPay} = paySlice.actions;
export default paySlice.reducer;
export const GetPay = (state) => state.pay;