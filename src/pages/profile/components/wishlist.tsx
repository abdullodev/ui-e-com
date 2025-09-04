import { PageTransitionWrapper } from "@/components";
import { Trash2 } from "lucide-react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const wishlistItems: WishlistItem[] = [
  {
    id: "wish_1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    inStock: true,
  },
  {
    id: "wish_2",
    name: "Smart Fitness Watch",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    inStock: false,
  },
  {
    id: "wish_3",
    name: "Designer Sunglasses",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop",
    inStock: true,
  },
];

const Wishlist = () => {
  return (
    <PageTransitionWrapper>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Wishlist
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {wishlistItems.length} items saved for later
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-sm transition-shadow bg-white dark:bg-gray-800"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Remove button */}
                  <button className="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>

                  {/* Out of stock overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      disabled={!item.inStock}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        item.inStock
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Wishlist;
