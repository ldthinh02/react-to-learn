import cookies from "js-cookie";
import jwt from "jwt-decode";

export const useAuthentication = () => {
  const token = cookies.get("token");
  if (token) {
    const decoded =
      jwt<{ subject_type: string; data: { email: string }; sub: number }>(
        token
      );
    if (decoded.subject_type === "user") {
      return { isLoggedIn: true, email: decoded.data.email };
    } else if (decoded.subject_type === "guest") {
      return {
        isLoggedIn: false,
        guest_id: decoded.sub,
        subject_type: "guest",
      };
    }
  }
  return { isLoggedIn: false, email: null };
};

export const useHasToken = () => {
  const token = cookies.get("token");
  return !!token;
};
