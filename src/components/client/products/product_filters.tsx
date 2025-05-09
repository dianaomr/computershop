
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
  setBrandFilter,
} from "@/redux/slices/filterSlice";

const ProductFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  return (
    <div dir="rtl" className="filter-part flex flex-col gap-4 text-sm p-2">
      <h2 className="text-xl font-semibold mb-2 text-black">فیلتر محصولات</h2>

      {/* جستجو */}
      <input
        type="text"
        placeholder="جستجوی محصول..."
        value={filters.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
      />

      {/* دسته‌بندی */}
      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="w-full px-4 py-2 border rounded-xl"
      >
        <option value="all">همه دسته‌ها</option>
        <option value="ساعت اسپرت">ساعت اسپرت</option>
        <option value="ساعت هوشمند">ساعت هوشمند</option>
        <option value="ساعت مجلسی">ساعت مجلسی</option>
        <option value="ساعت کلاسیک">ساعت کلاسیک</option>
      </select>

      {/* فیلتر جنسیت */}
      <select
        value={filters.gender || ""}
        onChange={(e) => dispatch(setGenderFilter(e.target.value))}
        className="w-full px-4 py-2 border rounded-xl"
      >
        <option value="">جنسیت</option>
        <option value="مردانه">مردانه</option>
        <option value="زنانه">زنانه</option>
        <option value="یونیسکس">یونیسکس</option>
      </select>

      {/* فیلتر برند */}
      <select
        value={filters.brand || ""}
        onChange={(e) => dispatch(setBrandFilter(e.target.value))}
        className="w-full px-4 py-2 border rounded-xl"
      >
        <option value="">برند</option>
        <option value="سیتیزن">سیتیزن</option>
        <option value="کاسیو">کاسیو</option>
        <option value="رولکس">رولکس</option>
        <option value="امگا">امگا</option>
        <option value="تیسوت">تیسوت</option>
        <option value="فسیل">فسیل</option>
        <option value="سواچ">سواچ</option>
        <option value="سیکو">سیکو</option>
      </select>

      {/* فیلتر ویژگی */}
      <select
        value={filters.feature || ""}
        onChange={(e) => dispatch(setFeatureFilter(e.target.value))}
        className="w-full px-4 py-2 border rounded-xl"
      >
        <option value="">ویژگی خاص</option>
        <option value="ضد آب">ضد آب</option>
        <option value="GPS">GPS</option>
        <option value="ضد ضربه">ضد ضربه</option>
        <option value="ضربان‌سنج">ضربان‌سنج</option>
        <option value="نمایشگر تاریخ">نمایشگر تاریخ</option>
      </select>

      {/* قیمت */}
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600 mb-1">حداقل قیمت</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => dispatch(setMinPrice(Number(e.target.value)))}
            className="px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600 mb-1">حداکثر قیمت</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
            className="px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* ریست فیلترها */}
      <button
        onClick={() => dispatch(resetFilters())}
        className="mt-4 w-full py-2 rounded-xl border border-black text-black hover:bg-black hover:text-white transition-all"
      >
        حذف فیلترها
      </button>
    </div>
  );
};

export default ProductFilters;
