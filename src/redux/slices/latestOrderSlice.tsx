import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  product: { id: string; name: string };
  quantity: number;
}

interface Order {
  customer: any;
  items: OrderItem[];
  total: number;
  createdAt: string;
  delivered: boolean;
  deliveredAt?: string;
}

interface LatestOrderState {
  order: Order | null;
}

const initialState: LatestOrderState = {
  order: null,
};

const latestOrderSlice = createSlice({
  name: "latestOrder",
  initialState,
  reducers: {
    setLatestOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    clearLatestOrder: (state) => {
      state.order = null;
    },
  },
});

export const { setLatestOrder, clearLatestOrder } = latestOrderSlice.actions;
export default latestOrderSlice.reducer;
