import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useSaveAddressViaToken = () => {
  const mutation = useMutation(
    (values: {
      address_1: string;
      address_2: string;
      city: string;
      country: string;
      country_alpha2_code: string;
      first_name: string;
      last_name: string;
      phone: string | undefined;
      phone_code: string | undefined;
      postal_code: string;
      state: string;
      title: string;
      token: string;
      zipcode: string;
      transaction_id: string;
      type: string;
    }) =>
      api(`landing-page/addresses/${values.token}/save-address`, {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {}
  );

  return mutation;
};
