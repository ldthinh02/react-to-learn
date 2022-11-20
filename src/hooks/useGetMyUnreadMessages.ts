import { api } from "@/utils/api";
import { useQuery } from "react-query";
import { useAuthentication } from "./useAuthentication";

export const useGetMyUnreadMessages = () => {
  const { isLoggedIn } = useAuthentication();
  const mutation = useQuery(
    "useGetMyUnreadMessages",
    () =>
      api<MyUnreadMessageApiData>(`inbox/unread`, {
        method: "get",
      }),
    { enabled: isLoggedIn, refetchOnWindowFocus: false }
  );

  return mutation;
};
