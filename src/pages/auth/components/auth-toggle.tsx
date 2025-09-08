import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface IAuth {
  isLogin: boolean;
  onToggle: () => void;
}
// Auth Toggle Component
const AuthToggle: React.FC<IAuth> = ({ isLogin, onToggle }) => {
  return (
    <motion.div
      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
        <motion.button
          type="button"
          onClick={onToggle}
          className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLogin ? (
            <>
              Create a new account
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
              </motion.div>
              Back to sign in
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AuthToggle;
