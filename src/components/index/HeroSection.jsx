"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function HeroSection() {
  const slides = [
    "/image/image3.svg",
    "/image/image3.svg",
    "/image/image3.svg",
  ];

  return (
      <section className="max-w-7xl mx-auto  px-2 sm:px-4">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-lg sm:rounded-xl overflow-hidden shadow bg-gray-200">
          <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              autoplay={{ delay: 4000 }}
              loop
              className="w-full h-full"
          >
            {slides.map((url, i) => (
                <SwiperSlide key={i} className="swiper-slide-custom">
                  <Image
                      src={url}
                      alt={`Slide ${i + 1}`}
                      fill
                      priority={i === 0}
                      className="object-cover"
                  />
                </SwiperSlide>
            ))}


            {/* 좌우 버튼 */}
            <button
                className="custom-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
            w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full
            bg-white shadow-md text-black hover:shadow-lg z-10"
            >
              <ChevronLeft size={20} className="sm:size-24" />
            </button>
            <button
                className="custom-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
            w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full
            bg-white shadow-md text-black hover:shadow-lg z-10"
            >
              <ChevronRight size={20} className="sm:size-24" />
            </button>
          </Swiper>
        </div>
      </section>
  );
}
