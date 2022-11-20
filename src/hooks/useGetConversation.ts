import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useGetConversation = () => {
  const mutation = useMutation(
    "getConversations",
    ({ productId, customerId }: { productId: number; customerId: number }) => {
      return api<ConversationApiData>(
        `inbox/conversations/product/${productId}/customer/${customerId}`,
        {
          method: "get",
        }
      );
    }
  );
  return mutation;
};
