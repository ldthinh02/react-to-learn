import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUploadImageS3 = () => {
  return useMutation((values: { formData: FormData }) =>
    api<{ full_path: string; mimetype: string }[]>("upload/s3", {
      method: "post",
      body: values.formData,
    })
  );
};
