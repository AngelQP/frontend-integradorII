
export interface BookImage {
    id: string;
    url: string;
    isMain: boolean;
}

export interface Book {

  id: string;
  title: string;
  author: string;
  lenguage?: string;
  stock?: number;
  yearPublication?: number;
  pages?: number;
  price: number;
  discount?: number;
  originalPrice?: number;
  state: "NUEVO" | "USADO";
  image: string;
  category: string;
  vendorName?: string;
  images?: BookImage[];

};

export interface BookCardProps {
  book: Book;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}