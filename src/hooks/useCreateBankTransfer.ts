import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useCreateBankTransfer = () => {
  return useMutation((values: { order_product_id: string }) =>
    api("users/create-bank-transfer", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};
