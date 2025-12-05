import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCard } from "@/components/BookCard";
import { User, Mail, Phone, BookOpen, Package, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import { useState } from "react";
import type { Book } from "@/interfaces/Book";
import { StarRating } from "@/components/StartRating";

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

const ProfileSkeleton = () => (
    <div className="container mx-auto py-10 px-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <aside className="space-y-6">
                {/* 🛑 Ajuste: shadow-md en lugar de shadow-lg */}
                <Card className="shadow-md"><CardHeader className="flex flex-col items-center"><div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div><div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div><div className="h-4 w-1/2 bg-gray-100 rounded"></div></CardHeader><CardContent className="space-y-4"><div className="h-4 w-full bg-gray-100 rounded"></div><div className="h-4 w-3/4 bg-gray-100 rounded"></div></CardContent></Card>
                <Card className="shadow-md"><CardHeader><div className="h-6 w-1/2 bg-gray-200 rounded"></div></CardHeader><CardContent className="space-y-3"><div className="h-10 w-full bg-blue-100 rounded-lg"></div><div className="h-10 w-full bg-green-100 rounded-lg"></div></CardContent></Card>
            </aside>
            <div className="space-y-6">
                <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                <div className="h-96 w-full bg-gray-100 rounded-xl"></div>
            </div>
        </div>
    </div>
);

const Profile = () => {
  const { user, isSeller, convertToSeller, isLoading, isLoggedIn, toggleSellerMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"books" | "purchases" | "reviews">("books");
  const [isConverting, setIsConverting] = useState(false);

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (!isLoggedIn || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                    <AlertCircle className="h-16 w-16 text-red-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-bold mb-2">Acceso Denegado</h2>
                    <p className="text-gray-500 mb-6">Necesitas iniciar sesión para ver tu perfil.</p>
                    <Link to="/login"> 
                        <Button className="bg-blue-500 hover:bg-blue-600">Ir a Iniciar Sesión</Button>
                    </Link>
                </div>
            </div>
        );
    }
    
    const userName = user.name || "Usuario";
    const userLastName = user.lastName || "Anónimo";
    const userEmail = user.email || "No disponible";
    const userPhone = user.phone || "+XX XXX XXX XXX"; 
    
    const memberSinceYear = user.fechaCreacion 
      ? new Date(user.fechaCreacion).getFullYear()
      : new Date().getFullYear();

    const handleConvertToSeller = async () => {
      if (isSeller) return;

      setIsConverting(true);
      try {
        await convertToSeller();
        toast.success("¡Felicidades! Ahora eres vendedor. Ya puedes publicar libros.");
      } catch (error) {
        console.error("Error al convertir a vendedor:", error);
        toast.error("Hubo un error al activar el modo vendedor.");
      } finally {
        setIsConverting(false);
      }
    };

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
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} />
                  <AvatarFallback className="text-blue-500">{userName.charAt(0)}{userLastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{userName} {userLastName}</CardTitle>
                <CardDescription>Miembro desde {memberSinceYear}</CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <StarRating rating={4.8} size="sm" showValue={false} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userPhone}</span>
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
                
                {!isSeller && (
                  <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">¿Quieres vender libros?</p>
                        <p className="text-xs text-muted-foreground">
                          Activa el modo vendedor para publicar tus libros
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleConvertToSeller}
                  disabled={isSeller || isConverting} 
                >
                  {isSeller ? "Cambiar a comprador" : "Activar modo vendedor"}
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
