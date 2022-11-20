import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useUpdateNotificationCustomer = () => {
  const mutation = useMutation((values: CustomerUpdateNotificationApi) => {
    return api(`customer/notification`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
  });
  return mutation;
};
