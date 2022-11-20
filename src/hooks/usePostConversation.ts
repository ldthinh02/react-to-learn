import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const usePostConversation = () => {
  const mutation = useMutation((values: ConversationPostData) =>
    api<ConversationApiData>("inbox/conversations", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );

  return mutation;
};
