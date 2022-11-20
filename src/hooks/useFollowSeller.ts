import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useFollowSeller = () => {
  const mutation = useMutation(
    (values: FollowUser) =>
      api("follows/me", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
