
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  gender?: string;
  feature?: string;
  brand: string;
  sortOrder: "asc" | "desc";
}

const initialState: FilterState = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: Infinity,
  gender: undefined,
  feature: undefined,
  brand: "",
  sortOrder: "asc",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
    setPriceFilter(
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setGenderFilter(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setFeatureFilter(state, action: PayloadAction<string>) {
      state.feature = action.payload;
    },
    setBrandFilter(state, action: PayloadAction<string>) {
      state.brand = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
    },
    
    resetFilters(state) {
      state.search = "";
      state.category = "all";
      state.minPrice = 0;
      state.maxPrice = Infinity;
      state.gender = undefined;
      state.feature = undefined;
      state.brand = "";
    },
  },
});

export const {
  setSearch,
  setCategory,
  setMinPrice,
  setMaxPrice,
  setPriceFilter,
  setGenderFilter,
  setFeatureFilter,
  setBrandFilter,
  resetFilters,
  setSortOrder,
} = filterSlice.actions;

export default filterSlice.reducer;
