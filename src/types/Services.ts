export type Service = {
  id: number;
  name: string;
  description: string;
  image?: string;

  category: string;
  price?: number; // opcional (ex: instalação)
};
