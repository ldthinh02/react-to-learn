import { api } from "@/utils/api";
import { useMutation } from "react-query";

export const useAddTrackingNumber = () => {
  const mutation = useMutation(
    (values: {
      courier_id: string;
      tracking_number: string;
      order_id: number;
      order_package_id: number;
    }) =>
      api(
        `orders/${values.order_id}/order_package/${values.order_package_id}/update-tracking-number`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      ),
    {}
  );

  return mutation;
};
