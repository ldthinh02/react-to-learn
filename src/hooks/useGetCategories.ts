import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Option[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>();

  const getAllCategories = async () => {
    const data = await api<Category[]>("categories/all", { method: "GET" });

    if (data) {
      const formatData: Option[] = data
        .filter((c: Category) => c.parent_id < 1)
        .map((item: Category) => ({
          id: Number(item.id),
          name: item.name,
          value: String(item.id),
        }));
      const subCate: Category[] = data.map((item: Category) => ({
        id: item.id,
        name: item.name,
        code: String(item.id),
        parent_id: item.parent_id,
      }));
      setCategories(formatData);
      setSubCategories(subCate);
    }
  };

  useEffect(() => {
    if (categories.length === 0) getAllCategories();
  }, [categories]);

  return { categories, subCategories };
};
