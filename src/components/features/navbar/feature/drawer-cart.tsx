import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import InCartItem from "@/pages/basket/components/in-cart-item";
import useCartStore, { type CartItem } from "@/store/useCartStore";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { cartBadgeVariants } from "../common/constants";

interface DrawerCartProps {
  className?: string;
}

const DrawerCart: React.FC<DrawerCartProps> = ({ className = "" }) => {
  const { items, clearCart } = useCartStore();
  const { navigateWithTransition } = useNavigationTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Trigger animation when items length changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [items.length]);

  // Memoized total calculation
  const totalSum = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const hasInCart = items.length > 0;

  // Handlers
  const handleViewBasket = useCallback(() => {
    setIsLoading(true);
    setIsOpen(false);
    navigateWithTransition("/basket");
    setTimeout(() => setIsLoading(false), 300);
  }, [navigateWithTransition]);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        <button
          className={`relative flex items-center justify-center p-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200  ${className}`}
          aria-label={`Shopping cart with ${items.length} items`}
        >
          <ShoppingCart className="h-6 w-6" aria-hidden="true" />
          <AnimatePresence>
            {hasInCart && (
              <motion.span
                key={animationKey}
                variants={cartBadgeVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
                aria-label={`${items.length} items in cart`}
              >
                {items.length}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </DrawerTrigger>

      <DrawerContent className="min-w-[540px] ml-auto h-screen bg-white dark:bg-gray-900 flex flex-col">
        {/* Header */}
        <DrawerHeader className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex-shrink-0">
          <DrawerTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Shopping Cart ({items.length})
          </DrawerTitle>
        </DrawerHeader>

        {/* Cart Items (scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <ShoppingCart
                  className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add some items to get started
                </p>
              </motion.div>
            ) : (
              items.map((item: CartItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <InCartItem index={index} item={item} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Sticky Section */}
        {hasInCart && (
          <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 space-y-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Total
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                ${totalSum.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearCart}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-500 transition-colors flex items-center justify-center disabled:opacity-50"
                disabled={isLoading}
                aria-label="Clear cart"
              >
                <Trash2 className="h-5 w-5 mr-2" aria-hidden="true" />
                Clear Cart
              </motion.button>

              <DrawerClose asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewBasket}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors flex items-center justify-center disabled:opacity-50"
                  disabled={isLoading}
                  aria-label="View basket"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" aria-hidden="true" />
                  {isLoading ? "Loading..." : "View Basket"}
                </motion.button>
              </DrawerClose>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default React.memo(DrawerCart);
