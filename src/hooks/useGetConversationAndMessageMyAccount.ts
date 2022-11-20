import { api } from "@/utils/api";
import { useQuery } from "react-query";

interface GetConversationAndMessageMyAccountType {
  conversation?: ConversationApiData;
  setMessages: (value: Message[]) => void;
}

export const useGetConversationAndMessageMyAccount = ({
  setMessages,
  conversation,
}: GetConversationAndMessageMyAccountType) =>
  useQuery(
    "useGetConversationAndMessageMyAccount",
    async () => {
      if (conversation) {
        const messages = await api<Message[]>(
          `inbox/conversations/${conversation.id}/messages`,
          {
            method: "get",
          }
        );
        setMessages(messages);
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!conversation,
      retry: 0,
    }
  );
