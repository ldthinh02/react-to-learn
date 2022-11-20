import { api } from "@/utils/api";
import { useQuery } from "react-query";
import { useAuthentication } from "./useAuthentication";

export const useGetConversationsBySeller = ({
  seller_id,
}: {
  seller_id?: number;
}) => {
  const { isLoggedIn } = useAuthentication();
  const mutation = useQuery(
    "getConversationsBySeller",
    () =>
      api<ConversationApiData[]>(`inbox/conversations/seller/${seller_id}`, {
        method: "get",
      }),
    { enabled: isLoggedIn && !!seller_id, refetchOnWindowFocus: false }
  );

  return mutation;
};
