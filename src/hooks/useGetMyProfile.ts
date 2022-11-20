import { api } from "@/utils/api";
import { useQuery } from "react-query";
import { useAuthentication } from "@/hooks/useAuthentication";

export const useGetMyProfile = () => {
  const { isLoggedIn } = useAuthentication();
  return useQuery(
    "getMyProfile",
    () =>
      api<ProfileApiData>("me/profile", {
        method: "get",
      }),
    { refetchOnWindowFocus: false, enabled: isLoggedIn }
  );
};
