
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id?: string;
  name: string;
  price: number;
  category?: string;
  gender?: string;
  brand?: string;
  feature?: string[]; 
  description?: string;
  image?: string;
  stock?: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.name === action.payload.name);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct: (state, action) => {
        state.products = state.products.filter(
          (product) => product.name !== action.payload
        );
      },
      
  },
});

export const { setProducts, addProduct, updateProduct , removeProduct } = productSlice.actions;
export default productSlice.reducer;
