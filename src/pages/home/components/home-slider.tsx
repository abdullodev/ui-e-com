// src/components/HomeSlider.tsx
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Slider, { type Settings } from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "New Collection",
    description: "Discover our latest arrivals for your style.",
    image:
      "https://avatars.mds.yandex.net/i?id=691648953d298ceba5d85b7c6c9d74aa_l-9840106-images-thumbs&n=13",
    buttonLabel: "Shop Now",
  },
  {
    id: 2,
    title: "Exclusive Offers",
    description: "Up to 50% off selected items. Limited time only!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Amboseli_elephantparade_JF2.jpg",
    buttonLabel: "Grab Deal",
  },
  {
    id: 3,
    title: "Premium Quality",
    description: "Upgrade your lifestyle with our premium products.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/ES4230005_-_La_Balsa_de_Valdemoro_de_la_Sierra.jpg",
    buttonLabel: "Explore",
  },
];

const HomeSlider = () => {
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false, // we disable default arrows and use custom
  };

  return (
    <div className="relative w-full mt-5 max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-lg">
      {/* Custom Prev Button */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/20 text-white p-3 rounded-full hover:bg-black/50 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Custom Next Button */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/20 text-white p-3 rounded-full hover:bg-black/50 transition"
      >
        <ChevronRight size={24} />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <Card className="relative h-[calc(100vh-110px)] max-h-[700px] min-h-[450px] border-0 rounded-none">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <CardContent className="absolute inset-0 bg-black/30 flex flex-col justify-center p-10 pl-22 pr-22 items-center text-white">
                <motion.h2
                  className="text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-lg mb-6 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {slide.description}
                </motion.p>
                <Button variant="secondary" className="rounded-xl shadow-md">
                  {slide.buttonLabel}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
