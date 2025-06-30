
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFavorites } from "@/redux/slices/favoriteSlice";
import ProductCard from "../products/product_card";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const savedFavorites = localStorage.getItem(`favorites_${token}`);
      if (savedFavorites) {
        dispatch(setFavorites(JSON.parse(savedFavorites)));
      }
    }
  }, [dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">❤️ علاقه‌مندی‌های من</h1>
      {favorites.length === 0 ? (
        <p>هنوز محصولی به علاقه‌مندی‌ها اضافه نکردید.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
