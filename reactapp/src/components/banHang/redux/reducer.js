

const initState={
    hoaDons:[
        {label: `Hóa đơn 1`,
              children: `New Tab 1`,id:1,ma:"HD1",trangThai:0,key:1,
    "sanPham":[
        {id:1,tenSP:"giày adidas",giaBan:100000,soLuong:1,kichThuoc:35,Mau:"#fafafa"}
    ]
    }
]
}
const rootReducer=(state =initState,action) =>{
    console.log(state,action);
    switch(action.type){
        case 'CREATE_INVOICE':
        return{
            ...state,
            hoaDons:[
                ...state.hoaDons,
                action.payload
            ]
        }
        case 'REMOVE_INVOICE':
            console.log("key",action.payload.key);
        return{
            
            ...state,hoaDons:[
                ...state.hoaDons.filter((item)=>item.key!==action.payload.key)
            ]
            
        }
        default:
            return state;
    }
}
export default rootReducer;