import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from "@/components/StartRating";
// import { BookCard, Book } from "@/components/BookCard";
import { User, Mail, Phone, MapPin, Settings, BookOpen, Package } from "lucide-react";
import { Link } from "react-router";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import { BookCard, type Book } from "@/components/BookCard";

const MY_BOOKS: Book[] = [
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
  },
];

const Profile = () => {
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" />
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <CardTitle>Carlos Rodríguez</CardTitle>
                <CardDescription>Miembro desde 2024</CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <StarRating rating={4.8} size="sm" showValue={false} />
                  <span className="text-sm text-muted-foreground">(95 ventas)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>carlos@ejemplo.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+34 123 456 789</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Madrid, España</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipo de cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSeller ? <Package className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    <span className="font-medium">
                      {isSeller ? "Vendedor" : "Comprador"}
                    </span>
                  </div>
                  <Badge className={isSeller ? "gradient-secondary" : "gradient-primary"}>
                    {isSeller ? "Activo" : "Activo"}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsSeller(!isSeller)}
                >
                  {isSeller ? "Cambiar a comprador" : "Cambiar a vendedor"}
                </Button>
                {isSeller && (
                  <Link to="/publish" className="block">
                    <Button className="w-full gradient-secondary">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Publicar libro
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
          </aside>

          {/* Main Content */}
          <div>
            <Tabs defaultValue="books" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="books">Mis Libros</TabsTrigger>
                <TabsTrigger value="purchases">Compras</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>

              <TabsContent value="books" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Libros publicados</CardTitle>
                    <CardDescription>
                      {isSeller
                        ? "Gestiona tus publicaciones activas"
                        : "Cambia a vendedor para publicar libros"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSeller ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {MY_BOOKS.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Cambia a vendedor para comenzar a publicar libros</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="purchases" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de compras</CardTitle>
                    <CardDescription>
                      Libros que has adquirido en la plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No hay compras registradas aún</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reseñas recibidas</CardTitle>
                    <CardDescription>
                      Valoraciones de otros usuarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b pb-4 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">Usuario {i}</p>
                              <StarRating rating={5} size="sm" showValue={false} />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Hace {i} semana{i > 1 ? "s" : ""}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Excelente vendedor, libro en perfectas condiciones y entrega rápida.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
