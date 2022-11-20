import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useCreateClaim = () => {
  const mutation = useMutation((values: ClaimFormApiRequest) =>
    api("issues", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );

  return mutation;
};
