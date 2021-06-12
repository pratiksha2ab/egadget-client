import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

//Global store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
