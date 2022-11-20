import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useEstimateShippingCost = () => {
  return useMutation((values: { products: Product[]; country: string }) =>
    api<{ shipping_rate: number; tax_total: number }>(
      "checkout/estimate-shipping-rates",
      {
        method: "post",
        body: JSON.stringify(values),
      }
    )
  );
};
