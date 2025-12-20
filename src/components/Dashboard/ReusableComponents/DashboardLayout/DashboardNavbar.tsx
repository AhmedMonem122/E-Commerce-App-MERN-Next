import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  userName?: string;
  role: "admin" | "user";
}

export default function DashboardNavbar({ title, userName, role }: Props) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="text-xl font-semibold">{title}</h1>

        <div className="flex items-center gap-3">
          <Badge variant={role === "admin" ? "destructive" : "secondary"}>
            {role.toUpperCase()}
          </Badge>

          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              {userName?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
