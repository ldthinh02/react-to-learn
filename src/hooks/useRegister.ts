import { api } from "@/utils/api";
import { onEvent } from "@/utils/gtag";
import { useMutation } from "react-query";

export const useRegister = () => {
  return useMutation(
    (values: RegisterFormValues) =>
      api<{ access_token: string }>("auth/register", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          nickname: values.user_name,
        }),
      }),
    {
      onSuccess: () => {
        onEvent("complete_registration", {});
      },
    }
  );
};

export const useConvertGuestToUser = () => {
  return useMutation((guest_id: string) =>
    api(`listing-product-states/${guest_id}/sync`, { method: "put" })
  );
};
