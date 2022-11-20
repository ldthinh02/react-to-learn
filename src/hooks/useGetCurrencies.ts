import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetCurrencies = () => {
  return useQuery("getCurrency", () =>
    api<CurrencyData[]>("currency", {
      method: "get",
    })
  );
};
