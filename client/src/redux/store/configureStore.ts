import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { basketSlice } from "../basketSlice";
import { productSlice } from "../productSlice";
import { orderSlice } from "../orderSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
