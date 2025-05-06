
"use client";

import { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, APIResponse, Product } from "@/utils/productService";
import ProductCard from "@/components/client/products/product_card";
import ProductFilters from "@/components/client/products/product_filters";
import { setSortOrder } from "@/redux/slices/filterSlice";

const ProductsPage = () => {
  const { data, isLoading, error } = useQuery<APIResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filters = useSelector((state: RootState) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const dispatch = useDispatch();


  useEffect(() => {
    setCurrentPage(1); 
  }, [filters]);


  const filteredProducts = useMemo(() => {
    if (!data?.records) return [];
  
    const results = data.records.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === "all" || product.category === filters.category;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesGender = !filters.gender || product.gender === filters.gender;
      const matchesFeature = !filters.feature || product.feature?.includes(filters.feature);
      const matchesBrand = !filters.brand || product.brand === filters.brand;
  
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesGender &&
        matchesFeature &&
        matchesBrand
      );
    });
  
    // سورت بر اساس قیمت
    const sorted = [...results].sort((a, b) => {
      if (filters.sortOrder === "asc") return a.price - b.price;
      if (filters.sortOrder === "desc") return b.price - a.price;
      return 0;
    });
  
    return sorted;
  }, [data, filters]);
  

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  if (isLoading) return <p className="text-center mt-10 text-gray-500">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">خطا در دریافت محصولات</p>;

  return (
    <div className="product-list flex flex-col lg:flex-row gap-8 px-6 md:px-12 py-10 min-h-screen">
      {/* فیلترها */}
      <aside className="lg:w-1/4 w-full">
        <div className="sticky top-6 p-4 rounded-2xl shadow-sm border border-gray-200 bg-gray-50">
          {/* <h3 className="text-lg font-semibold mb-4 text-gray-700">فیلترها</h3> */}
          <ProductFilters />
        </div>
      </aside>

      {/* محصولات */}
      <section className="flex-1">
      <div className="flex justify-end gap-4 mb-4">
  <button
    onClick={() => dispatch(setSortOrder("desc"))}
    className={`px-4 py-2 border rounded-lg text-sm ${
      filters.sortOrder === "desc"
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-300 hover:bg-gray-100"
    }`}
  >
    گران‌ترین
  </button>
  <button
    onClick={() => dispatch(setSortOrder("asc"))}
    className={`px-4 py-2 border rounded-lg text-sm ${
      filters.sortOrder === "asc"
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-300 hover:bg-gray-100"
    }`}
  >
    ارزان‌ترین
  </button>
</div>

        <h2 className="text-2xl font-bold text-black mb-6">محصولات</h2>

        {paginatedProducts.length === 0 ? (
          <p className="text-gray-500">محصولی یافت نشد.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>

            {/* صفحه‌بندی */}
            <div className="flex justify-center items-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    currentPage === i + 1
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
