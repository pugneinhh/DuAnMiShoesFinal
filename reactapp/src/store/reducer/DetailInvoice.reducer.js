import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const detailInvoiceSlice=createSlice({
    name:'invoice',
    initialState,
    reducers: {
        SetInvoice:(state,action) =>{
            return action.payload;
        },
        AddInvoice:(state,action) => {
            const data = action.payload ;
            const exitsItem = state.findIndex((item) => item.chiTietSanPham === data.chiTietSanPham  && item.hoaDon === data.hoaDon)
            console.log(exitsItem);
            if (exitsItem !== -1) {
                state[exitsItem].soLuong++;
                state[exitsItem].total += data.giaSauGiam
              } else {
                const newInvoice ={
                stt: state.length +1,
                soLuong: 1,
                giaGiam : data.giaGiam,
                total: data.giaSauGiam, 
                trangThai : data.trangThai,
                giaBan : data.giaBan,
                giaSauGiam : data.giaSauGiam,
                tenSP: data.tenSP,
                maMS : data.maMS,
                tenMS : data.tenMS,
                tenKT: data.tenKT,
                hoaDon : data.hoaDon,
                chiTietSanPham : data.chiTietSanPham,
                nguoiTao: data.nguoiTao,
                linkAnh: data.linkAnh,
                loaiKM: data.loaiKM,
                tenKM: data.tenKM,
                giaTriKhuyenMai: data.giaTriKhuyenMai,
                }
                state.unshift(newInvoice);
                state.forEach((item, index) => {
                    item.stt = index + 1;
                });
           
            }

        } , 
        UpdateInvoice: (state,action)=>{
            const updateData = action.payload;
            const index = state.findIndex((i) => i.chiTietSanPham === updateData.chiTietSanPham && i.hoaDon === updateData.hoaDon);
            if (index !== -1) {
             
                state[index].soLuong = updateData.soLuong;
                state[index].total = updateData.soLuong * state[index].giaSauGiam;
            }
        }, 
        RemoveInvoice: (state,action) => {
            return state.filter((item)=>item.chiTietSanPham === action.payload.chiTietSanPham && item.hoaDon === action.payload.hoaDon )
        },
        GetInvoiceByHoaDon:(state,action) => {
            const data = action.payload;
            console.log("data",data.activeKey)
            const index = state.findIndex((period) => period.hoaDon === data.hoaDon);
            console.log("index",index);

            
            return state[index];
        },
        RemoveInvoiceByHoaDon: (state,action) =>{
            return state.filter((item)=> item.hoaDon !== action.payload.hoaDon )
        },
        GetLengthListByBill: (state,action) => {
            return state.filter((item)=> item.hoaDon === action.payload.hoaDon).length
        },
    }
})
export const {AddInvoice,UpdateInvoice,RemoveInvoice,GetInvoiceByHoaDon,RemoveInvoiceByHoaDon,GetLengthListByBill} = detailInvoiceSlice.actions;
export default detailInvoiceSlice.reducer;
export const GetInvoice = (state) => state.invoice;