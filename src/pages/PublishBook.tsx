import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, BookOpen, Loader2 } from "lucide-react"; // Importamos Loader2 para el spinner
import { toast } from "sonner";
import axiosClient from "@/api/axiosClient"; // 🚨 ¡Asegúrate de que esta ruta sea correcta!
import { useAuth } from "@/contexts/AuthContext"; // 🚨 ¡Asegúrate de que esta ruta sea correcta!

// --- Tipos ---
interface Category {
  id: string;
  name: string;
}

interface FormDataState {
  title: string;
  author: string;
  discount: string;
  lenguage: string,
  stock: string;
  yearPublication: string;
  numberPages: string;
  category: string; // Almacenará el ID de la categoría seleccionada
  state: string;
  price: string;
  description: string;
  // No guardamos la imagen en el estado de texto
}

const PublishBook = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Usamos el hook de autenticación para obtener el ID del vendedor
  
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    author: "",
    discount: "",
    lenguage: "",
    stock: "",
    yearPublication: "",
    numberPages: "",
    category: "", 
    state: "",
    price: "",
    description: "",
  });
  
  // Estado para manejar archivos
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // 1. Lógica para cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Suponemos que la ruta es /categories/find-all (ajusta si es diferente)
        const response = await axiosClient.get("/category"); 
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        toast.error("No se pudieron cargar las categorías.");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Manejador de cambios en inputs de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Manejador de cambio en Select
  const handleSelectChange = (key: keyof FormDataState, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  
  // Manejador de carga de archivos
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  // 3. Lógica para manejar el envío de FormData
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Por favor, sube una imagen para el libro.");
      return;
    }
    if (!user?.id) {
      toast.error("Error de autenticación. Por favor, inicia sesión de nuevo.");
      return;
    }

    setIsSubmitting(true);
    
    // Creamos el objeto FormData
    const data = new FormData();
    
    // A. Añadir la imagen
    data.append("images", imageFile); // 'images' debe coincidir con el campo esperado por Multer en el backend
    
    // B. Añadir los campos de texto
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("discount", formData.discount);
    data.append("stock", formData.stock);
    data.append("lenguage", formData.lenguage);
    data.append("yearPublication", formData.yearPublication);
    data.append("numberPages", formData.numberPages);
    data.append("state", formData.state);
    data.append("price", formData.price);
    data.append("description", formData.description);

//     data.append("categoryIds", JSON.stringify([formData.category])); 
    data.append("categoryIds", formData.category); 

    
    
    try {
      // ya que FormData necesita el header 'Content-Type': 'multipart/form-data'. Axios lo maneja automáticamente si no lo fuerzas.
      const response = await axiosClient.post("/book", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }); // Suponemos que la ruta es /books

      toast.success("¡Libro publicado exitosamente!", {
        description: `Título: ${response.data.title}`,
      });
      
      // Limpiar formulario y navegar
      setFormData({
        title: "", author: "", lenguage: "", yearPublication: "", numberPages: "",
        stock: "", discount: "",
        category: "", state: "", price: "", description: "" 
      });
      setImageFile(null);
      
      setTimeout(() => navigate("/profile"), 1000);
      
    } catch (error: any) {
      console.error("Error al publicar el libro:", error.response || error);
      const errorMessage = error.response?.data?.message || "Ocurrió un error desconocido al publicar.";
      
      toast.error("Error al publicar", {
        description: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl">Publicar libro</CardTitle>
            <CardDescription>
              Completa los detalles para publicar tu libro en venta
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>

            <CardContent className="space-y-6">

              {/* Imagen */}
              <div className="space-y-2">
                <Label>Imagen del libro</Label>

                <label htmlFor="image-upload">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
                    {imageFile ? (
                      <p className="text-primary font-medium">✅ {imageFile.name}</p>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Haz clic para subir una imagen
                        </p>
                      </>
                    )}
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG hasta 10MB
                    </p>
                  </div>
                </label>

                {/* Input real de archivo oculto */}
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              {/* Cierra iamgen */}

              {/* Información básica */}
              <div className="grid gap-4 md:grid-cols-2">
                
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="El Señor de los Anillos"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    placeholder="J.R.R. Tolkien"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lenguage">Idioma</Label>
                  <Input
                    id="lenguage"
                    placeholder="Español"
                    value={formData.lenguage}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    placeholder="3" 
                    value={formData.stock} 
                    onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount">Descuento</Label>
                  <Input 
                    id="discount"
                    type="number" 
                    min={0}
                    placeholder="10" 
                    value={formData.discount} 
                    onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearPublication">Año de publicación</Label>
                  <Input
                    id="yearPublication"
                    type="number"
                    placeholder="2023"
                    value={formData.yearPublication}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberPages">Número de páginas</Label>
                  <Input
                    id="numberPages"
                    type="number"
                    min={0}
                    placeholder="384"
                    value={formData.numberPages}
                    onChange={(e) =>
                      setFormData({ ...formData, numberPages: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger disabled={isLoadingCategories}>
                      <SelectValue placeholder={isLoadingCategories ? "Cargando categorías..." : "Selecciona una categoría"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length === 0 && !isLoadingCategories ? (
                        <SelectItem value="" disabled>No hay categorías disponibles</SelectItem>
                      ) : (
                          categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}> 
                              {cat.name}
                            </SelectItem>
                          ))
                        )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado del libro *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => handleSelectChange("state", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NUEVO">Nuevo</SelectItem>
                      <SelectItem value="USADO">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio (S/.) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="24.99"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el libro, su estado, contenido..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/profile")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gradient-secondary"
                  disabled={isSubmitting || isLoadingCategories}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar libro"
                  )}
                </Button>
              </div>
            </CardContent>

          </form>
        </Card>
      </main>
      
    </div>
  );
};

export default PublishBook;