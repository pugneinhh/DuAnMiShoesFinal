import {
    createSlice
} from "@reduxjs/toolkit";
import {
    v4 as uuid
} from 'uuid';
const initialState = [];
const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        SetBill: (state, action) => {
            return action.payload;
        },
        CreateBill: (state, action) => {
            const data = action.payload;
            const newBill = {
                stt: state.length + 1,
                id: uuid(),
                ma: data.ma,
                trangThai: 0,
                key: data.key,
                ngayTao: new Date().getTime(),
                loaiHoaDon: 0,
                nhanVien: data.nhanVien,
                nguoiDung: data.nguoiDung,
                voucher: data.voucher,
                ngayMua: data.ngayMua,
                giaGoc: data.giaGoc,
                giaGiamGia: data.giaGiamGia,
                thanhTien: data.thanhTien,
                diemSuDung: data.diemSuDung,
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
                nguoiSua: data.nguoiSua,
                ngaySua: data.ngaySua,
            };
            state.unshift(newBill);
            state.forEach((item, index) => {
                item.stt = index + 1;
            });
        },
        UpdateBill: (state, action) => {
            const updatedBill = action.payload; // backend
            const index = state.findIndex((period) => period.id === updatedBill.id);
            console.log(index);
            if (index !== -1) {
                state[index].ma = updatedBill.name;
                state[index].ngaySua = updatedBill.ngaySua;
                state[index].ngayThanhToan = updatedBill.ngayThanhToan;
                state[index].nguoiDung = updatedBill.nguoiDung;
                state[index].voucher = updatedBill.voucher;
                state[index].ngayMua = updatedBill.ngayMua;
                state[index].giaGoc = updatedBill.giaGoc;
                state[index].giaGiam = updatedBill.giaGiam;
                state[index].thanhTien = updatedBill.thanhTien;
                state[index].diemSuDung = updatedBill.diemSuDung;
                state[index].giaTriDiem = updatedBill.giaTriDiem;
                state[index].tenNguoiNhan= updatedBill.tenNguoiNhan;
                state[index].soDienThoai= updatedBill.soDienThoai;
                state[index].diaChi= updatedBill.diaChi;
                state[index].qrCode= updatedBill.qrCode;
                state[index].ghiChu= updatedBill.ghiChu;
                state[index].ngayDuKienNhan= updatedBill.ngayDuKienNhan;
                state[index].ngayNhan= updatedBill.ngayNhan;
                state[index].ngayTraHang= updatedBill.ngayTraHang;
                state[index].nguoiSua= updatedBill.nguoiSua;
                state[index].ngaySua= updatedBill.ngaySua;
            }
        },
    },
});

export const { SetBill, CreateBill, UpdateBill } = billSlice.actions;
export default billSlice.reducer;
export const GetBill =(state)=>state.bill;