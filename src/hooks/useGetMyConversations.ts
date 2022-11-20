import { api } from "@/utils/api";
import { useQuery } from "react-query";
import { useAuthentication } from "./useAuthentication";

export const useGetMyConversations = () => {
  const { isLoggedIn } = useAuthentication();
  const mutation = useQuery(
    "useGetMyConversations",
    () =>
      api<{
        data: MyConversationApiData[];
        meta: { pagination: PaginationType; aggregation: { count: number } };
      }>(
        `inbox/me/unread-message`,
        {
          method: "get",
        },
        "raw"
      ),
    { enabled: isLoggedIn, refetchOnWindowFocus: false }
  );

  return mutation;
};
