
import axios from 'axios';

export interface Product {
    id?: string;
    name: string;
    price: number;
    category?: string;
    gender?: string;
    brand?: string;
    feature?: string;
    description?: string;
    image?: string;
    stock?: number;
  }
  

// const apiUrl = 'https://67faf6938ee14a542628f55b.mockapi.io/products';
const baseUrl = 'https://67faf6938ee14a542628f55b.mockapi.io/products';

export const fetchBrands = async (): Promise<{ name: string; image: string }[]> => {
  const response = await axios.get(baseUrl); 
  return response.data;
};

//  دریافت محصولات
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

//  افزودن محصول جدید
export const addProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(baseUrl, product);
  return response.data;
};

//  ویرایش محصول
export const updateProduct = async (product: Product): Promise<Product> => {
  if (!product.id) throw new Error('Product ID is required for update');
  const response = await axios.put(`${baseUrl}/${product.id}`, product);
  return response.data;
};

//  حذف محصول
export const deleteProduct = async (productId: string): Promise<string> => {
  const response = await axios.delete(`${baseUrl}/${productId}`);
  return response.data;
};
