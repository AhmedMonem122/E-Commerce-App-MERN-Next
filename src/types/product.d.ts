export interface TopCheapProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  brand: {
    _id: string;
    title: string;
    createdAt: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  images: string[];
  imageCover: string;
  description: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
}
