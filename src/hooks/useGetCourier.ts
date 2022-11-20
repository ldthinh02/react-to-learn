import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetCourier = () => {
  const mutation = useQuery("getCourier", () => {
    return api<Courier[]>("couriers/list", {
      method: "post",
    });
  });
  return mutation;
};
