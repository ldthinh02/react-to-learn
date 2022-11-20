import { onInit } from "@/utils/gtag";
import { useEffect } from "react";

export const useTagManager = () => {
  useEffect(() => {
    onInit();
  }, []);
};
