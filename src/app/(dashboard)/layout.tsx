import { ReactNode } from "react";
import { headers } from "next/headers";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || "";

  const isAdmin = pathname.startsWith("/admin");
  const isUser = pathname.startsWith("/user");

  return (
    <>
      {isAdmin && admin}
      {isUser && user}
    </>
  );
}
