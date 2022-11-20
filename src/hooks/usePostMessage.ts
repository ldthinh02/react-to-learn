import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const usePostMessage = () => {
  const mutation = useMutation(
    (values: { conversation_id: number; message: string }) =>
      api<Message>(`inbox/conversations/${values.conversation_id}/messages`, {
        method: "POST",
        body: JSON.stringify({ message: values.message }),
      }),
    {}
  );

  return mutation;
};
