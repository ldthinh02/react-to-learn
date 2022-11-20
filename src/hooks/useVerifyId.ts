import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useVerifyId = () => {
  const mutation = useMutation(
    (values: {
      frontImage: string;
      backImage: string;
      from?: string;
      birthday: string;
    }) =>
      api(`users/create-id-document`, {
        method: "post",
        body: JSON.stringify({
          front: values.frontImage,
          back: values.backImage,
          from: values.from,
          birthday: values.birthday,
        }),
      }),
    {}
  );

  return mutation;
};
