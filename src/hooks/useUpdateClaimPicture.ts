import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUpdateClaimPicture = () => {
  return useMutation((values: { formData: FormData }) =>
    api("upload/s3", {
      method: "post",
      body: values.formData,
    })
  );
};
