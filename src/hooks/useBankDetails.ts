import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useAddOrUpdateBankAccount = () => {
  return useMutation((values: BankAccount) =>
    api(`users/${Number(values.id)}/payment-detail`, {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};
