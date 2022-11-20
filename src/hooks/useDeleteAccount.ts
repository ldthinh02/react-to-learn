import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useDeleteAccount = () => {
  const mutation = useMutation(() =>
    api("users/delete-account", {
      method: "delete",
    })
  );

  return mutation;
};
