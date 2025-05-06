export type Order = {
    id: string;
    customer: {
      name: string;
      address: string;
    };
    items: {
      product: {
        id: string;
        name: string;
      };
      quantity: number;
    }[];
    total: number;
    delivered: boolean;
    deliveredAt?: string;
    createdAt: string;
  };
  export type NewOrder = Omit<Order, 'id'>;
