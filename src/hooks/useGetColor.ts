import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useGetColors = () => {
  const [colors, setColors] = useState<Option[]>();

  const getAllColors = async () => {
    const data = await api<Color[]>("colors", { method: "GET" });

    if (data) {
      const formatData: Option[] = data.map((item: Color) => ({
        id: Number(item.id),
        name: item.name,
        value: String(item.id),
      }));
      setColors(formatData);
    }
  };

  useEffect(() => {
    if (!colors) getAllColors();
  }, [colors]);

  return { colors };
};
