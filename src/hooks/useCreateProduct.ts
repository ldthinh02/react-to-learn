import { api } from "@/utils/api";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

export const useCreateProduct = () => {
  const token = Cookies.get("token");
  const createProduct = useMutation((values: ProductDataApi) =>
    api<ProductApiData>("products/seller/create-prod", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return { createProduct };
};

export const useUpdateProduct = () => {
  const token = Cookies.get("token");
  const updateProduct = useMutation((values: ProductDataApi) =>
    api(`products/seller/update-prod/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return { updateProduct };
};
