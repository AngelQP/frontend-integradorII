import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Heart, Sword, Microscope, Clock } from "lucide-react";

interface CategoryExploreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCategory: (category: string) => void;
}

const categories = [
  {
    id: "Fantasía",
    name: "Fantasía",
    description: "Mundos mágicos, criaturas fantásticas y aventuras épicas",
    icon: Sword,
    count: 245,
  },
  {
    id: "Ciencia Ficción",
    name: "Ciencia Ficción",
    description: "Exploración espacial, tecnología futurista y mundos alternativos",
    icon: Microscope,
    count: 189,
  },
  {
    id: "Romance",
    name: "Romance",
    description: "Historias de amor, relaciones y emociones",
    icon: Heart,
    count: 312,
  },
  {
    id: "Thriller",
    name: "Thriller",
    description: "Suspenso, misterio y tramas emocionantes",
    icon: Clock,
    count: 156,
  },
  {
    id: "Historia",
    name: "Historia",
    description: "Eventos históricos, biografías y documentales",
    icon: BookOpen,
    count: 98,
  },
  {
    id: "all",
    name: "Ver todos",
    description: "Explora todo nuestro catálogo de libros",
    icon: Sparkles,
    count: 1000,
  },
];

export const CategoryExploreDialog = ({
  open,
  onOpenChange,
  onSelectCategory,
}: CategoryExploreDialogProps) => {
  const handleSelect = (categoryId: string) => {
    onSelectCategory(categoryId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">¿Qué te gustaría leer?</DialogTitle>
          <DialogDescription>
            Selecciona una categoría para descubrir libros que te encantarán
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant="outline"
                className="h-auto flex-col items-start gap-2 p-4 text-left hover:border-primary hover:bg-primary/5"
                onClick={() => handleSelect(category.id)}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{category.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count} libros
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {category.description}
                </p>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
