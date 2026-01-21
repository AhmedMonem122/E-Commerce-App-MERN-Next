export type AddProductForm = {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  imageCover: File;
  images: File[];
};

export type EditProductForm = {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  imageCover: File;
  images: File[];
};
