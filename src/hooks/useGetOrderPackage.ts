import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetOrderPackage = (orderPackageId: number) => {
  const mutation = useQuery(["getOrderPackage", orderPackageId], () => {
    if (orderPackageId) {
      return api<OrderPackage>(
        `orders/package_id/${orderPackageId}?fallback_language=en`,
        {
          method: "get",
        }
      );
    }
  });
  return mutation;
};
