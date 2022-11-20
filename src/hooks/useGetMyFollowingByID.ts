import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetFollowingByID = (values: { seller_id: string }) => {
  return useQuery(
    "didIFollow",
    () => api<boolean>(`follows/${values.seller_id}`),
    {
      enabled: !!values.seller_id,
    }
  );
};
