"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { DashboardRole } from "./dashboard-links";

interface Props {
  children: ReactNode;
  role: DashboardRole;
  userName?: string;
}

export default function DashboardLayout({ children, role, userName }: Props) {
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
            role === "admin" ? "Admin Dashboard" : `${userName}'s Dashboard`
          }
          role={role}
          userName={userName}
        />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
