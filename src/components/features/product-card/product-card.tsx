import useCartStore, { type Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buttonVariants,
  cardVariants,
  heartVariants,
  imageVariants,
  saleTagVariants,
} from "./common/constants";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Cart store hooks
  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = useCartStore((state) => state.isInCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  // Get cart status
  const itemInCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const toggleLike = () => setLiked((prev) => !prev);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart

    setIsAdding(true);

    addToCart(product);

    // Add a small delay for better UX
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  const handleCardClick = () => {
    navigate("/product/" + product.id);
  };

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
      onClick={handleCardClick}
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
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
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

        {/* Cart quantity badge */}
        {itemInCart && (
          <motion.div
            className="absolute bottom-4 left-4 bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ShoppingCart className="h-3 w-3" />
            {quantity}
          </motion.div>
        )}
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
            className={`px-4 py-2 rounded-lg flex items-center font-medium transition-all duration-200 min-w-[80px] justify-center ${
              isAdding
                ? "bg-green-500 dark:bg-green-600 text-white"
                : itemInCart
                ? "bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white"
                : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
            }`}
            variants={buttonVariants}
            whileTap="tap"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check className="h-4 w-4" />
                <span className="text-sm">Added!</span>
              </motion.div>
            ) : itemInCart ? (
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">Add More</span>
              </motion.div>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Cart status indicator */}
        {itemInCart && (
          <motion.div
            className="mt-3 text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              {quantity} item{quantity > 1 ? "s" : ""} in cart
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
