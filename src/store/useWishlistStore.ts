import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./useCartStore";

interface WishlistItem extends Product {
  addedAt: Date; // When item was added to wishlist
}

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistActions {
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number | string) => void;
  clearWishlist: () => void;
  toggleWishlist: (product: Product) => void;
  moveToCart?: (
    productId: number | string,
    addToCartFn: (product: Product) => void
  ) => void;
  getTotalItems: () => number;
  isInWishlist: (productId: number | string) => boolean;
  getWishlistItem: (productId: number | string) => WishlistItem | undefined;
  sortWishlist: (
    sortBy: "name" | "price" | "addedAt",
    order: "asc" | "desc"
  ) => void;
}

type WishlistStore = WishlistState & WishlistActions;

// Define the wishlist store
const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addToWishlist: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (!existingItem) {
          // Add new item to wishlist with timestamp
          const wishlistItem: WishlistItem = {
            ...product,
            addedAt: new Date(),
          };

          set({
            items: [...items, wishlistItem],
          });
        }
      },

      removeFromWishlist: (productId: number | string) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      toggleWishlist: (product: Product) => {
        const { addToWishlist, removeFromWishlist, isInWishlist } = get();

        if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist(product);
        }
      },

      moveToCart: (
        productId: number | string,
        addToCartFn: (product: Product) => void
      ) => {
        const { items, removeFromWishlist } = get();
        const item = items.find((item) => item.id === productId);

        if (item) {
          // Remove addedAt property before adding to cart
          const { addedAt, ...productData } = item;
          addToCartFn(productData);
          removeFromWishlist(productId);
        }
      },

      sortWishlist: (
        sortBy: "name" | "price" | "addedAt",
        order: "asc" | "desc" = "asc"
      ) => {
        const { items } = get();

        const sortedItems = [...items].sort((a, b) => {
          let aValue: any;
          let bValue: any;

          switch (sortBy) {
            case "name":
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
              break;
            case "price":
              aValue = a.price;
              bValue = b.price;
              break;
            case "addedAt":
              aValue = new Date(a.addedAt).getTime();
              bValue = new Date(b.addedAt).getTime();
              break;
            default:
              return 0;
          }

          if (order === "asc") {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
          }
        });

        set({ items: sortedItems });
      },

      // Computed values (getters)
      getTotalItems: (): number => {
        return get().items.length;
      },

      isInWishlist: (productId: number | string): boolean => {
        return get().items.some((item) => item.id === productId);
      },

      getWishlistItem: (
        productId: number | string
      ): WishlistItem | undefined => {
        return get().items.find((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage", // Key for localStorage
      // Only persist the items array
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useWishlistStore;

// Export types for use in components
export type { Product, WishlistItem, WishlistStore };

// Usage Examples with TypeScript:

// 1. Add item to wishlist
// const addToWishlist = useWishlistStore(state => state.addToWishlist)
// const product: Product = { id: 1, name: 'Product 1', price: 29.99 }
// addToWishlist(product)

// 2. Remove item from wishlist
// const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist)
// removeFromWishlist(1)

// 3. Toggle wishlist (add if not exists, remove if exists)
// const toggleWishlist = useWishlistStore(state => state.toggleWishlist)
// toggleWishlist(product)

// 4. Clear all liked products
// const clearWishlist = useWishlistStore(state => state.clearWishlist)
// clearWishlist() // Removes all liked products

// 5. Move liked product to cart
// const moveToCart = useWishlistStore(state => state.moveToCart)
// const addToCart = useCartStore(state => state.addToCart)
// moveToCart(1, addToCart) // Moves from liked to cart

// 6. Sort liked products
// const sortWishlist = useWishlistStore(state => state.sortWishlist)
// sortWishlist('price', 'asc') // Cheapest liked products first
// sortWishlist('addedAt', 'desc') // Recently liked first

// 7. Get liked products data
// const likedItems: WishlistItem[] = useWishlistStore(state => state.items)
// const totalLiked: number = useWishlistStore(state => state.getTotalItems())
// const isLiked: boolean = useWishlistStore(state => state.isInWishlist(1))
// const likedItem = useWishlistStore(state => state.getWishlistItem(1))

// 8. Custom hook for wishlist operations (optional)
// export const useWishlist = () => {
//   const {
//     items,
//     addToWishlist,
//     removeFromWishlist,
//     clearWishlist,
//     toggleWishlist,
//     moveToCart,
//     getTotalItems,
//     isInWishlist,
//     getWishlistItem,
//     sortWishlist
//   } = useWishlistStore()
//
//   return {
//     items,
//     addToWishlist,
//     removeFromWishlist,
//     clearWishlist,
//     toggleWishlist,
//     moveToCart,
//     totalItems: getTotalItems(),
//     isInWishlist,
//     getWishlistItem,
//     sortWishlist,
//     isEmpty: items.length === 0
//   }
// }

// 9. Integration with cart store
// const WishlistToCartButton = ({ productId }: { productId: number }) => {
//   const moveToCart = useWishlistStore(state => state.moveToCart)
//   const addToCart = useCartStore(state => state.addToCart) // Import cart store
//
//   return (
//     <button onClick={() => moveToCart?.(productId, addToCart)}>
//       Move to Cart
//     </button>
//   )
// }

// 10. Using selectors for performance
// const wishlistCount = useWishlistStore(state => state.getTotalItems())
// const isProductLiked = useWishlistStore(state => state.isInWishlist(productId))
