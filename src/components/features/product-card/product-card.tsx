import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  buttonVariants,
  cardVariants,
  heartVariants,
  imageVariants,
  saleTagVariants,
} from "./common/constants";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
};

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const toggleLike = () => setLiked((prev) => !prev);

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 dark:border-gray-700"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      whileInView={cardVariants.visible}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => navigate("/product/" + product.id)}
    >
      {/* Image + Like + Sale */}
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
          variants={imageVariants}
        />

        <motion.button
          className={`absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-colors border border-gray-200 dark:border-gray-600 ${
            liked
              ? "bg-red-50 dark:bg-red-900/20"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          variants={heartVariants}
          whileTap="tap"
          onClick={toggleLike}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              liked
                ? "text-red-500 fill-current"
                : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </motion.button>

        <motion.div
          className="absolute top-4 left-4 bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold"
          variants={saleTagVariants}
          initial="hidden"
          animate="visible"
        >
          Sale
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <motion.h3
          className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {product.name}
        </motion.h3>

        {/* Rating */}
        <motion.div
          className="flex items-center mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.1 + i * 0.05,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Star
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 transition-colors duration-200">
            ({product.reviews})
          </span>
        </motion.div>

        {/* Price + Add to cart */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
              {product.price}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2 transition-colors duration-200">
              {product.originalPrice}
            </span>
          </div>

          <motion.button
            className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium transition-colors duration-200"
            variants={buttonVariants}
            whileTap="tap"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
