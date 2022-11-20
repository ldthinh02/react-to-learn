import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUnfollowSeller = () => {
  return useMutation((values: { seller_id: string }) =>
    api(`follows/by-seller/${values.seller_id}`, { method: "DELETE" })
  );
};
