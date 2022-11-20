import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useVerifyEmail = () => {
  return useMutation((value: { token: string }) =>
    api("me/verify-email", {
      method: "POST",
      body: JSON.stringify(value),
    })
  );
};

export const useResendVerifyEmail = () => {
  return useMutation(() =>
    api("me/resend-verification-email", {
      method: "POST",
    })
  );
};
