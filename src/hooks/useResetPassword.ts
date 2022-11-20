import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useResetPassword = () => {
  const mutation = useMutation((values: UpdatePassword) => {
    return api("auth/reset-password", {
      method: "post",
      body: JSON.stringify({
        password: values.new_password,
        token: values.token,
      }),
    });
  });

  return mutation;
};
