import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";

export const useLogout = () => {
  const router = useRouter();
  const setCart = useCart((state) => state.setCart);
  const logout = () => {
    Cookies.remove("token");
    setCart(null);
    router.push("/");
  };
  return { logout };
};
