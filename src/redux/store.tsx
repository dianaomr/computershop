
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import quantityReducer from './slices/quantitySlice';
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import orderDoneReducer from "./slices/orderDoneSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    quantity: quantityReducer,
    filters: filterReducer,
    cart: cartReducer,
    orders: orderReducer,
    orderDone: orderDoneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
