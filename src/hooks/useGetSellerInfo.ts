import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useGetSellerInfo = () => {
  const mutation = useMutation("seller_info", (userId: number) => {
    return api<SellerProfile>(`users/${userId}/info`, { method: "get" });
  });
  return mutation;
};
