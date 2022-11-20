import { api } from "@/utils/api";
import { useMutation } from "react-query";
import cookies from "js-cookie";
import { useGetCheckoutCart } from "./useCheckout";

export const useLogin = () => {
  const { refetch: refetchCart } = useGetCheckoutCart();
  const mutation = useMutation(
    (values: LoginFormValues) =>
      api<{ access_token: string }>("auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {
      onSuccess: (data) => {
        cookies.set("token", data.access_token);
        refetchCart();
      },
    }
  );

  return mutation;
};
