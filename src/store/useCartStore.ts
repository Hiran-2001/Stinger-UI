import { create } from "zustand";
import { CartItem, Product } from "../types/cart.types";
import { createJSONStorage, persist } from "zustand/middleware";
import Axios from "../utils/axios";
import { toast } from "react-toastify";

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  cartCount: number;

  // Actions
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  fetchCartItems: () => Promise<void>;

  // Calculations
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      cartCount: 0,

      fetchCartItems: async () => {
        try {
          set({ isLoading: true });
          const response = await Axios.get('/cart');
          set({ items: response.data.data, cartCount: response?.data?.data?.length, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          toast.error("Failed to fetch cart items");
        }
      },

      addToCart: async (product, quantity) => {
        try {
          set({ isLoading: true });
                    
          const response = await Axios.post('/cart', {
            product_id: product.id,
            quantity,
            size:product.size,
            color:product.color
          });

          if (response.status === 201) {
            set((state) => {
              const existingItemIndex = state.items.findIndex(
                item => item.id === product.id
              );

              if (existingItemIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += quantity;

                return {
                  items: updatedItems,
                  cartCount: state.cartCount
                };
              } else {
                // Add new item
                const newItem: CartItem = {
                  id: product.id,
                  color: product.color,
                  size:product.size,
                  quantity
                };

                return {
                  items: [...state.items, newItem],
                  // Increment cartCount only for new items
                  cartCount: state.cartCount + 1
                };
              }
            });

            toast.success("Product added to cart");
          }

        } catch (error: any) {
          set({ error: error.message });
          console.log(error.response.data.message);
          
          toast.error(error.response.data.message);
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromCart: async (productId) => {
        try {
          set({ isLoading: true });

          await Axios.delete(`/cart/${productId}`);

          set((state) => ({
            items: state.items.filter(item => item.id !== productId),
            // Decrement cartCount when removing an item
            cartCount: state.cartCount - 1
          }));

          toast.success("Product removed from cart");
        } catch (error: any) {
          set({ error: error.message });
          toast.error("Failed to remove product");
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (productId, quantity) => {
        try {
          set({ isLoading: true });

          await Axios.patch(`/cart/${productId}`, { quantity });

          set((state) => ({
            items: state.items.map(item =>
              item.id === productId ? { ...item, quantity } : item
            ),
            cartCount: state.cartCount
          }));

          toast.success("Quantity updated");
        } catch (error: any) {
          set({ error: error.message });
          toast.error("Failed to update quantity");
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => {
        set({
          items: [],
          cartCount: 0  // Reset cartCount when clearing cart
        });
        toast.success("Cart cleared");
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item:any) => total + (item.price * item.quantity), 0);
      }
    }),

        {
          name: 'cart-storage',
          storage: createJSONStorage(() => localStorage)
        }
  )
);

export default useCartStore;