import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useCreateGiftCard = () => {
  return useMutation((values: { order_product_id: string }) =>
    api("users/create-voucher", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};
