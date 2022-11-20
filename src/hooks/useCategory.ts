import { useEffect, useState } from "react";
import queryString from "query-string";

export const useCategoryLink = (category: string, mainCategory: string) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    // skip all category
    const categoryArray = mainCategory !== "new-in" ? [mainCategory] : [];
    const categories = category.toLowerCase().includes("all")
      ? categoryArray
      : categoryArray.concat(category.toLowerCase());

    if (categories.length > 0) {
      setLink(
        `/${mainCategory}?${queryString.stringify(
          { categories },
          {
            arrayFormat: "comma",
          }
        )}`
      );
    } else {
      setLink(`/${mainCategory}`);
    }
  }, []);

  return link;
};
