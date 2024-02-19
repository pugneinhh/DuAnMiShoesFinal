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
            const exitsItem = state.findIndex((item) => item.id === data.id);
            if (exitsItem === -1) {
                const newClient = {
                    stt: state.length +1,
                    id : data.id,
                    tenND : data.tenND,
                    diem : data.diem,
                    sdt: data.sdt,
                    email : data.email,
                    ngaySinh : data.ngaySinh,
                    cccd: data.cccd,
                    anh: data.anh,
                    gioiTinh: data.gioiTinh,
                    ma: data.ma,
                    trangThai: data.trangThai,
                }
                state.unshift(newClient);
                state.forEach((item, index) => {
                    item.stt = index + 1;
                });
            }
        },
        RemoveClient : (state,action)=> {
            return state.filter((item) => item.id !== action.payload.id )

        }
    }
})
export const {AddClient,RemoveClient} = clientSlice.actions;
export default clientSlice.reducer;
export const GetClient = (state) => state.client