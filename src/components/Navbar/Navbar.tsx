"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

type User = {
  _id?: string;
  name?: string;
  email?: string;
  photo?: string;
};

export default function Navbar({ user }: { user?: User | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // call server logout route which clears cookie
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // refresh or navigate to home/login
        router.push("/login"); // or router.refresh()
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-white/60 to-slate-50/40 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                TH
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-extrabold text-slate-900">
                  Tech Haven
                </span>
                <div className="text-xs text-slate-400">
                  Find your next gadget
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 items-center text-sm font-medium text-slate-700">
              <Link href="/" className="hover:text-slate-900 transition">
                Home
              </Link>
              <Link
                href="/products"
                className="hover:text-slate-900 transition"
              >
                Products
              </Link>
              <Link href="/brands" className="hover:text-slate-900 transition">
                Brands
              </Link>
              <Link
                href="/categories"
                className="hover:text-slate-900 transition"
              >
                Categories
              </Link>
              <Link href="/about" className="hover:text-slate-900 transition">
                About
              </Link>
            </div>

            {/* Auth area */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="px-4">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Create account
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Optional quick links */}
                <Link
                  href="/orders"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Wishlist
                </Link>

                {/* Avatar Dropdown (shadcn) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full ring-1 ring-slate-100 p-0.5 hover:ring-slate-200 transition">
                      <Avatar className="h-9 w-9">
                        {user.photo ? (
                          <AvatarImage
                            src={user.photo}
                            alt={user.name ?? "User"}
                          />
                        ) : (
                          <AvatarFallback>
                            {(user.name || user.email || "U").charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={handleLogout}
                      className="text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile: sheet menu trigger */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-md border border-slate-100 hover:bg-slate-50"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] p-6">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                      TH
                    </div>
                    <div className="text-lg font-bold">Tech Haven</div>
                  </Link>
                  <SheetClose asChild>
                    <button className="p-2 rounded-md border border-slate-100">
                      <X className="w-5 h-5" />
                    </button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg hover:bg-slate-100"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg hover:bg-slate-100"
                  >
                    Products
                  </Link>
                  <Link
                    href="/brands"
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg hover:bg-slate-100"
                  >
                    Brands
                  </Link>
                  <Link
                    href="/categories"
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg hover:bg-slate-100"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg hover:bg-slate-100"
                  >
                    About
                  </Link>
                </nav>

                <div className="mt-6 border-t pt-6">
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="py-3 px-4 rounded-lg text-center border"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="py-3 px-4 rounded-lg text-center bg-indigo-600 text-white"
                      >
                        Create account
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="py-3 px-4 rounded-lg"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setOpen(false)}
                        className="py-3 px-4 rounded-lg"
                      >
                        Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setOpen(false)}
                        className="py-3 px-4 rounded-lg"
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="py-3 px-4 rounded-lg text-left text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
