import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useMarkAsRead = () => {
  const mutation = useMutation(
    (values: MarkAsReadRequest) =>
      api("inbox/mark-as-read", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
