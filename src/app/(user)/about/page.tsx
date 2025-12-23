import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import type { Metadata } from "next";
import aboutImage from "@/images/svgs/about.svg";

export const metadata: Metadata = {
  title: "About Us | E-Commerce",
  description:
    "Learn more about our e-commerce platform, our mission, and the team behind your favorite online shopping experience.",
  openGraph: {
    title: "About Us | E-Commerce",
    description:
      "Discover our story, values, and commitment to delivering the best online shopping experience.",
    url: "/about",
    siteName: "E-Commerce",
    images: [
      {
        url: "/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About E-Commerce",
      },
    ],
    type: "website",
  },
};

export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <Card className="bg-gradient-to-br from-blue-50 to-white shadow-xl border-0">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4 text-blue-900">
              About <span className="text-blue-600">E-Commerce</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to{" "}
              <span className="font-semibold text-blue-700">E-Commerce</span>,
              your trusted destination for seamless online shopping. Our mission
              is to connect people with the products they love, delivered with
              speed, care, and a smile.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-800">
                  Wide selection of top brands and products
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-800">
                  Fast, reliable, and secure delivery
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-800">24/7 customer support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-800">
                  Easy returns and hassle-free shopping
                </span>
              </li>
            </ul>
            <p className="text-gray-600">
              Our passionate team is dedicated to making your shopping
              experience delightful and memorable. Thank you for choosing us!
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={aboutImage}
              alt="About E-Commerce"
              width={320}
              height={320}
              className="rounded-xl shadow-lg object-contain bg-white"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
