"use client";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Header = () => {
  const slides = [
    {
      title: "Summer Collection 2024",
      description: "Discover the latest trends in summer fashion",
      image:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
      buttonText: "Shop Now",
    },
    {
      title: "Premium Electronics",
      description: "Get the best deals on premium electronics",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      buttonText: "Explore More",
    },
    {
      title: "Home & Living",
      description: "Transform your living space with our collection",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      buttonText: "View Collection",
    },
  ];

  return (
    <header className="mx-auto my-5 container">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center justify-center gap-4">
                <div>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover rounded-md"
                    width={384}
                    height={384}
                    priority
                  />
                </div>
                <h2 className="text-3xl font-bold">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
                <button className="px-6 py-2 bg-[#0D141C] text-white font-medium rounded-md">
                  {slide.buttonText}
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </header>
  );
};

export default Header;
