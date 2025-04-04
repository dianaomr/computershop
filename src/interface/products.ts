import { ReactNode } from "react";

export interface IProduct {
  discount: ReactNode;
  description: ReactNode;
  imageURL: any;
  product_title: string | undefined;
  images: any;
  product_company_title: ReactNode;
  main_image: string | undefined;
  createdAt: string;
  title: string;
  company_title: string;
  image: string;
  image_gallery: string[];
  price: number;
  discount_percent: number;
  details: {
    title: string;
    content: string;
  }[];
  in_stock: number;
  id: string;
}
