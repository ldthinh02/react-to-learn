import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useShipmentProducts = (product_ids: string) => {
  const mutation = useQuery(["getShipmentProducts", product_ids], () => {
    return api<ProductReflaunt[]>(`landing-page/products`, {
      method: "post",
      body: JSON.stringify({ product_ids: product_ids }),
    });
  });
  return mutation;
};
