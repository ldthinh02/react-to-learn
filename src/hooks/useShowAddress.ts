import { api } from "@/utils/api";
import { useQuery } from "react-query";
import { useAuthentication } from "./useAuthentication";

export const useShowAddress = (id: string) => {
  const { isLoggedIn } = useAuthentication();
  return useQuery(
    ["showAddress", id],
    () => api<AddressApiData>(`addresses/${id}`),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: isLoggedIn && !!id,
    }
  );
};
