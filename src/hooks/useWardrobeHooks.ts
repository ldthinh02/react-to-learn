import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useAddOfficialWardrobe = () => {
  return useMutation((values: { product_id: string }) =>
    api(`/wardrobes/${values.product_id}/official`, { method: "POST" })
  );
};

export const useRemoveOfficialWardrobe = () => {
  return useMutation((values: { product_id: string }) =>
    api(`/wardrobes/${values.product_id}/official`, { method: "DELETE" })
  );
};
