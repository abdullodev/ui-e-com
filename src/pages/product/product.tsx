import { motion } from "framer-motion";
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import React, { useState } from "react";

// Zustand store for managing product state
interface ProductStore {
  selectedProduct: Product | null;
  cartItems: CartItem[];
  likedProducts: Set<string>;
  selectedImageIndex: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  setSelectedProduct: (product: Product) => void;
  addToCart: (
    product: Product,
    quantity: number,
    size: string,
    color: string
  ) => void;
  toggleLike: (productId: string) => void;
  setSelectedImageIndex: (index: number) => void;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;
  setQuantity: (quantity: number) => void;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

// Mock product data
const mockProduct: Product = {
  id: "1",
  name: "Premium Wireless Headphones",
  price: "$299",
  originalPrice: "$399",
  rating: 4.8,
  reviews: 1247,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort materials for all-day wear.",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop",
  ],
  sizes: ["One Size"],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Red", hex: "#EF4444" },
  ],
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charge: 5min = 3hrs",
    "Premium comfort padding",
    "Bluetooth 5.0",
    "Touch controls",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 ohms",
    Weight: "250g",
    Connectivity: "Bluetooth 5.0, 3.5mm jack",
    Battery: "30 hours playback",
  },
  inStock: true,
  category: "Electronics",
};

// Simple Zustand store implementation (mock)
let store: ProductStore = {
  selectedProduct: mockProduct,
  cartItems: [],
  likedProducts: new Set(),
  selectedImageIndex: 0,
  selectedSize: "One Size",
  selectedColor: "Black",
  quantity: 1,
  setSelectedProduct: (product) => {
    store.selectedProduct = product;
  },
  addToCart: (product, quantity, size, color) => {
    const newItem: CartItem = {
      id: `${product.id}-${size}-${color}`,
      name: product.name,
      price: product.price,
      quantity,
      size,
      color,
      image: product.images[0],
    };
    store.cartItems.push(newItem);
  },
  toggleLike: (productId) => {
    if (store.likedProducts.has(productId)) {
      store.likedProducts.delete(productId);
    } else {
      store.likedProducts.add(productId);
    }
  },
  setSelectedImageIndex: (index) => {
    store.selectedImageIndex = index;
  },
  setSelectedSize: (size) => {
    store.selectedSize = size;
  },
  setSelectedColor: (color) => {
    store.selectedColor = color;
  },
  setQuantity: (quantity) => {
    store.quantity = quantity;
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
} as const;

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
} as const;

const heartVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
} as const;

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
} as const;

// ProductImageGallery Component
const ProductImageGallery: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      className="space-y-4"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <motion.img
          key={selectedImageIndex}
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className={`w-full h-96 lg:h-[500px] object-cover cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Sale Badge */}
        <motion.div
          className="absolute top-4 left-4 bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          Sale
        </motion.div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <motion.button
            key={index}
            className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              selectedImageIndex === index
                ? "border-blue-500 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
            onClick={() => setSelectedImageIndex(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-20 object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// ProductInfo Component
const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);

  const toggleLike = () => setLiked(!liked);

  const handleAddToCart = () => {
    store.addToCart(product, quantity, selectedSize, selectedColor);
    // You can add a toast notification here
  };

  return (
    <motion.div
      className="space-y-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.name}
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {product.category}
          </motion.p>
        </div>

        <div className="flex space-x-2">
          <motion.button
            className={`bg-white dark:bg-gray-800 rounded-full p-3 shadow-md transition-colors border border-gray-200 dark:border-gray-600 ${
              liked
                ? "bg-red-50 dark:bg-red-900/20"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleLike}
          >
            <Heart
              className={`h-6 w-6 transition-colors ${
                liked
                  ? "text-red-500 fill-current"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </motion.button>

          <motion.button
            className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md transition-colors border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Rating */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6 + i * 0.05,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Star
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </motion.div>
          ))}
        </div>
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {product.rating}
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          ({product.reviews} reviews)
        </span>
      </motion.div>

      {/* Price */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {product.price}
        </span>
        <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
          {product.originalPrice}
        </span>
        <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
          Save 25%
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-gray-600 dark:text-gray-400 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {product.description}
      </motion.p>

      {/* Color Selection */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Color: <span className="font-normal">{selectedColor}</span>
        </h3>
        <div className="flex space-x-3">
          {product.colors.map((color, index) => (
            <motion.button
              key={color.name}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? "border-blue-500 dark:border-blue-400 scale-110"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: selectedColor === color.name ? 1.1 : 1,
              }}
              transition={{ delay: 0.8 + index * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Size Selection */}
      {product.sizes.length > 1 && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Size: <span className="font-normal">{selectedSize}</span>
          </h3>
          <div className="flex space-x-2">
            {product.sizes.map((size, index) => (
              <motion.button
                key={size}
                className={`px-4 py-2 border rounded-md transition-all font-medium ${
                  selectedSize === size
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quantity & Add to Cart */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 font-medium min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <motion.button
          className="flex-1 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center font-semibold transition-colors duration-200 space-x-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </motion.button>
      </motion.div>

      {/* Stock Status */}
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            product.inStock ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span
          className={`font-medium ${
            product.inStock
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </motion.div>

      {/* Features */}
      <motion.div
        className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Truck className="h-5 w-5" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Shield className="h-5 w-5" />
            <span>2 Year Warranty</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <RotateCcw className="h-5 w-5" />
            <span>30-Day Returns</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ProductFeatures Component
const ProductFeatures: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Key Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {product.features.map((feature, index) => (
          <motion.div
            key={feature}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ProductSpecifications Component
const ProductSpecifications: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Specifications
      </h3>
      <div className="space-y-3">
        {Object.entries(product.specifications).map(([key, value], index) => (
          <motion.div
            key={key}
            className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {key}
            </span>
            <span className="text-gray-600 dark:text-gray-400">{value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main ProductPage Component
const ProductPage: React.FC = () => {
  const product = mockProduct;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Product not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductFeatures product={product} />
          <ProductSpecifications product={product} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
