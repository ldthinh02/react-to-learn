import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useSmartPricer = () => {
  const mutation = useMutation(
    (values: {
      category: string;
      brand: string;
      price: number;
      marketplace: string;
      marketplace_group: string;
      website: string;
      condition: string;
      product_in_cluster_count_threshold: number;
      original_price_to_predict: number;
      mode: string;
      model_product_in_cluster_count_threshold: number;
      currency: string | undefined;
    }) =>
      api<{
        recommended_price: number;
        recommended_price_highest: number;
        recommended_price_high: number;
        recommended_price_lowest: number;
        recommended_price_low: number;
      }>("reflaunt/smart-pricer", {
        method: "post",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
