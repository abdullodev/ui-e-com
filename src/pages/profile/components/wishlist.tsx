import { PageTransitionWrapper, ProductCard } from "@/components";
import useWishlistStore from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Wishlist = () => {
  const {
    items: wishlistItems,
    clearWishlist,
    getTotalItems,
  } = useWishlistStore();

  const handleClearWishlist = () => {
    clearWishlist();
  };

  if (wishlistItems.length === 0) {
    return (
      <PageTransitionWrapper>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Wishlist
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your wishlist is empty
            </p>
          </div>

          {/* Empty State */}
          <div className="p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No items in your wishlist
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding products you love to your wishlist!
            </p>
          </div>
        </div>
      </PageTransitionWrapper>
    );
  }

  return (
    <PageTransitionWrapper>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Wishlist
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} saved
              for later
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <motion.button
              onClick={handleClearWishlist}
              className="px-3 py-1.5 rounded-lg text-sm font-medium 
               text-red-600 dark:text-red-400 
               bg-red-50 dark:bg-red-500/10 
               hover:bg-red-100 dark:hover:bg-red-500/20 
               hover:text-red-700 dark:hover:text-red-300
               transition-colors duration-300 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <ProductCard index={index} product={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Wishlist;
