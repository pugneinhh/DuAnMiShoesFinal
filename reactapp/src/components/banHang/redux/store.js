import { configureStore } from "@reduxjs/toolkit";
import BillReducer from "../reducer/Bill.reducer";
import ProductReducer from "../reducer/Product.reducer";
import DetailInvoiceReducer from "../reducer/DetailInvoice.reducer";
import ClientReducer from "../reducer/Client.reducer";
import PayReducer from "../reducer/Pay.reducer";
import PayDetailReducer from "../reducer/PayDetail.reducer";

export const store = configureStore({
    reducer: {
      bill:BillReducer,
      product:ProductReducer,
       invoice:DetailInvoiceReducer,
       client:ClientReducer,
       pay:PayReducer,
       payDetail:PayDetailReducer,
    },
  });
  
  export const dispatch = store.dispatch;
  export const getState = store.getState;