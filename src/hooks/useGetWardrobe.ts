import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useGetWardrobes = () => {
  return useMutation("wardrobes", () => {
    return api<WardrobeDataApi[]>("wardrobes/main");
  });
};
