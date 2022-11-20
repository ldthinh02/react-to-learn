import { useMutation } from "react-query";
import { api } from "@/utils/api";

export const useGetOrders = () => {
  return useMutation(({ page }: { page: string }) =>
    api<{ data: OrderApiData[]; meta: { pagination: PaginationType } }>(
      `orders/bought?page=${page || 1}&per_page=5`,
      undefined,
      "raw"
    )
  );
};
