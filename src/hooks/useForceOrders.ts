import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useForceOrders = () => {
  return useMutation(
    (values: { checkout_id: string; payment_intent: string }) =>
      api<Checkout>(`checkout/force-order`, {
        method: "POST",
        body: JSON.stringify(values),
      })
  );
};
