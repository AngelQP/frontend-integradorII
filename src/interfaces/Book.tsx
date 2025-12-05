

export interface Book {

  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  condition: "new" | "used";
  image: string;
  rating: number;
  category: string;
  vendorName?: string;
  vendorRating?: number;
  vendorVerified?: boolean;

};

export interface BookCardProps {
  book: Book;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}