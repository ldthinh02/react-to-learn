import { api } from "@/utils/api";
import { useMutation } from "react-query";

interface CheckIfUserExist {
  email_found: boolean;
}

export const useCheckIfUserExist = () => {
  return useMutation((values: { email: string }) =>
    api<CheckIfUserExist>(`users/${values.email}/exist`)
  );
};
