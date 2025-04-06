import { ReactNode } from "react";

export interface IProduct {
  createdAt: string;
  title: string;
  description: string;
  price: number;
  mainImage: string;
  imageURL: string[];
  stock: number;
  discount: number;
  details: {
    title: string;
    content: string;
  }[];
  id: string;
}
