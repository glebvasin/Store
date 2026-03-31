export type TProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number;
};

export type TProductWithFavorite = TProduct & {
  isFavorite: boolean;
};
