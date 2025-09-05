import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  const { navigateWithTransition } = useNavigationTransition();

  const handleContinueShopping = (): void => {
    navigateWithTransition("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={handleContinueShopping}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
