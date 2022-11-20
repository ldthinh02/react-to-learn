import { api } from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetRfAttributes = (product: ProductData) => {
  const [rfCategory, setRfCategory] = useState<RfCategory>();
  const [rfCondition, setRfCondition] = useState<RfCondition>();
  const [rfBrand, setRfBrand] = useState<RfBrand>();
  useQuery(
    "rfCategory",
    async () => {
      const result = await api<RfCategory>("reflaunt/category/search-by-name", {
        method: "post",
        body: JSON.stringify({
          name: `${product.category.name}/${product.sub_category.name}`,
          rf_retailer_public_key: process.env.NEXT_PUBLIC_CLIENT_KEY,
        }),
      });
      setRfCategory(result);
    },
    { refetchOnWindowFocus: false, retry: 0 }
  );
  useQuery(
    "rfBrand",
    async () => {
      const result = await api<RfBrand>("reflaunt/designer/search-by-name", {
        method: "post",
        body: JSON.stringify({
          name: "ganni",
          rf_retailer_public_key: process.env.NEXT_PUBLIC_CLIENT_KEY,
        }),
      });
      setRfBrand(result);
    },
    { refetchOnWindowFocus: false, retry: 0 }
  );

  useQuery(
    "rfCondition",
    async () => {
      const result = await api<RfCondition>(
        "reflaunt/condition/search-by-name",
        {
          method: "post",
          body: JSON.stringify({
            name: product.condition.name,
            rf_retailer_public_key: process.env.NEXT_PUBLIC_CLIENT_KEY,
          }),
        }
      );
      setRfCondition(result);
    },
    { refetchOnWindowFocus: false, retry: 0 }
  );
  return { rfCategory, rfBrand, rfCondition };
};
