"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dashboardLinks, DashboardRole } from "./dashboard-links";

interface Props {
  role: DashboardRole;
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({ role, collapsed, onToggle }: Props) {
  const pathname = usePathname();
  const links = dashboardLinks[role];

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo / Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </span>
        )}

        <Button size="icon" variant="ghost" onClick={onToggle}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Links */}
      <nav className="p-2 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
