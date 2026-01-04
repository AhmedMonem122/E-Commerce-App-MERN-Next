import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import DashboardMobileSidebar from "./DashboardMobileSidebar";

interface Props {
  title: string;
  user?: User;
  role: "admin" | "user";
}

export default function DashboardNavbar({ title, user, role }: Props) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left: Mobile Menu + Title */}
        <div className="flex items-center gap-3">
          <DashboardMobileSidebar role={role} />

          <h1 className="text-indigo-600 text-sm md:text-xl font-semibold">
            {title}
          </h1>
        </div>

        {/* Right: User */}
        <div className="flex items-center gap-3">
          <Badge className="bg-indigo-600 text-white hidden sm:inline-flex">
            {role.toUpperCase()}
          </Badge>

          <Avatar>
            <AvatarImage src={user?.photo} />
            <AvatarFallback className="bg-indigo-600 text-white">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
