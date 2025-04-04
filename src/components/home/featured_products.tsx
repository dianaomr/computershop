"use client";

import { Product } from "../../types/product";
import { useRouter } from "next/navigation";
interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          onClick={() => {
            router.push(`/products/${product.id}`);
          }}
        >
          <img
            src={product.mainImage}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600">
            {product.price} تومان
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
