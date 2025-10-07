// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  color?: string;
  size?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => set((state) => {
        // التحقق إذا كان المنتج موجود بنفس اللون والمقاس
        const existingItem = state.items.find(
          item => item.id === product.id && 
                  item.color === product.color && 
                  item.size === product.size
        );

        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id && 
              item.color === product.color && 
              item.size === product.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }

        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0),
      })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);