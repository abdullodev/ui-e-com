export const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$199.99",
    originalPrice: "$249.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$299.99",
    originalPrice: "$399.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 3,
    name: "Premium Backpack",
    price: "$89.99",
    originalPrice: "$129.99",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: "$159.99",
    originalPrice: "$199.99",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 5,
    name: "Premium Backpack",
    price: "$89.99",
    originalPrice: "$129.99",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 6,
    name: "Coffee Maker",
    price: "$159.99",
    originalPrice: "$199.99",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 7,
    name: "Wireless Headphones",
    price: "$199.99",
    originalPrice: "$249.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 8,
    name: "Smart Watch",
    price: "$299.99",
    originalPrice: "$399.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
  },
];

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
} as const;

export const imageVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
} as const;

export const heartVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.9 },
} as const;

export const buttonVariants = {
  rest: { scale: 1, backgroundColor: "#2563eb" },
  hover: {
    scale: 1.05,
    backgroundColor: "#1d4ed8",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: { scale: 0.95 },
} as const;

export const saleTagVariants = {
  hidden: { scale: 0, rotate: -12 },
  visible: {
    scale: 1,
    rotate: -12,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
} as const;
