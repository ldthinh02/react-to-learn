import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUpdatePassword = () => {
  const mutation = useMutation((values: UpdatePassword) => {
    return api("users/me/update-password", {
      method: "put",
      body: JSON.stringify({
        password: values.new_password,
        re_password: values.re_new_password,
      }),
    });
  });

  return mutation;
};
