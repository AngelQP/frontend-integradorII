import { useState } from "react";
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
import { Upload, BookOpen } from "lucide-react";
import { toast } from "sonner";

const PublishBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    editorial: "",
    year: "",
    pages: "",
    category: "",
    condition: "",
    price: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Libro publicado exitosamente!");
    setTimeout(() => navigate("/profile"), 500);
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
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Haz clic para subir una imagen
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG hasta 10MB
                  </p>
                </div>
              </div>

              {/* Información básica */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="El Señor de los Anillos"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    placeholder="J.R.R. Tolkien"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editorial">Editorial</Label>
                  <Input
                    id="editorial"
                    placeholder="Editorial Planeta"
                    value={formData.editorial}
                    onChange={(e) =>
                      setFormData({ ...formData, editorial: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Año de publicación</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="2023"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Número de páginas</Label>
                  <Input
                    id="pages"
                    type="number"
                    placeholder="384"
                    value={formData.pages}
                    onChange={(e) =>
                      setFormData({ ...formData, pages: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasía</SelectItem>
                      <SelectItem value="scifi">Ciencia Ficción</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="history">Historia</SelectItem>
                      <SelectItem value="biography">Biografía</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Estado del libro *</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      setFormData({ ...formData, condition: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nuevo</SelectItem>
                      <SelectItem value="used">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="24.99"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el libro, su estado, contenido..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
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
                >
                  Publicar libro
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
