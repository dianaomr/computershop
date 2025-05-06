
import axios from 'axios';
// import { BASE_URL, API_KEY } from './utils';
export const BASE_URL = "http://api.alikooshesh.ir:3000";
export const API_KEY = "omraniUhv3cmCFgVPhMsO7R5MYFpAc1kK53fG4GJw9eLdRg9EzOFA6yv81sInUi8PJLkPyIfQOi3oR4ZKXt4keheKYqmjfov9EgwQUky4phCNcsbiAgtmGrhEnyPDVng";

export type Product = {
  id: string;               
  name: string;
  price: number;
  stock: number;
  image?: string;
};

const apiUrl = `${BASE_URL}/api/records/watch`;

// دریافت محصولات
export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(apiUrl, {
    headers: {
      'api_key': API_KEY,
    },
  });
  // return response.data;
  return response.data.records;

}

// آپدیت موجودی و قیمت محصول خاص
export async function updateQuantityAPI(data: { id: string; stock: number; price: number }): Promise<Product> {
  const { id, price, stock } = data;

  const response = await axios.put(`${apiUrl}/${id}`, { price, stock }, {
    headers: {
      'api_key': API_KEY,
    },
  });
  return response.data.records;
  // return response.data;
}
