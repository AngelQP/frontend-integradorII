import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { StarRating } from "./StartRating";
import type { BookCardProps } from "@/interfaces/Book";

// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   price: number;
//   originalPrice?: number;
//   condition: "new" | "used";
//   image: string;
//   rating: number;
//   category: string;
//   vendorName?: string;
//   vendorRating?: number;
//   vendorVerified?: boolean;
// }

// interface BookCardProps {
//   book: Book;
//   onClick?: () => void;
//   isFavorite?: boolean;
//   onToggleFavorite?: () => void;
// }

export const BookCard = ({ book, onClick, isFavorite = false, onToggleFavorite }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group cursor-pointer overflow-hidden transition-smooth hover:shadow-elegant hover:-translate-y-1",
        "border-border bg-card"
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm transition-all",
            isHovered ? "opacity-100" : "opacity-0",
            isFavorite && "opacity-100"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-smooth",
              isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
            )}
          />
        </Button>
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
        <Badge
          className={cn(
            "absolute bottom-2 left-2",
            book.condition === "new"
              ? "gradient-primary text-primary-foreground"
              : "gradient-secondary text-secondary-foreground"
          )}
        >
          {book.condition === "new" ? "Nuevo" : "Usado"}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-1">
          <Badge variant="outline" className="text-xs">
            {book.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <StarRating rating={book.rating} size="sm" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ${book.price.toFixed(2)}
          </span>
          {book.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
