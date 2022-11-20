import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useGenerateShippingLabel = () => {
  const mutation = useMutation(
    (values: {
      height: string;
      length: string;
      shipmentId: string;
      token: string;
      transaction_id: string;
      weight: number;
      width: string;
      productData: ProductReflaunt[] | undefined;
      dropOffLocationLink: string;
    }) =>
      api(`landing-page/shipments/${values.shipmentId}/buy-shipping-label`, {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
