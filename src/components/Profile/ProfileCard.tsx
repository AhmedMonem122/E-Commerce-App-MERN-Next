import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/user";

export default function ProfileCard({ user }: { user: User }) {
  const dashboardRoute =
    user?.role === "admin" ? "/admin/dashboard" : "/user?./dashboard";

  return (
    <Card className="relative overflow-hidden border border-border/60 bg-background/80 backdrop-blur-xl shadow-xl">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-indigo-600/80 via-indigo-600/50 to-transparent" />

      <CardContent className="relative p-6 pt-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user?.photo} alt={user?.name} />
            <AvatarFallback className="text-xl font-semibold">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight">{user?.name}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>

            <Badge className="mt-3 bg-indigo-600">
              {user?.role.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border/60" />

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
          >
            <Link href={dashboardRoute}>Go to Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
