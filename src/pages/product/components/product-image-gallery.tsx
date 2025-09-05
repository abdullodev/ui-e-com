import type { Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { imageVariants, itemVariants } from "../common/constants";

const ProductImageGallery: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const mainSliderRef = useRef<Slider>(null);

  const goToNext = () => mainSliderRef.current?.slickNext();
  const goToPrev = () => mainSliderRef.current?.slickPrev();

  const mainSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    beforeChange: (_: number, next: number) => setSelectedImageIndex(next),
  };

  const thumbSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 480, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
    ],
  };

  return (
    <motion.div
      className="space-y-4"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Image Slider */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Slider ref={mainSliderRef} {...mainSettings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <motion.img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={`w-full h-96 lg:h-[500px] object-cover cursor-zoom-in transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>
          ))}
        </Slider>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <motion.button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
             w-10 h-10 rounded-full bg-white/70 dark:bg-gray-600/40 
             shadow-md backdrop-blur-sm flex items-center justify-center 
             hover:bg-white/90 dark:hover:bg-gray-600/60 
             hover:shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.1,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
             w-10 h-10 rounded-full bg-white/70 dark:bg-gray-600/40 
             shadow-md backdrop-blur-sm flex items-center justify-center 
             hover:bg-white/90 dark:hover:bg-gray-600/60 
             hover:shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.1,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </motion.button>
          </>
        )}

        {/* Sale Badge */}
        <motion.div
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sale
        </motion.div>
      </div>

      {/* Thumbnail Slider */}
      {product.images.length > 1 && (
        <Slider {...thumbSettings}>
          {product.images.map((image, index) => (
            <div key={index} className="px-1.5">
              <button
                className={`w-full rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-blue-500"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                }`}
                onClick={() => mainSliderRef.current?.slickGoTo(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            </div>
          ))}
        </Slider>
      )}
    </motion.div>
  );
};

export default ProductImageGallery;
