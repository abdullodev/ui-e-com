import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check } from "lucide-react";
import { useState } from "react";

type ProductShareButtonProps = {
  url: string;
};

const ProductShareButton: React.FC<ProductShareButtonProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Reset after 2s
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("❌ Failed to copy:", error);
    }
  };

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleCopy}
        className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md transition-colors border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {copied ? (
          <Check className="h-6 w-6 text-green-500" />
        ) : (
          <Share2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        )}
      </motion.button>

      {/* Animation feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -80, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm rounded-lg bg-green-500 text-white shadow-md"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductShareButton;
