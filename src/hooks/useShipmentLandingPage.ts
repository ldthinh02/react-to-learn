import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useShipmentLandingPage = (shipment_id: string) => {
  const mutation = useQuery(["getShipmentLandingPage", shipment_id], () => {
    return api<Shipment>(`landing-page/shipments/${shipment_id}`, {
      method: "get",
    });
  });
  return mutation;
};
