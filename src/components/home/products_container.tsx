import { Product } from "../../types/product";
import FeaturedProducts from "./featured_products";

async function getProducts() {
  const response = await fetch(
    "http://api.alikooshesh.ir:3000/api/records/product?limit=10",
    {
      headers: {
        api_key: "maktab124_shop",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.records;
}

export default async function ProductsContainer() {
  const products = await getProducts();

  return <FeaturedProducts products={products} />;
}
