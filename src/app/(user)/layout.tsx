import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import TanstackQueryContextProvider from "@/context/TanstackQueryContextProvider";
import axios from "axios";
import apiServer from "@/app/lib/apiServer.server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce MERN Next",
  description:
    "E-commerce MERN Next is a full-stack e-commerce application built with Next.js, React, TypeScript, MongoDB, and Express.",
};

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // server-only: get user from backend using token cookie
  let user = null;
  try {
    const api = await apiServer();
    const res = await api.get("/users/me"); // adjust if your endpoint differs
    user = res.data?.data?.user ?? null;
  } catch (axiosError) {
    if (axios.isAxiosError(axiosError)) {
      // not authenticated or error -> user stays null
      user = null;
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7FAFC] text-[#0D141C]`}
      >
        <TanstackQueryContextProvider>
          <Navbar user={user} />
          {children}
          <Footer />
        </TanstackQueryContextProvider>
      </body>
    </html>
  );
}
