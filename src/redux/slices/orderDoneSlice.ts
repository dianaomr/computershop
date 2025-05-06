
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types/order";

interface OrderDoneState {
  orders: Order[];
  selectedOrder: Order | null;
}

const initialState: OrderDoneState = {
  orders: [],
  selectedOrder: null,
};

const orderDoneSlice = createSlice({
  name: "orderDone",
  initialState,
  reducers: {
    setDoneOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload.filter((order) => order.delivered);
    },
    setSelectedDoneOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setDoneOrders, setSelectedDoneOrder } = orderDoneSlice.actions;
export default orderDoneSlice.reducer;
