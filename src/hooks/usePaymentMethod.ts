import { api } from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import { useAuthentication } from "@/hooks/useAuthentication";

export const useGetPaymentMethods = () => {
  const { isLoggedIn } = useAuthentication();
  return useQuery(
    "my_payment_methods",
    () => {
      return api<StripeCard>("me/cards");
    },
    { refetchOnWindowFocus: false, enabled: !!isLoggedIn, retry: 0 }
  );
};

export const useSetCardAsDefault = () => {
  return useMutation((values: { source: string }) => {
    return api(`users/me/card/default/${values.source}`, {
      method: "put",
    });
  });
};

export const useAddPaymentMethod = () => {
  return useMutation((values: { source?: string | undefined }) =>
    api("me/cards", {
      method: "post",
      body: JSON.stringify(values),
    })
  );
};

export const useDeleteCard = () => {
  return useMutation((values: { source: { id: string } }) =>
    api("/me/delete-card", { method: "POST", body: JSON.stringify(values) })
  );
};
