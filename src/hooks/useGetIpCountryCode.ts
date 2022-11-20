import { api, outsideApi } from "@/utils/api";
import { useEffect, useState } from "react";

export const useGetIpCountryCode = () => {
  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    outsideApi("https://api.ipify.org/?format=json").then((res) => {
      api<{ actual_country: { country: string } }>("countries/detect", {
        method: "post",
        body: JSON.stringify({ ip: (res as { ip: string }).ip }),
      }).then((result) => {
        setCountryCode(result.actual_country.country);
      });
    });
  }, []);
  return { countryCode };
};
