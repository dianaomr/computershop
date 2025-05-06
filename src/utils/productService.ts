
import axios from 'axios';

// تعریف ساختار محصول
export interface Product {
  id?: string;
  name: string;
  price: number;
  category?: string;
  gender?: string;
  brand?: string;
  feature?: string[]; 
  description?: string;
  image?: string;
  stock?: number;
  createdAt?: string;
}

export interface ProductForm {
  id?: string;
  name: string;
  image?: string;
  category?: string;
  price: number;
  gender?: string;
  brand?: string;
  feature?: string | string[];
  description?: string;
}

export interface APIResponse {
  records: Product[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  recordsPerPage?: number | null;
  appliedFilters?: any;
}

// آدرس سرور و کلید API
export const BASE_URL = "http://api.alikooshesh.ir:3000";
export const API_KEY = "omraniUhv3cmCFgVPhMsO7R5MYFpAc1kK53fG4GJw9eLdRg9EzOFA6yv81sInUi8PJLkPyIfQOi3oR4ZKXt4keheKYqmjfov9EgwQUky4phCNcsbiAgtmGrhEnyPDVng";

// مسیر درخواست‌ها
const apiUrl = `${BASE_URL}/api/records/watch`;

// دریافت محصولات از API
export const fetchProducts = async (): Promise<APIResponse> => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'api_key': API_KEY,
      },
    });
    return {
      records: response.data.records,
      totalRecords: response.data.totalRecords,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      recordsPerPage: response.data.recordsPerPage,
      appliedFilters: response.data.appliedFilters,
    };
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw new Error('خطا در دریافت محصولات');
  }
};

// افزودن محصول جدید
export const addProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post(apiUrl, product, {
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const createdProduct = response.data.record || response.data.records?.[0];
    if (!createdProduct) throw new Error('محصول ایجاد نشد');

    return createdProduct as Product;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    throw new Error('خطا در افزودن محصول');
  }
};

// ویرایش محصول
export const updateProduct = async (product: Product): Promise<Product> => {
  if (!product.id) {
    throw new Error('شناسه محصول برای بروزرسانی لازم است');
  }

  try {
    const response = await axios.put(`${apiUrl}/${product.id}`, product, {
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const updatedProduct = response.data.record || response.data.records?.[0];
    if (!updatedProduct) throw new Error('محصول بروزرسانی نشد');

    return updatedProduct as Product;
  } catch (error) {
    console.error("❌ Error updating product:", error);
    throw new Error('خطا در بروزرسانی محصول');
  }
};
// حذف مجصول
export const deleteProduct = async (productId: string): Promise<string> => {
  try {
    const response = await axios.delete(`${apiUrl}/${productId}`, {
      headers: {
        'api_key': API_KEY,
      },
    });
    if (response.status === 200) return productId;
    throw new Error('حذف موفق نبود');
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    throw new Error('خطا در حذف محصول');
  }
};
