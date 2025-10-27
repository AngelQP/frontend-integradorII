import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "./StartRating";
import type { Book } from "./BookCard";
import { Mail, MessageCircle, User, Bell, CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BookDetailModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookDetailModal = ({
  book,
  open,
  onOpenChange,
}: BookDetailModalProps) => {
  const { toast } = useToast();
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [priceAlertSet, setPriceAlertSet] = useState(false);

  if (!book) return null;

  const vendorName = book.vendorName || "Carlos Rodríguez";
  const vendorRating = book.vendorRating || 4.8;
  const vendorVerified = book.vendorVerified ?? true;
  const vendorEmail = "vendedor@ejemplo.com";
  const vendorWhatsApp = "123456789";

  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en "${book.title}" de ${book.author}. ¿Sigue disponible?`
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(vendorEmail);
    toast({
      title: "Email copiado",
      description: "El correo electrónico se ha copiado al portapapeles",
    });
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(vendorWhatsApp);
    toast({
      title: "Número copiado",
      description: "El número de WhatsApp se ha copiado al portapapeles",
    });
  };

  const handlePriceAlert = () => {
    setPriceAlertSet(true);
    toast({
      title: "Alerta de precio activada",
      description: "Te notificaremos si el precio baja",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <img
              src={book.image}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <DialogHeader>
              <div className="flex gap-2 mb-2">
                <Badge
                  className={
                    book.condition === "new"
                      ? "gradient-primary"
                      : "gradient-secondary"
                  }
                >
                  {book.condition === "new" ? "Nuevo" : "Usado"}
                </Badge>
                <Badge variant="outline">{book.category}</Badge>
              </div>
              <DialogTitle className="text-2xl">{book.title}</DialogTitle>
              <DialogDescription className="text-lg">
                por {book.author}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-4">
              <StarRating rating={book.rating} size="lg" />
              <span className="text-sm text-muted-foreground">
                (128 reseñas)
              </span>
            </div>

            <Separator className="my-4" />

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${book.price.toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Una fascinante historia que cautiva desde la primera página. 
                Este libro te transportará a un mundo único donde la imaginación 
                no tiene límites. Perfecto estado de conservación, sin marcas ni 
                dobleces. Una oportunidad única para agregar esta joya a tu colección.
              </p>
            </div>

            {/* Details */}
            <div className="mb-6 space-y-2">
              <h3 className="font-semibold mb-3">Detalles del libro</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Editorial:</div>
                <div className="font-medium">Editorial Planeta</div>
                <div className="text-muted-foreground">Año:</div>
                <div className="font-medium">2023</div>
                <div className="text-muted-foreground">Páginas:</div>
                <div className="font-medium">384</div>
                <div className="text-muted-foreground">Idioma:</div>
                <div className="font-medium">Español</div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Price Alert */}
            <div className="mb-4">
              <Button
                onClick={handlePriceAlert}
                variant="outline"
                size="sm"
                disabled={priceAlertSet}
                className="w-full"
              >
                <Bell className="mr-2 h-4 w-4" />
                {priceAlertSet ? "Alerta activada" : "Notificar si baja de precio"}
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Seller Info */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Vendedor</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{vendorName}</span>
                  {vendorVerified && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <CheckCircle className="h-3 w-3 text-secondary" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={vendorRating} size="sm" showValue={true} />
                  <span className="text-sm text-muted-foreground">(95 ventas)</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-auto space-y-4">
              {!showContactOptions ? (
                <>
                  <Button
                    onClick={() => setShowContactOptions(true)}
                    size="lg"
                    className="w-full gradient-primary"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contactar vendedor
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Regístrate para guardar favoritos, dejar reseñas y contactar más rápido
                  </p>
                </>
              ) : (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Opciones de contacto</h4>
                  
                  {/* WhatsApp */}
                  <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopyWhatsApp}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground break-all">{vendorWhatsApp}</p>
                    <Button
                      onClick={() => window.open(`https://wa.me/${vendorWhatsApp}?text=${whatsappMessage}`)}
                      size="sm"
                      className="w-full gradient-secondary"
                    >
                      Enviar mensaje
                    </Button>
                  </div>

                  {/* Email */}
                  <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopyEmail}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground break-all">{vendorEmail}</p>
                    <Button
                      onClick={() => window.open(`mailto:${vendorEmail}?subject=Interesado en ${book.title}`)}
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      Enviar correo
                    </Button>
                  </div>

                  <Button
                    onClick={() => setShowContactOptions(false)}
                    variant="ghost"
                    size="sm"
                    className="w-full"
                  >
                    Volver
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
