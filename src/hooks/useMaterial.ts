import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useGetMaterials = () => {
  const [materials, setMaterials] = useState<Option[]>();

  const getAllMaterials = async () => {
    const data = await api<Material[]>("materials", { method: "GET" });

    if (data) {
      const formatData: Option[] = data.map((item: Material) => ({
        id: Number(item.id),
        name: item.name,
        value: String(item.id),
      }));
      setMaterials(formatData);
    }
  };

  useEffect(() => {
    if (!materials) getAllMaterials();
  }, [materials]);

  return { materials };
};
