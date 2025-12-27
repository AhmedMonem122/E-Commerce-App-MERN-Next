import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";

interface Props {
  title: string;
  user?: User;
  role: "admin" | "user";
}

export default function DashboardNavbar({ title, user, role }: Props) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="text-[14px] md:text-xl font-semibold">{title}</h1>

        <div className="flex items-center gap-3">
          <Badge className="bg-indigo-600 text-white">
            {role.toUpperCase()}
          </Badge>

          <Avatar>
            <AvatarImage src={user?.photo} />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
