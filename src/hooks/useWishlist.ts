import { api } from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import { useAuthentication } from "@/hooks/useAuthentication";

export const useGetMyWishlist = () => {
  const { isLoggedIn } = useAuthentication();
  return useQuery(
    "myWishlist",
    () => {
      return api<Wishlist[]>("wishlist/me?includes=user,image_and_url");
    },
    { refetchOnWindowFocus: false, retry: 0, enabled: !!isLoggedIn }
  );
};

export const useCountLikes = () => {
  const mutation = useMutation("countLikes", (product_id: string) => {
    return api<number>(`wishlist/count/${product_id}`, { method: "GET" });
  });
  return mutation;
};

export const useRemoveFromWishlist = () => {
  return useMutation((value: { product_id: number }) =>
    api(`wishlist/${value.product_id}`, { method: "DELETE" })
  );
};

export const useAddToWishlist = () => {
  return useMutation((value: { product_id: number }) =>
    api("wishlist/me", {
      method: "POST",
      body: JSON.stringify(value),
    })
  );
};
