import { api } from "@/utils/api";
import { useMutation } from "react-query";
import create from "zustand";
import { persist } from "zustand/middleware";

interface useCartType {
  cart: Partial<Checkout> | null;
  setCart: (cart: Checkout | null) => void;
}

export const useCart = create(
  persist<useCartType>(
    (set) => ({
      cart: null,
      setCart: (cart: Checkout | null) => {
        if (cart) {
          set(() => ({
            cart: { ...cart },
          }));
        } else {
          set(() => ({
            cart: null,
          }));
        }
      },
    }),
    {
      name: "cart",
    }
  )
);

export const useListingData = create(
  persist(
    (set) => ({
      listing_data: {} as { id: string; guest_id: string; email: string },
      setListingData: (listing_data: {
        id?: string;
        email?: string;
        guest_id: string;
      }) =>
        set(() => {
          return { listing_data };
        }),
    }),
    {
      name: "listing_data",
    }
  )
);

export const useAddToCart = () => {
  return useMutation((values: { product_id: number }) =>
    api(`checkout/cart/add/${values.product_id}`, {
      method: "POST",
      body: JSON.stringify({
        product_id: values.product_id,
        fallback_language: "en",
      }),
    })
  );
};

export const useRemoveFromCart = () => {
  return useMutation((values: { product_id: number }) =>
    api(`checkout/cart/remove/${values.product_id}`, {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};
