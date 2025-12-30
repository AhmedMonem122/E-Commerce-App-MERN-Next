"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  dashboardLinks,
  DashboardRole,
} from "./DashboardLayout/dashboard-links";

interface Props {
  role: DashboardRole;
}

export default function DashboardMobileSidebar({ role }: Props) {
  const pathname = usePathname();
  const links = dashboardLinks[role];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-indigo-600"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-72">
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b">
          <span className="text-indigo-600 text-lg font-bold">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </span>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-600 hover:bg-indigo-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
