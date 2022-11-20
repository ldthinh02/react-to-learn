import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

export const useGetStyles = () => {
  const [tagStyes, setTagStyles] = useState<Option[]>([]);
  const [tagWears, setTagWears] = useState<Option[]>([]);

  const { data } = useQuery("styles", () => api("styles"), {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      const dataStyle = data as Style[];
      if (tagStyes.length < 1) {
        const newStyle: Option[] = dataStyle
          .filter((item: Style) => item.style_type === "STYLES")
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((item: Style) => ({
            id: item.id,
            name: item.name,
            value: String(item.id),
          }));
        setTagStyles(newStyle);
      }
      if (tagWears.length < 1) {
        const newWear: Option[] = dataStyle
          .filter((item: Style) => item.style_type === "WEARS")
          .map((item: Style) => ({
            id: item.id,
            name: item.name,
            value: String(item.id),
          }));
        setTagWears(newWear);
      }
    }
  }, [data]);

  return { tagStyes, tagWears };
};

export const useCreateStyle = () => {
  const mutation = useMutation((data: Style) =>
    api<Style>("styles", {
      method: "post",
      body: JSON.stringify(data),
    })
  );
  return mutation;
};
