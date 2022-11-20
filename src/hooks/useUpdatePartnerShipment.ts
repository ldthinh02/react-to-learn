import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUpdatePartnerShipment = () => {
  const mutation = useMutation(
    (values: { shipmentId: string; courier_name: string; type: string }) =>
      api(`landing-page/shipments/${values.shipmentId}`, {
        method: "PUT",
        body: JSON.stringify({
          courier_name: values.courier_name,
          type: values.type,
        }),
      }),
    {}
  );

  return mutation;
};
