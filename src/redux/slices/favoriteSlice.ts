import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/utils/productService';

interface FavoriteState {
  items: Product[];
}

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const getInitialFavorites = (): Product[] => {
  const token = getToken();
  if (!token) return [];
  const data = localStorage.getItem(`favorites_${token}`);
  return data ? JSON.parse(data) : [];
};

const initialState: FavoriteState = {
  items: getInitialFavorites(),
};

const updateLocalStorage = (items: Product[]) => {
  const token = getToken();
  if (token) {
    localStorage.setItem(`favorites_${token}`, JSON.stringify(items));
  }
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        updateLocalStorage(state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      updateLocalStorage(state.items);
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      updateLocalStorage(state.items);
    }
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
