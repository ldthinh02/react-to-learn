import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const shouldCheck: boolean = process.env.NEXT_PUBLIC_CONTENT_AUTH === "true";
const showPlaceholder: boolean = process.env.NEXT_PUBLIC_COMING_SOON === "true";

export const useContentAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(shouldCheck || showPlaceholder);

  const checkAuth = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
    });
    if (res.status === 401) {
      await router.replace("/content-login");
    }

    setLoading(false);
  };

  const setPlaceholder = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
    });
    if (res.status === 401 && !router.pathname.includes("coming-soon")) {
      await router.replace("/coming-soon");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (showPlaceholder && router.pathname !== "/content-login") {
      setPlaceholder();
    } else if (shouldCheck) {
      checkAuth();
    }
  }, []);

  return { loading };
};

export const useContentAuthLogin = () => {
  const router = useRouter();

  const login = async (body: { username: string; password: string }) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      router.replace("/content-login?error=true");
    } else {
      router.replace("/");
    }
  };

  return { login };
};
