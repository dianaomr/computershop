
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import quantityReducer from './slices/quantitySlice';
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import orderDoneReducer from "./slices/orderDoneSlice";
import latestOrderReducer from "./slices/latestOrderSlice";
import favoriteReducer from "./slices/favoriteSlice";

const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.warn("Load cart failed:", err);
    return undefined;
  }
};

const saveCartToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.warn("Save cart failed:", err);
  }
};

const preloadedCartState = loadCartFromLocalStorage();
// ------------------------------------------------------

export const store = configureStore({
  reducer: {
    product: productReducer,
    quantity: quantityReducer,
    filters: filterReducer,
    cart: cartReducer,
    orders: orderReducer,
    orderDone: orderDoneReducer,
    latestOrder: latestOrderReducer,
    favorites: favoriteReducer,
  },
  preloadedState: {
    cart: preloadedCartState, 
  },
});

// هر بار که استیت cart تغییر کرد، در localStorage ذخیره 
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
