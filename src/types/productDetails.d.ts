export type Review = {
  _id: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  rating: number;
  reactions: string;
  review: string;
  createdAt: string;
};

type ProductDetails = {
  _id: string;
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
