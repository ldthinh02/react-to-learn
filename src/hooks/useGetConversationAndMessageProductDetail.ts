import { api } from "@/utils/api";
import { useMutation } from "react-query";
import { useChatBox } from "./useChatBox";
import { useGetConversation } from "@/hooks/useGetConversation";

interface GetConversationAndMessageProductDetailType {
  product: ProductApiData;
  customerId: number;
  setMessages: (value: Message[]) => void;
  setNameChat: (value: CustomerApiData) => void;
}

export const useGetConversationAndMessageProductDetail = () => {
  const { chatData, setChatData } = useChatBox();
  const { mutate: getConversation } = useGetConversation();
  return useMutation(
    async ({
      product,
      customerId,
      setMessages,
      setNameChat,
    }: GetConversationAndMessageProductDetailType) => {
      getConversation(
        { productId: product.id, customerId: customerId },
        {
          onSuccess: async (conversation) => {
            setChatData({
              ...chatData,
              product: product,
              conversation: conversation,
            });
            setNameChat(
              chatData.customer
                ? chatData.customer
                : conversation.product?.data.user.data.id === customerId
                ? conversation.product?.data.user.data.customer.data
                : conversation.customer?.data.customer.data
            );
            const messages = await api<Message[]>(
              `inbox/conversations/${conversation.id}/messages`,
              {
                method: "get",
              }
            );
            setMessages(messages);
          },
          onError: () => {
            setMessages([] as Message[]);
          },
        }
      );
    }
  );
};
