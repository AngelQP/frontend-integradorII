import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { BookDetailModal } from "@/components/BookDetailModal";
import { CategoryExploreDialog } from "@/components/CategoryExploreDialog";
import { SellBookModal } from "@/components/SellBookModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Heart } from "lucide-react";
import heroImage from "@/assets/hero-books.jpg";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import { useAuth } from "@/contexts/AuthContext";
import type { Book } from "@/interfaces/Book";

const MOCK_BOOKS: Book[] = [
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
    id: "4",
    title: "Sombras Nocturnas",
    author: "Roberto Silva",
    price: 22.99,
    condition: "new",
    image: book4,
    rating: 4.6,
    category: "Thriller",
    vendorName: "Miguel Torres",
    vendorRating: 4.7,
    vendorVerified: true,
  },
  {
    id: "5",
    title: "El Bosque Místico II",
    author: "Ana García",
    price: 26.99,
    condition: "new",
    image: book1,
    rating: 4.7,
    category: "Fantasía",
    vendorName: "Carlos Rodríguez",
    vendorRating: 4.8,
    vendorVerified: true,
  },
  {
    id: "6",
    title: "La Última Frontera",
    author: "Jorge Mendoza",
    price: 18.99,
    originalPrice: 32.99,
    condition: "used",
    image: book2,
    rating: 4.4,
    category: "Ciencia Ficción",
    vendorName: "Luis Pérez",
    vendorRating: 4.9,
    vendorVerified: true,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isSeller } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [condition, setCondition] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>(["1", "3"]);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const allBooksRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (bookId: string) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleExploreBooks = () => {
    setShowCategoryDialog(true);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    // Scroll to all books section
    setTimeout(() => {
      allBooksRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSellBooks = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!isSeller) {
      navigate("/profile");
      return;
    }
    setShowSellModal(true);
  };

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    if (category !== "all" && book.category !== category) return false;
    if (condition !== "all" && book.condition !== condition) return false;
    return true;
  });

  const trendingBooks = MOCK_BOOKS.slice(0, 4);
  const discountBooks = MOCK_BOOKS.filter((book) => book.originalPrice);
  const recommendedBooks = MOCK_BOOKS.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={(query) => console.log("Search:", query)} />

      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Biblioteca acogedora"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>
          <div className="container relative mx-auto flex h-full items-center px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-foreground md:text-6xl">
                Conecta con lectores{" "}
                <span className="text-primary">de todo el país</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Compra y vende libros nuevos y de segunda mano. 
                Dale una nueva vida a tus lecturas favoritas.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="gradient-primary" onClick={handleExploreBooks}>
                  Explorar libros
                </Button>
                {isLoggedIn && (
                  <Button size="lg" variant="outline" onClick={handleSellBooks}>
                    Vender mis libros
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Books */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center gap-2">
            <Heart className="h-6 w-6 text-secondary" />
            <h2 className="text-3xl font-bold">Recomendados para ti</h2>
            <Badge className="gradient-secondary ml-2">Basado en tus intereses</Badge>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                onToggleFavorite={() => toggleFavorite(book.id)}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </section>

        {/* Trending Books */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Libros en tendencia</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                onToggleFavorite={() => toggleFavorite(book.id)}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </section>

        {/* Discount Books */}
        <section className="bg-accent py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-secondary" />
              <h2 className="text-3xl font-bold">Libros con descuento</h2>
              <Badge className="gradient-secondary ml-2">Hasta 40% OFF</Badge>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {discountBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isFavorite={favorites.includes(book.id)}
                  onToggleFavorite={() => toggleFavorite(book.id)}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* All Books */}
        <section className="container mx-auto px-4 py-16" ref={allBooksRef}>
          <div className="mb-8">
            <h2 className="mb-6 text-3xl font-bold">Todos los libros</h2>
            <div className="flex flex-wrap gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Fantasía">Fantasía</SelectItem>
                  <SelectItem value="Ciencia Ficción">Ciencia Ficción</SelectItem>
                  <SelectItem value="Romance">Romance</SelectItem>
                  <SelectItem value="Thriller">Thriller</SelectItem>
                </SelectContent>
              </Select>

              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Condición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="used">Usado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                onToggleFavorite={() => toggleFavorite(book.id)}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 LibroConecta. Conectando lectores, una página a la vez.</p>
        </div>
      </footer>

      <BookDetailModal
        book={selectedBook}
        open={!!selectedBook}
        onOpenChange={(open) => !open && setSelectedBook(null)}
      />

      <CategoryExploreDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        onSelectCategory={handleCategorySelect}
      />

      <SellBookModal
        open={showSellModal}
        onOpenChange={setShowSellModal}
      />
    </div>
  );
};

export default Index;
