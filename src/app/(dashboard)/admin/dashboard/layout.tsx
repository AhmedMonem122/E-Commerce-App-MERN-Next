import { ReactNode } from "react";

export default async function AdminDashboardLayout({
  sidebar,
  navbar,
  children,
}: {
  sidebar: ReactNode;
  navbar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full bg-muted/40">
      {sidebar}
      <div className="flex-1 flex flex-col">
        {navbar}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
