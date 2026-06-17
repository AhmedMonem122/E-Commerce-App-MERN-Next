export interface TopCheapProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  brand: {
    id: string;
    title: string;
    createdAt: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  brand: {
    id: string;
    title: string;
    createdAt: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  id: string;
  images: string[];
  category: {
    id: string;
    title: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
