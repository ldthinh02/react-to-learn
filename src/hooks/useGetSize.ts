import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useGetSizes = () => {
  const [sizes, setSizes] = useState<Option[]>();

  const getAllSizes = async () => {
    const data = await api<Color[]>("sizes", { method: "GET" });

    if (data) {
      const formatData: Option[] = data.map((item: Color) => ({
        id: Number(item.id),
        name: item.name,
        value: String(item.id),
        field: item.type,
      }));
      setSizes(formatData);
    }
  };

  useEffect(() => {
    if (!sizes) getAllSizes();
  }, [sizes]);

  return { sizes };
};
