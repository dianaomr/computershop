
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
  // image?: string | File | undefined;
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

// export const uploadProductImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('image', file); // مطمئن شو که نام فیلد ارسال شده با سرور مطابقت داره

//   try {
//     const response = await axios.post(
//       'http://api.alikooshesh.ir:3000/upload-image',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'api_key': API_KEY, // اگه API_KEY نیاز دارید، این خط رو بزارید
//         },
//       }
//     );

//     // بررسی پاسخ سرور
//     console.log('Response from server:', response.data); // لاگ پاسخ سرور برای بررسی

//     const imageUrl = response.data.imageUrl; // مطمئن بشید که این کلید درست هست
//     if (!imageUrl) {
//       throw new Error('آدرس عکس از سرور دریافت نشد');
//     }

//     return imageUrl;
//   } catch (error) {
//     // نمایش خطا در کنسول برای خطایابی
//     console.error("❌ خطا در آپلود عکس:", error);

//     // اگر خطا از سرور باشه، می‌تونید جزئیات بیشتری از خطا رو نمایش بدید
//     if (axios.isAxiosError(error)) {
//       console.error("خطای axios:", error.response?.data || error.message);
//     }

//     throw new Error('آپلود عکس انجام نشد');
//   }
// };

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
