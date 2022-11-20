import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useGetDesigners = () => {
  const [designers, setDesigners] = useState<Option[]>();

  const { data } = useQuery("getDesigners", () =>
    api<Designer[]>("designers", {
      method: "get",
    })
  );

  useEffect(() => {
    if (data) {
      const formatData: Option[] = data
        .filter((item: Designer) => item.sort_order < 50)
        .map((item: Designer) => ({
          id: item.id,
          name: item.name,
          value: String(item.id),
        }));
      setDesigners(formatData);
    }
  }, [data]);

  return { designers };
};
