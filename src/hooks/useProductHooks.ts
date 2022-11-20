import { api } from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useAddProduct = create<{
  product: ProductData;
  step: number;
  record_price: RecordPriceItem;
  resetProduct: () => void;
  setProduct: (product: ProductData) => void;
  setStep: (step: number) => void;
  setRecordPrice: (record_price: RecordPriceItem) => void;
}>(
  persist(
    (set) => ({
      product: {} as ProductData,
      record_price: {} as RecordPriceItem,
      step: 0,
      resetProduct: () => set({ product: {} as ProductData, step: 0 }),
      setProduct: (product: ProductData) => set({ product: product }),
      setRecordPrice: (record_price: RecordPriceItem) =>
        set({ record_price: record_price }),
      setStep: (step: number) => set({ step: step }),
    }),
    {
      name: "product",
    }
  )
);

export const useGetProductById = (id: string) => {
  return useQuery("getProductById", () => api(`products/${id}/light`), {
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!id,
  });
};

export const useGetProductByIds = () => {
  const mutation = useMutation(
    (id: number) =>
      api<ProductApiData>(`products/${id}/light`, {
        method: "GET",
      }),
    {}
  );

  return mutation;
};

export const useRecordPrice = () => {
  return useMutation((values: RecordPrice) =>
    api("products/record-price", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};
