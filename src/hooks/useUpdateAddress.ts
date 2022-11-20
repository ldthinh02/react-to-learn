import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUpdateAddress = () => {
  const mutation = useMutation(
    (values: UpdateOrCreateAddress) =>
      api(`addresses/${values.id}`, {
        method: "put",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
