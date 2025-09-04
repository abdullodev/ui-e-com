import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner: React.FC = () => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

export default LoadingSpinner;
