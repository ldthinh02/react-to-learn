import { useRouter } from "next/router";
import { useEffect } from "react";
import cookies from "js-cookie";
import { api } from "@/utils/api";
import { onEvent } from "@/utils/gtag";
import { useAuthentication } from "@/hooks/useAuthentication";
import jwt from "jwt-decode";
import { authRouterAvailable } from "@/utils/auth-routers";

const shouldCheck: boolean = process.env.NEXT_PUBLIC_CONTENT_AUTH === "true";
const showComingSoon: boolean = process.env.NEXT_PUBLIC_COMING_SOON === "true";

export const useAuthGuard = () => {
  const router = useRouter();
  const isAuthentication = useAuthentication();
  useEffect(() => {
    const pathname = router.asPath;
    if (
      (cookies.get("content_auth") !== undefined &&
        (shouldCheck || showComingSoon) &&
        authRouterAvailable.find((i) => pathname.includes(i))) ||
      (!shouldCheck &&
        !showComingSoon &&
        authRouterAvailable.find((i) => pathname.includes(i)))
    ) {
      const token = cookies.get("token");
      if (!token || (token && !isAuthentication)) {
        router.push({
          pathname: "/login",
          query: { redirect_to: pathname, loginActive: true },
        });
        return;
      } else {
        const tokenDecoded =
          jwt<{ data: { email: string }; subject_type: string }>(token);
        const landingPageToken = router.query.token as string;
        if (landingPageToken !== undefined && landingPageToken !== null) {
          const decoded = jwt<{ data: { email: string } }>(landingPageToken);
          if (decoded.data.email !== tokenDecoded.data.email) {
            router.push({
              pathname: "/login",
              query: { redirect_to: pathname, loginActive: true },
            });
            return;
          }
        }
        if (tokenDecoded.subject_type === "user") {
          api<ProfileApiData>("me/profile", {
            method: "get",
          }).then((res) => {
            // onEvent("user_id", { user_id: null });
            onEvent("user_id", {
              value: res.id.toString(),
            });
          });
        }
      }
    }
  }, [router]);
};
