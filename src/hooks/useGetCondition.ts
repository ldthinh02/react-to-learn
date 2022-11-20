import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useGetConditions = () => {
  const [conditions, setConditions] = useState<Option[]>();

  const { data } = useQuery("getCondition", () =>
    api<Designer[]>("conditions", {
      method: "get",
    })
  );

  useEffect(() => {
    if (data) {
      const formatData: Option[] = data.map((item: Designer) => ({
        id: Number(item.id),
        name: item.name.toLowerCase(),
        value: String(item.id),
      }));
      setConditions([{ name: "Select" }, ...formatData]);
    }
  }, [data]);

  return { conditions };
};
