import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useInvalidateToken = () => {
  const mutation = useMutation(
    (values: {
      height: string;
      length: string;
      shipmentId: string;
      token: string;
      transaction_id: string;
      weight: number;
      width: string;
    }) =>
      api(`landing-page/shipments/${values.shipmentId}/token/invalidate`, {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
