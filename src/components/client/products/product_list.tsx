

"use client";

import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productService";
import type { Product } from "@/utils/productService";
import ProductCard from "@/components/client/products/product_card";
import ProductFilters from "@/components/client/products/product_filters";

const ProductsPage = () => {
 

  return (
    <div className="product-list flex flex-col lg:flex-row gap-8 px-6 md:px-12 py-10 min-h-screen">
     <h1>ProductsPage</h1>
    </div>
  );
};

export default ProductsPage;
