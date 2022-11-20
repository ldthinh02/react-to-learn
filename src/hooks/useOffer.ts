import { api } from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import { useAuthentication } from "@/hooks/useAuthentication";

export const useCreateNewOffer = () => {
  return useMutation(
    (values: {
      product_id: string;
      currency_id: number;
      initial_amount: number;
    }) => api("offers", { method: "POST", body: JSON.stringify(values) })
  );
};

export const useGetMyOffers = () => {
  const { isLoggedIn } = useAuthentication();
  return useQuery(
    "my-offers",
    () => {
      return api<Offer[]>("offers");
    },
    { enabled: !!isLoggedIn }
  );
};

export const useUpdateOffer = () => {
  return useMutation(
    (values: { offer_id: string; status: string; amount?: number }) =>
      api(`offers/${values.offer_id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      })
  );
};
