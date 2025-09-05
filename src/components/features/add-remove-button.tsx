import useCartStore, { type Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface IAddRemoveButton {
  product: Product;
  size?: "small" | "large";
}

const AddRemoveButton = ({ product, size = "small" }: IAddRemoveButton) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const quantity = useCartStore(
    (state) => state.items?.find((p) => p.id === product.id)?.quantity || 0
  );

  const padding = size === "large" ? "p-4" : "p-2";
  const minWidth = size === "large" ? "min-w-[70px]" : "min-w-[40px]";
  const paddingBtn = size === "large" ? "py-4 px-8" : "py-2 px-3";

  return (
    <>
      {quantity > 0 ? (
        <motion.div
          className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.4,
          }}
        >
          <motion.button
            className={`${padding} rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 group`}
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(product.id, quantity - 1);
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: -5 }}
              whileTap={{ rotate: -10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <Minus
                className={`h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-200`}
              />
            </motion.div>
          </motion.button>

          <motion.span
            className={`font-semibold ${minWidth} text-center text-gray-800 dark:text-gray-200`}
            key={quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.3,
            }}
          >
            {quantity}
          </motion.span>

          <motion.button
            className={`${padding} rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 group`}
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(product.id, quantity + 1);
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
              whileTap={{ rotate: 10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <Plus
                className={`h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-green-500 transition-colors duration-200`}
              />
            </motion.div>
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          className={`${paddingBtn} rounded-md flex items-center justify-center font-semibold space-x-3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 text-white shadow-md transition-colors duration-500 ease-out`}
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            filter: "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.15))",
          }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <motion.div>
            <ShoppingCart className={`h-4 w-4`} />
          </motion.div>
          <motion.span>{size === "large" ? "Add to Cart" : "Add"}</motion.span>
        </motion.button>
      )}
    </>
  );
};

export default AddRemoveButton;
