
import axios from 'axios';

export type Product = {
  id?: string;
  name: string;
  price: number;
  stock: number; 
  image?: string; 
};

const apiUrl = 'https://67faf6938ee14a542628f55b.mockapi.io/products';

// دریافت محصولات
export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(apiUrl);
  return response.data;
}

// آپدیت موجودی و قیمت
export async function updateQuantityAPI(data: Product) {
  if (!data.id) throw new Error('شناسه محصول لازم است');

  const res = await axios.put(`${apiUrl}/${data.id}`, {
    price: data.price,
    stock: data.stock,
  });

  return res.data;
}


  