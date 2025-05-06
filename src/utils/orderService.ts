
import axios from "axios";
import { Order, NewOrder } from "@/types/order";

export const BASE_URL = "http://api.alikooshesh.ir:3000";
export const API_KEY = "omraniUhv3cmCFgVPhMsO7R5MYFpAc1kK53fG4GJw9eLdRg9EzOFA6yv81sInUi8PJLkPyIfQOi3oR4ZKXt4keheKYqmjfov9EgwQUky4phCNcsbiAgtmGrhEnyPDVng";
export const apiUrl = `${BASE_URL}/api/records/orders`;

// ساخت   headers پیش‌فرض
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "api_key": API_KEY,
  },
});

// ✅ ایجاد سفارش جدید
export const createOrder = async (orderData: NewOrder): Promise<void> => {
  try {
    await axiosInstance.post("", orderData);
  } catch (error: any) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

// گرفتن همه سفارشات
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const res = await axiosInstance.get("");
    return res.data as Order[];
  } catch (error: any) {
    console.error("Error fetching all orders:", error.response?.data || error.message);
    throw error;
  }
};

// گرفتن سفارشات تحویل داده شده
export const getDeliveredOrders = async (): Promise<Order[]> => {
  try {
    const res = await axios.get(apiUrl, {
      headers: {
        api_key: API_KEY,
      },
    });

    const allOrders: Order[] = res.data.records;
    return allOrders.filter((order) => order.delivered);
  } catch (error: any) {
    console.error("Error fetching delivered orders:", error.message || error);
    throw error;
  }
};


// گرفتن سفارشات در انتظار تحویل
export const getPendingOrders = async (): Promise<Order[]> => {
  try {
    const res = await axios.get(apiUrl, {
      headers: {
        api_key: API_KEY,
      },
    });

    const allOrders: Order[] = res.data.records;
    return allOrders.filter((order) => !order.delivered);
  } catch (error: any) {
    console.error("Error fetching pending orders:", error.message || error);
    throw error;
  }
};


// نشانه‌گذاری سفارش به عنوان تحویل داده‌شده
export const markAsDeliveredAPI = async (id: string): Promise<void> => {
  try {
    const deliveredAt = new Date().toISOString();

    const res = await axios.put(`${apiUrl}/${id}`, {
      delivered: true,
      deliveredAt,
    }, {
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
      },
    });

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("خطا در ثبت تحویل سفارش");
    }
  } catch (error: any) {
    console.error("Error marking order as delivered:", error.message || error);
    throw error;
  }
};

