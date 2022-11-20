import { api } from "@/utils/api";
import { useMutation } from "react-query";
interface ProductQuery {
  constraints: string;
  relate_product_id: number;
}

export const useGetProductsByCategory = () => {
  return useMutation(
    async ({ constraints, relate_product_id }: ProductQuery) => {
      return api<ProductApiData[]>(
        `products?constraints={${constraints}}&relate_product_id=${relate_product_id}`
      );
    }
  );
};
