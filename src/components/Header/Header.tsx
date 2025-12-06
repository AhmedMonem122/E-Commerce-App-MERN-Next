"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

const Header = () => {
  const slides = [
    {
      title: "Summer Collection 2024",
      description: "Discover the latest trends in summer fashion.",
      image:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
      buttonText: "Shop Now",
    },
    {
      title: "Premium Electronics",
      description: "Get the best deals on premium electronics.",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      buttonText: "Explore More",
    },
    {
      title: "Home & Living",
      description: "Transform your living space with our collection.",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      buttonText: "View Collection",
    },
  ];

  return (
    <header className="w-full mt-6 container mx-auto">
      <Carousel
        className="rounded-xl overflow-hidden shadow-lg"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-[600px]">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 mt-3 max-w-xl text-base md:text-lg">
                    {slide.description}
                  </p>

                  <Button
                    size="lg"
                    className="mt-6 bg-white text-black hover:bg-slate-200 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700 px-8 py-5 rounded-full shadow-md transition-all duration-300"
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </header>
  );
};

export default Header;
