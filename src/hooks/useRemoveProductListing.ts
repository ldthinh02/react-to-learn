import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useRemoveProductListing = () => {
  return useMutation((sku: string) =>
    api<{ success: boolean }>(`products/sku/${sku}/process_status/archived`, {
      method: "POST",
    })
  );
};
