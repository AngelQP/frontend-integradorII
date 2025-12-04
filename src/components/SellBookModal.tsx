import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface SellBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SellBookModal = ({ open, onOpenChange }: SellBookModalProps) => {
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for submission
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("author", formData.author);
    submitData.append("editorial", formData.editorial);
    submitData.append("year", formData.year);
    submitData.append("pages", formData.pages);
    submitData.append("category", formData.category);
    submitData.append("condition", formData.condition);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    if (selectedImage) {
      submitData.append("image", selectedImage);
    }

    // Log FormData for demo (in real app, send to API)
    console.log("FormData entries:");
    for (const [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    toast.success("¡Libro publicado exitosamente!");
    onOpenChange(false);
    
    // Reset form
    setFormData({
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
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl text-center">Publicar libro</DialogTitle>
          <DialogDescription className="text-center">
            Completa los detalles para publicar tu libro en venta
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Imagen */}
          <div className="space-y-2">
            <Label>Imagen del libro</Label>
            <label className="block">
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-smooth cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-auto mx-auto object-cover rounded"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Haz clic para subir una imagen
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG hasta 10MB
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
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

            <div className="space-y-2 md:col-span-2">
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
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 gradient-secondary">
              Publicar libro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
