import { useMutation } from "react-query";
import { api } from "@/utils/api";

export const useGetPackagesBySeller = () => {
  return useMutation(({ page }: { page: string }) =>
    api<{ data: OrderPackage[]; meta: { pagination: PaginationType } }>(
      `products/get-package-by-seller?page=${page || 1}&per_page=10`,
      {
        method: "post",
      },
      "raw"
    )
  );
};
