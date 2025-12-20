import {
  Home,
  LayoutDashboard,
  Package,
  Users,
  Building2,
  Tags,
  Star,
  CreditCard,
  ShoppingBag,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type DashboardRole = "admin" | "user";

export const dashboardLinks: Record<
  DashboardRole,
  {
    label: string;
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[]
> = {
  admin: [
    { label: "Home", href: "/", icon: Home },
    {
      label: "Overview",
      href: "/admin/dashboard/overview",
      icon: LayoutDashboard,
    },
    { label: "Products", href: "/admin/dashboard/products", icon: Package },
    { label: "Users", href: "/admin/dashboard/users", icon: Users },
    { label: "Brands", href: "/admin/dashboard/brands", icon: Building2 },
    { label: "Categories", href: "/admin/dashboard/categories", icon: Tags },
    { label: "Reviews", href: "/admin/dashboard/reviews", icon: Star },
    { label: "Payments", href: "/admin/dashboard/payments", icon: CreditCard },
  ],
  user: [
    { label: "Home", href: "/", icon: Home },
    { label: "Products", href: "/user/dashboard/products", icon: Package },
    { label: "Brands", href: "/user/dashboard/brands", icon: Building2 },
    { label: "Categories", href: "/user/dashboard/categories", icon: Tags },
    { label: "Reviews", href: "/user/dashboard/reviews", icon: Star },
    { label: "Orders", href: "/user/dashboard/orders", icon: ShoppingBag },
  ],
};
