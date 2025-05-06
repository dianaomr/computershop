import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Order {
    id: string;
    customer: {
      name: string;
      address: string;
    };
    items: {
      product: {
        id: string;
        name: string;
      };
      quantity: number;
    }[];
    total: number;
    createdAt: string;
    delivered: boolean;
    deliveredAt?: string;
  }

  export interface OrderState {
    orders: Order[];
    selectedOrder: Order | null;
  }
  


const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<any | null>) => {
      state.selectedOrder = action.payload;
    },
    markOrderAsDelivered: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
});

export const { setOrders, setSelectedOrder, markOrderAsDelivered } = orderSlice.actions;
export default orderSlice.reducer;

