import { api } from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import { useAuthentication } from "@/hooks/useAuthentication";
import Cookies from "js-cookie";

interface GetReloadAddress {
  setAddress: (value: UpdateOrCreateAddress[]) => void;
}

export const useGetAddresses = () => {
  const token = useAuthentication();
  return useQuery(
    "getAddress",
    () => {
      return api<UpdateOrCreateAddress[]>("addresses");
    },
    { enabled: token.isLoggedIn }
  );
};

export const useGetReloadAddress = () => {
  const token = Cookies.get("token");
  return useMutation(async ({ setAddress }: GetReloadAddress) => {
    const address = await api<UpdateOrCreateAddress[]>("addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (address) setAddress(address);
  });
};
