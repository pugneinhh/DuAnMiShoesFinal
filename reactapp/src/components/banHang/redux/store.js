import { configureStore } from "@reduxjs/toolkit";
import BillReducer from "../reducer/Bill.reducer";
import ProductReducer from "../reducer/Product.reducer";
import DetailInvoiceReducer from "../reducer/DetailInvoice.reducer";
import ClientReducer from "../reducer/Client.reducer";
export const store = configureStore({
    reducer: {
      bill:BillReducer,
      product:ProductReducer,
      // detailInvoiceL:DetailInvoiceReducer,
       client:ClientReducer,
    },
  });
  
  export const dispatch = store.dispatch;
  export const getState = store.getState;