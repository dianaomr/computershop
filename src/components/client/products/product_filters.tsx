
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSearch,
  setCategory,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  setGenderFilter,
  setFeatureFilter,
} from "@/redux/slices/filterSlice";

const ProductFilters = () => {
  
  return (
    <div dir="rtl" className="filter-part flex flex-col gap-4 text-sm ">

      <h2 className="text-xl font-semibold mb-2 text-black">فیلتر محصولات</h2>

    </div>
  );
};

export default ProductFilters;
