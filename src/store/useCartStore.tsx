import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  image?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  category: string;
  color: string;
  size: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string) => void;
  removeItemCompletely: (productId: number | string) => void;
  clearCart: () => void;
  updateQuantity: (productId: number | string, newQuantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number | string) => number;
  isInCart: (productId: number | string) => boolean;
}

type CartStore = CartState & CartActions;

// Define the cart store
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addToCart: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // If item exists, increase quantity
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // If item doesn't exist, add new item with quantity 1
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId: number | string) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === productId);

        if (existingItem && existingItem.quantity > 1) {
          // If quantity > 1, decrease quantity
          set({
            items: items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          // If quantity = 1, remove item completely
          set({
            items: items.filter((item) => item.id !== productId),
          });
        }
      },

      removeItemCompletely: (productId: number | string) => {
        // Remove item completely regardless of quantity
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearCart: () => {
        // Remove all items from cart
        set({ items: [] });
      },

      updateQuantity: (productId: number | string, newQuantity: number) => {
        if (newQuantity <= 0) {
          // If quantity is 0 or negative, remove item
          get().removeItemCompletely(productId);
        } else {
          // Update quantity
          set({
            items: get().items.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
            ),
          });
        }
      },

      // Computed values (getters)
      getTotalItems: (): number => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: (): number => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemQuantity: (productId: number | string): number => {
        const item = get().items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },

      isInCart: (productId: number | string): boolean => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage", // Key for localStorage
      // Only persist the items array
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;

// Export types for use in components
export type { Product, CartItem, CartStore };

// Usage Examples with TypeScript:

// 1. Add item to cart
// const addToCart = useCartStore(state => state.addToCart)
// const product: Product = { id: 1, name: 'Product 1', price: 29.99 }
// addToCart(product)

// 2. Remove one quantity of item
// const removeFromCart = useCartStore(state => state.removeFromCart)
// removeFromCart(1)

// 3. Remove item completely
// const removeItemCompletely = useCartStore(state => state.removeItemCompletely)
// removeItemCompletely('product-123')

// 4. Clear entire cart
// const clearCart = useCartStore(state => state.clearCart)
// clearCart()

// 5. Update specific quantity
// const updateQuantity = useCartStore(state => state.updateQuantity)
// updateQuantity(1, 5) // Set quantity to 5

// 6. Get cart data with type safety
// const items: CartItem[] = useCartStore(state => state.items)
// const totalItems: number = useCartStore(state => state.getTotalItems())
// const totalPrice: number = useCartStore(state => state.getTotalPrice())
// const itemQuantity: number = useCartStore(state => state.getItemQuantity(1))
// const isInCart: boolean = useCartStore(state => state.isInCart(1))

// 7. Using selectors for performance
// const cartCount = useCartStore(state => state.getTotalItems())
// const cartTotal = useCartStore(state => state.getTotalPrice())

// 8. Custom hook for cart operations (optional)
// export const useCart = () => {
//   const {
//     items,
//     addToCart,
//     removeFromCart,
//     removeItemCompletely,
//     clearCart,
//     updateQuantity,
//     getTotalItems,
//     getTotalPrice,
//     getItemQuantity,
//     isInCart
//   } = useCartStore()
//
//   return {
//     items,
//     addToCart,
//     removeFromCart,
//     removeItemCompletely,
//     clearCart,
//     updateQuantity,
//     totalItems: getTotalItems(),
//     totalPrice: getTotalPrice(),
//     getItemQuantity,
//     isInCart
//   }
// }
