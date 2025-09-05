import { MainSection } from "@/components";
import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import useCartStore, { type CartItem } from "@/store/useCartStore";
import { Lock, RotateCcw, Truck } from "lucide-react";
import React, { useState } from "react";
import EmptyCart from "./components/empty-cart";
import InCartItem from "./components/in-cart-item";
import Promocode from "./components/promocode";

export interface IPromoCode {
  code: string;
  discount: number;
  label: string;
}

const Basket: React.FC = () => {
  const { items: cartItems } = useCartStore();

  const { navigateWithTransition } = useNavigationTransition();

  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<IPromoCode | null>(null);

  const handleCheckout = (): void => {
    navigateWithTransition("/checkout");
  };

  // Calculations
  const subtotal: number = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal: number = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings: number = originalTotal - subtotal;
  const promoDiscount: number = appliedPromo
    ? subtotal * appliedPromo.discount
    : 0;
  const shipping: number = subtotal > 100 ? 0 : 9.99;
  const tax: number = (subtotal - promoDiscount) * 0.08;
  const total: number = subtotal - promoDiscount + shipping + tax;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <MainSection title="Shopping cart">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            {cartItems.map((item: CartItem, index: number) => (
              <InCartItem index={index} item={item} />
            ))}
          </div>

          {/* Promo Code */}
          <Promocode
            appliedPromo={appliedPromo}
            promoCode={promoCode}
            setAppliedPromo={setAppliedPromo}
            setPromoCode={setPromoCode}
          />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 sticky top-25 transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal ({cartItems.length} items)
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>You saved</span>
                  <span className="font-semibold">-${savings.toFixed(2)}</span>
                </div>
              )}
              {appliedPromo && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Promo ({appliedPromo.code})</span>
                  <span className="font-semibold">
                    -${promoDiscount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-xl">
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    Total
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                <div className="flex items-center text-blue-700 dark:text-blue-400 text-sm">
                  <Truck className="h-4 w-4 mr-2" />
                  Add ${(100 - subtotal).toFixed(2)} more for FREE shipping
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors mb-4 flex items-center justify-center"
            >
              <Lock className="h-5 w-5 mr-2" />
              Secure Checkout
            </button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Lock className="h-4 w-4 mr-1" />
                Secure SSL encryption
              </div>
              <div className="flex items-center justify-center mb-2">
                <Truck className="h-4 w-4 mr-1" />
                Free returns within 30 days
              </div>
              <div className="flex items-center justify-center">
                <RotateCcw className="h-4 w-4 mr-1" />
                Easy exchanges
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                We accept
              </p>
              <div className="flex justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  VISA
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  MC
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  AMEX
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  PayPal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainSection>
  );
};

export default Basket;
