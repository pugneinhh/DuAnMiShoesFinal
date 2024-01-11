import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const clientSlice=createSlice({
    name:"client",
    initialState,
    reducers:{
        SetClient: (state,action) =>{
            return action.payload;
        },
        AddClient: (state,action) =>{
            const data = action.payload;
            const exitsItem = state.findIndex((item) => item.activeKey === data.activeKey && item.idKH === data.idKH);
            if (exitsItem !== -1) {
                console.log("Khách hàng đang được chọn");
            } else {
                const newClient = {
                    id : data.id,
                    ten : data.ten,
                    diem : data.diem,
                    hoaDon : data.hoaDon,
                    activeKey : data.activeKey,
                }
                state.unshift(newClient);
                state.forEach((item, index) => {
                    item.stt = index + 1;
                });
            }
        }
    }
})
export const {AddClient} = clientSlice.actions;
export default clientSlice.reducer;
export const GetClient = (state) => state.client