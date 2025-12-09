"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function CategoryProductsNotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power2.out",
    })
      .from(
        iconRef.current,
        {
          opacity: 0,
          scale: 0.6,
          rotate: -20,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        textRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6"
    >
      <AlertTriangle
        ref={iconRef}
        className="w-20 h-20 text-primary mb-6 drop-shadow-md"
      />

      <h1
        ref={titleRef}
        className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
      >
        No Products Found
      </h1>

      <p
        ref={textRef}
        className="text-muted-foreground max-w-md text-sm sm:text-base mb-6"
      >
        We couldn&apos;t find any products that match the selected filters or
        this category/brand. Try adjusting your search filters or explore all
        available products.
      </p>

      <div ref={buttonRef}>
        <Link href="/products">
          <Button className="px-6 py-2 rounded-xl text-base shadow-md hover:shadow-lg transition">
            Browse All Products
          </Button>
        </Link>
      </div>

      {/* Optional Expressive Illustration */}
      <div className="mt-10 opacity-80">
        <Image
          src="https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg"
          alt="Not found illustration"
          width={350}
          height={350}
          className="rounded-xl object-cover shadow-lg max-w-[250px] sm:max-w-[300px]"
        />
      </div>
    </div>
  );
}
