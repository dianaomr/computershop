export interface Product {
  id: string;
  title: string;
  price: number;
  mainImage: string;
  imageURL: string[];
  description: string;
  stock: number;
  discount: number;
  details: Array<{
    title: string;
    content: string;
  }>;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
