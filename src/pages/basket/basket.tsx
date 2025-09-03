import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  ArrowLeft,
  Lock,
  Truck,
  RotateCcw,
} from "lucide-react";
import { MainSection } from "@/components";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  color: string;
  size: string;
}

interface PromoCode {
  code: string;
  discount: number;
  label: string;
}

const Basket: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 2,
      color: "Midnight Black",
      size: "One Size",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 299.99,
      originalPrice: 399.99,
      quantity: 1,
      color: "Space Gray",
      size: "42mm",
    },
    {
      id: 3,
      name: "Minimalist Backpack",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      quantity: 1,
      color: "Charcoal",
      size: "Medium",
    },
  ]);

  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number): void => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = (): void => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 0.1, label: "10% off" });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const handlePromoInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPromoCode(e.target.value);
  };

  const handleContinueShopping = (): void => {
    // Navigation logic would go here
    navigate("/products");
  };

  const handleCheckout = (): void => {
    // Checkout logic would go here
    console.log("Proceed to checkout");
  };

  const handleToggleWishlist = (itemId: number): void => {
    // Wishlist toggle logic
    console.log(`Toggle wishlist for item ${itemId}`);
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
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainSection title="Shopping cart">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {cartItems.map((item: CartItem, index: number) => (
              <div
                key={item.id}
                className={`p-6 ${
                  index !== cartItems.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-4">Color: {item.color}</span>
                      <span>Size: {item.size}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold ml-2">
                        Save ${(item.originalPrice - item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label={`Add ${item.name} to wishlist`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span
                      className="px-4 py-2 font-semibold"
                      aria-label={`Quantity: ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Promo Code
            </h3>
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-green-600 font-semibold">
                    {appliedPromo.code}
                  </div>
                  <div className="text-green-600 ml-2">
                    ({appliedPromo.label})
                  </div>
                </div>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={handlePromoInputChange}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={applyPromoCode}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-25">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({cartItems.length} items)
                </span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>You saved</span>
                  <span className="font-semibold">-${savings.toFixed(2)}</span>
                </div>
              )}
              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Promo ({appliedPromo.code})</span>
                  <span className="font-semibold">
                    -${promoDiscount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center text-blue-700 text-sm">
                  <Truck className="h-4 w-4 mr-2" />
                  Add ${(100 - subtotal).toFixed(2)} more for FREE shipping
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 flex items-center justify-center"
            >
              <Lock className="h-5 w-5 mr-2" />
              Secure Checkout
            </button>

            <div className="text-center text-sm text-gray-500 mb-6">
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
              <p className="text-xs text-gray-400 mb-2">We accept</p>
              <div className="flex justify-center space-x-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">VISA</span>
                <span className="px-2 py-1 bg-gray-100 rounded">MC</span>
                <span className="px-2 py-1 bg-gray-100 rounded">AMEX</span>
                <span className="px-2 py-1 bg-gray-100 rounded">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainSection>
  );
};

export default Basket;
