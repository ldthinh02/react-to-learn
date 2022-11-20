import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useRateOrderByOrderIDAndSellerID = () => {
  return useMutation(
    (values: { order_id: string; seller_id: string; rate: number }) =>
      api(`orders/order_id/${values.order_id}/rate`, {
        method: "POST",
        body: JSON.stringify({
          seller_id: values.seller_id,
          rate: values.rate,
        }),
      })
  );
};
