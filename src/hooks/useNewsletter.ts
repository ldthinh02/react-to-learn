import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useSubscribeNewsletter = () => {
  return useMutation((email: string) =>
    api("newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    })
  );
};
