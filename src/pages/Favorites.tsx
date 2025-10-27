import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BookCard, type Book } from "@/components/BookCard";
import { BookDetailModal } from "@/components/BookDetailModal";
import { Heart, BookOpen } from "lucide-react";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";

// Mock data - en producción esto vendría de la base de datos
const FAVORITE_BOOKS: Book[] = [
  {
    id: "1",
    title: "El Bosque Místico",
    author: "Ana García",
    price: 24.99,
    originalPrice: 34.99,
    condition: "used",
    image: book1,
    rating: 4.5,
    category: "Fantasía",
    vendorName: "Carlos Rodríguez",
    vendorRating: 4.8,
    vendorVerified: true,
  },
  {
    id: "3",
    title: "Amor en Silencio",
    author: "María López",
    price: 19.99,
    originalPrice: 27.99,
    condition: "used",
    image: book3,
    rating: 4.3,
    category: "Romance",
    vendorName: "Ana Martínez",
    vendorRating: 4.6,
    vendorVerified: false,
  },
  {
    id: "2",
    title: "Horizontes Galácticos",
    author: "Jorge Mendoza",
    price: 29.99,
    condition: "new",
    image: book2,
    rating: 4.8,
    category: "Ciencia Ficción",
    vendorName: "Luis Pérez",
    vendorRating: 4.9,
    vendorVerified: true,
  },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<Book[]>(FAVORITE_BOOKS);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleRemoveFavorite = (bookId: string) => {
    setFavorites(favorites.filter((book) => book.id !== bookId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={(query) => console.log("Search:", query)} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-destructive fill-destructive" />
            <h1 className="text-4xl font-bold">Mis Favoritos</h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length > 0
              ? `Tienes ${favorites.length} libro${favorites.length !== 1 ? "s" : ""} guardado${favorites.length !== 1 ? "s" : ""} en favoritos`
              : "No tienes libros guardados en favoritos"}
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={true}
                onToggleFavorite={() => handleRemoveFavorite(book.id)}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen className="h-24 w-24 text-muted-foreground/50 mb-6" />
            <h2 className="text-2xl font-semibold mb-2">No hay favoritos aún</h2>
            <p className="text-muted-foreground max-w-md">
              Explora nuestra colección y guarda tus libros favoritos para encontrarlos fácilmente más tarde.
            </p>
          </div>
        )}
      </main>

      <BookDetailModal
        book={selectedBook}
        open={!!selectedBook}
        onOpenChange={(open) => !open && setSelectedBook(null)}
      />
    </div>
  );
};

export default Favorites;
