export type AddBrandForm = {
  title: string;
  description: string;
  products: string[];
  category: string;
  image: File;
};

export type EditBrandForm = {
  id: string;
  title: string;
  description: string;
  products: string[];
  category: string;
  image: File;
};
