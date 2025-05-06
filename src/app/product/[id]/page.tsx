
import { fetchProducts } from "@/utils/productService";
import ProductDetail from "@/components/client/product/productDetail";

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const response = await fetchProducts(); 
  const product = response.records.find((p) => p.id === params.id); 

  if (!product) return <p>محصولی یافت نشد.</p>;

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;

