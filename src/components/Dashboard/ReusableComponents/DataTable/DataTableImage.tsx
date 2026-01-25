import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";

export default function DataTableImage({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20 rounded-xl">
        <AvatarImage src={image} alt={title} />
        <AvatarFallback className="rounded-xl bg-muted">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-semibold text-base">{title ?? "-"}</p>
      </div>
    </div>
  );
}
