export type Product = {
  id: number;
  name: string;
  description: string;
  image?: string;

  price: number;     // preço
  stock: number;     // estoque
  category: string;  // categoria
};


export type Video = {
  id: number;
  title: string;
  url: string;
};