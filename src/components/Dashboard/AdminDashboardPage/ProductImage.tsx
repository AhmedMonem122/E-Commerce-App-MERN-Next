import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product } from "@/types/product";
import { ImageIcon } from "lucide-react";

export default function ProductImage({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20 rounded-xl">
        <AvatarImage
          src={product.imageCover}
          alt={product.title ?? "Product"}
        />
        <AvatarFallback className="rounded-xl bg-muted">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-semibold text-base">{product.title ?? "-"}</p>
      </div>
    </div>
  );
}
