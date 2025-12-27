"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { DashboardRole } from "./dashboard-links";
import { User } from "@/types/user";

interface Props {
  children: ReactNode;
  role: DashboardRole;
  user?: User;
}

export default function DashboardLayout({ children, role, user }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar
        role={role}
        collapsed={collapsed}
        onToggle={() => setCollapsed((p) => !p)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar
          title={
            role === "admin"
              ? "Admin Dashboard"
              : `${user?.name || "User"}'s Dashboard`
          }
          role={role}
          user={user}
        />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
