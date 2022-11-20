import create from "zustand";
import { persist } from "zustand/middleware";

interface useCartType {
  cartConfirmed: Partial<Checkout> | null;
  setCartConfirmed: (cartConfirmed: Checkout | null) => void;
}

export const useCartConfirmed = create(
  persist<useCartType>(
    (set) => ({
      cartConfirmed: null,
      setCartConfirmed: (cartConfirmed: Checkout | null) => {
        if (cartConfirmed) {
          set(() => ({
            cartConfirmed: { ...cartConfirmed },
          }));
        } else {
          set(() => ({
            cartConfirmed: null,
          }));
        }
      },
    }),
    {
      name: "cartConfirmed",
    }
  )
);
