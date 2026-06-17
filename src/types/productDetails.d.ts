export type Review = {
  id: string;
  user: {
    id: string;
    name: string;
    photo: string;
  };
  rating: number;
  reactions: string;
  review: string;
  createdAt: string;
};

type ProductDetails = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  imageCover: string;
  category: string;
  brand: string;
  reviews: Review[];
  ratingsAverage: number;
  ratingsQuantity: number;
};
