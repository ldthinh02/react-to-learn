import { api } from "@/utils/api";
import { useQuery } from "react-query";
export const useGetAllCategories = () => {
  return useQuery("getAllCategories", () => api("categories"), {
    refetchOnWindowFocus: false,
  });
};
