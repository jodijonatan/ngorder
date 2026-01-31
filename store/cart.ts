import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. Import middleware

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

// 2. Bungkus fungsi dengan persist()
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Logika tambahan: Cek jika barang sudah ada, tambah qty saja
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + item.qty } : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, qty: Math.max(0, qty) } : item,
            )
            .filter((item) => item.qty > 0),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.qty, 0);
      },
    }),
    {
      name: "shopping-cart-storage", // Nama key di LocalStorage
      storage: createJSONStorage(() => localStorage), // Gunakan localStorage browser
    },
  ),
);
