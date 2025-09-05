import { AddRemoveButton } from "@/components";
import useCartStore, { type CartItem } from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";

interface Props {
  item: CartItem;
  index: number;
}

const InCartItem = ({ item, index }: Props) => {
  const { items: cartItems, removeItemCompletely } = useCartStore();

  const toggleWishList = useWishlistStore((state) => state.toggleWishlist);
  const isLiked = useWishlistStore((state) =>
    state.items.some((p) => p.id === item.id)
  );

  return (
    <div
      key={item.id}
      className={`p-6 ${
        index !== cartItems.length - 1
          ? "border-b border-gray-100 dark:border-gray-700"
          : ""
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={item?.images?.[0]}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {item.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="mr-4">Color: {item.color}</span>
            <span>Size: {item.size}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              ${item.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
              ${item.originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold ml-2">
              Save ${(item.originalPrice - item.price).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <motion.button
            className={`rounded-full p-2 shadow-md transition-all duration-300 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => removeItemCompletely(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-red-500 dark:hover:text-red-500" />
          </motion.button>
          <motion.button
            className={`rounded-full p-2 shadow-md transition-all duration-300 border ${
              isLiked
                ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 scale-105"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => toggleWishList(item)}
            aria-label={`Add ${item.name} to wishlist`}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked
                  ? "text-red-500 fill-current scale-110"
                  : "text-gray-600 dark:text-gray-400 hover:text-red-400"
              }`}
            />
          </motion.button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <AddRemoveButton product={item} />
        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default InCartItem;
