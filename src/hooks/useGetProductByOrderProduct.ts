import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetProductByOrderProduct = (
  orderProductId: number,
  type: string
) => {
  const mutation = useQuery(
    ["getMessageByConversation", orderProductId, type],
    () => {
      if (orderProductId === 0) {
        return null;
      }
      return api<{ data: ProductApiData; type: string }>(
        `products/get-product-by-order-product/${orderProductId}?type=${type}`,
        {
          method: "get",
        }
      );
    }
  );
  return mutation;
};
