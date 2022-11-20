import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useForgotPassword = () => {
  const mutation = useMutation(
    (values: { email: string; return_url: string }) =>
      api("auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
