import { AnimatePresence, motion } from "framer-motion";
import React from "react";

// Submit Button Component
const SubmitButton: React.FC<{
  isSubmitting: boolean;
  isLogin: boolean;
}> = ({ isSubmitting, isLogin }) => {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {isLogin ? "Signing in..." : "Creating account..."}
          </motion.div>
        ) : (
          <motion.span
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isLogin ? "Sign in" : "Create account"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SubmitButton;
