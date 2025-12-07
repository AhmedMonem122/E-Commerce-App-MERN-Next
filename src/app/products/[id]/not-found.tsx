"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw, Home, Search } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const ProductDetailsNotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Fade + move container
    tl.from(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    // Icon scale bounce
    tl.from(
      iconRef.current,
      {
        scale: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Floating animation
    gsap.to(iconRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "easeInOut",
    });

    // Fade text
    tl.from(
      textRef.current,
      {
        opacity: 0,
        y: 15,
        duration: 0.7,
      },
      "-=0.5"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center text-center px-6 py-20"
    >
      {/* Animated Icon */}
      <div
        ref={iconRef}
        className="w-32 h-32 mb-6 bg-muted rounded-full flex items-center justify-center shadow-lg"
      >
        <Search className="w-16 h-16 text-primary" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h1
        ref={textRef}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
      >
        Product Not Found
      </h1>

      <p className="text-gray-500 max-w-md mb-8">
        The product you&apos;re looking for doesn&apos;t exist, was removed, or
        the ID is invalid. Please explore our collections or return to the
        homepage.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="gap-2">
            <Home size={18} />
            Go Home
          </Button>
        </Link>

        <Link href="/products">
          <Button variant="secondary" className="gap-2">
            <Search size={18} />
            Browse Products
          </Button>
        </Link>

        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw size={18} />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsNotFound;
