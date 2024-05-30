import { configureStore } from "@reduxjs/toolkit";
import QrReducer from "../QRSlice/slice";

export const store = configureStore({
  reducer: {
    qr: QrReducer,
  },
});
