import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const productSlice=createSlice({
    name:"product",
    initialState, 
    // : {
    //     itemsList: [],
    //     totalQuantity: 0,
    // },
    reducers: {
        SetProduct: (state,action) =>{
            return action.payload;
        },
        AddProduct: (state,action)=>{
            const data = action.payload ;
            const exitsItem = state.findIndex((item) => item.chiTietSanPham === data.chiTietSanPham  && item.activeKey === data.activeKey)
            console.log(exitsItem);
            if (exitsItem !== -1) {
                state[exitsItem].soLuong++;
                state[exitsItem].total += data.giaBan
              } else {
                const newProduct ={
                stt: state.length +1,
                soLuong: 1,
                linkAnh: data.linkAnh,
                tenSP : data.tenSP,
                kichThuoc : data.kichThuoc,
                mauSac : data.mauSac,
                giaBan : data.giaBan,
                activeKey : data.activeKey,
                total: data.giaBan,
                // giaGiam : data.giaGiam,
                // trangThai : data.trangThai,
                // giaSauGiam : data.giaSauGiam,
                hoaDon : data.hoaDon,
                chiTietSanPham : data.chiTietSanPham,
                // nguoiTao: data.nguoiTao,
                // nguoiSua : data.nguoiSua,
                // ngayTao : data.ngayTao,
                // ngaySua : data.ngaySua,
                }
                // state.totalQuantity++;
                state.unshift(newProduct);
                state.forEach((item, index) => {
                    item.stt = index + 1;
                });
           // };
            }

        },UpdateProduct :(state,action) =>{
            const updateProduct = action.payload;
            const index = state.findIndex((i) => i.chiTietSanPham === updateProduct.chiTietSanPham && i.activeKey === updateProduct.activeKey); 
            if (index !== -1){
                state[index].soLuong = updateProduct.soLuong;
                state[index].total = updateProduct.soLuong * state[index].giaBan;
            }
        },

        RemoveProduct : (state,action) =>{
            return state.filter((item) => item.key !== action.payload.key)
        },
        TotalPrice:(state,action) => {
            // const product = action.payload;
            // const index = state.findIndex(item => item.activeKey === action.activeKey);
            // if (index.length > 0){
            //     for (let i = 0 ; i < index.length ; i++){
                    
            //     }
            // }
        }
    },
});
export const {AddProduct,UpdateProduct} = productSlice.actions;
export default productSlice.reducer;
// export const {SetProduct,CreateProduct,UpdateProduct,RemoveProduct} = productSlice;
 export const GetProduct = (state) => state.product
