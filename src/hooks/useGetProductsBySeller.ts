import { api } from "@/utils/api";
import { useMutation } from "react-query";
import queryString from "query-string";

interface GetProductBySellerQuery {
  constraints?: string;
  page?: string;
  seller_id: string;
  process_status?: string;
  per_page?: number;
}

export const useGetProductsBySeller = () => {
  return useMutation(
    async ({
      constraints,
      seller_id,
      page,
      per_page,
      process_status,
    }: GetProductBySellerQuery) => {
      const params = {
        per_page: per_page || 20,
        page: page || "1",
        constraints: JSON.stringify(constraints),
        ...(process_status ? { process_status } : {}),
      };
      return api<{
        data: GetProductBySellerApiData[];
        meta: { pagination: PaginationType };
      }>(
        `products/${seller_id}/get-product-by-seller?${queryString.stringify(
          params
        )}`,
        { method: "POST" },
        "raw"
      );
    }
  );
};
