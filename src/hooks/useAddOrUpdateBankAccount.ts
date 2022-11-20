import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useAddOrUpdateBankAccount = () => {
  const mutation = useMutation(
    (values: {
      data: BankAccountLandingPage;
      id: string;
      not_save_as_default: null;
      payment_method_id: 1;
    }) =>
      api(`users/${Number(values.id)}/payment-detail`, {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
