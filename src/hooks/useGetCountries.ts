import { api } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetCountries = () => {
  return useQuery("countries", () => api<CountryApiData[]>("countries/list"), {
    refetchOnWindowFocus: false,
  });
};

export const useGetAllCountries = () => {
  return useQuery("all-countries", () => api<CountryApiData[]>("countries"), {
    refetchOnWindowFocus: false,
  });
};
