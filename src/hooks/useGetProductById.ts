import { api } from "@/utils/api";
import { useMutation } from "react-query";

interface GetProductByIdType {
  id: string;
}

export const useGetProductById = () => {
  return useMutation(async ({ id }: GetProductByIdType) => {
    return await api<ProductApiData>(`products/${id}/light`);
  });
};
