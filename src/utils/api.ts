import cookies from "js-cookie";

export const api = async <Type>(
  input: RequestInfo,
  init?: RequestInit,
  type?: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${input}`,
    {
      ...init,
      headers: {
        ...(!(input as string).includes("upload")
          ? { "Content-Type": "application/json" }
          : {}),
        "Rf-Retailer-Public-Key": process.env.NEXT_PUBLIC_CLIENT_KEY || "",
        "Rf-Retailer-Language": process.env.NEXT_PUBLIC_DEFAULT_LANG || "en",
        ...(process.browser && cookies.get("token")
          ? {
              Authorization: `Bearer ${cookies.get("token")}`,
            }
          : {}),
        ...(init?.headers ? init.headers : {}),
      },
    }
  ).catch((e: Error) => e);
  if (res instanceof Error) {
    throw Error(res.message);
  }
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.message ? data.message : "Error reaching api");
  }
  if (!data) {
    throw Error("No data returned");
  }
  if (type === "raw") {
    return data as Type;
  }
  return (data.data !== undefined ? data.data : data) as Type;
};

export const outsideApi = async <Type>(
  input: RequestInfo,
  init?: RequestInit
) => {
  const res = await fetch(`${input}`, {
    ...init,
  }).catch((e: Error) => e);
  if (res instanceof Error) {
    throw Error(res.message);
  }
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.message ? data.message : "Error reaching api");
  }
  if (!data) {
    throw Error("No data returned");
  }
  return data.data !== undefined ? data.data : (data as Type);
};
