
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../utils/quantityService';

interface QuantityState {
  quantities: Product[];
}

const initialState: QuantityState = {
  quantities: [],
};

const quantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    setQuantities: (state, action: PayloadAction<Product[]>) => {
      state.quantities = action.payload;
    },
    updateQuantity: (state, action: PayloadAction<Product>) => {
      const index = state.quantities.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.quantities[index] = {
          ...state.quantities[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setQuantities, updateQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
