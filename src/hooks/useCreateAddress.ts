import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useCreateAddress = () => {
  const mutation = useMutation(
    (values: UpdateOrCreateAddress) =>
      api<UpdateOrCreateAddress>("addresses", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
