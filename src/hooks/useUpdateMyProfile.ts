import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUpdateMyProfile = () => {
  const mutation = useMutation((values: UpdateMyProfile) => {
    return api("users/me", {
      method: "put",
      body: JSON.stringify(values),
    });
  });

  return mutation;
};
