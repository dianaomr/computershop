import Product from "@/components/product/product";

import { fetchProducts } from "@/utils/productService";
import ProductDetail from "@/components/client/product/productDetail";

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const allProducts = await fetchProducts();
  const product = allProducts.find((p) => p.id === params.id);

  if (!product) return <p>محصولی یافت نشد.</p>;

  return <ProductDetail product={product} />
  
  ;
};

export default ProductPage;
