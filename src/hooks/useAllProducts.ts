import { api } from "@/utils/api";
import { useMutation } from "react-query";
import queryString from "query-string";

interface UseAllProducts {
  searchAttributes: AttributeIds;
  sort?: string;
  page?: string;
  per_page?: number;
  slug?: string;
  wardrobes?: WardrobeDataApi[];
}

export const useAllProducts = () => {
  return useMutation(
    async ({
      searchAttributes,
      sort,
      page,
      per_page,
      slug,
      wardrobes,
    }: UseAllProducts) => {
      const constraints = {
        category_ids: Object.assign(
          [],
          searchAttributes.categories,
          searchAttributes.subCategories
        ),
        condition_ids: searchAttributes.conditions,
        size_ids: searchAttributes.sizes,
        provider_ids: searchAttributes.locations,
        color_ids: searchAttributes.colors,
        wardrobe_ids:
          wardrobes && wardrobes.length > 0
            ? wardrobes.filter((w) => w.slug_name === slug).map((w) => w.id)
            : [],
      };

      // filter out empty constraints
      const filter = Object.entries(constraints).reduce((prev, curr) => {
        const [key, value] = curr;
        // convert to string array
        const newValue = value.length > 0 ? { [key]: value.join(",") } : {};

        return {
          ...prev,
          ...newValue,
        };
      }, {});
      const params = {
        per_page: per_page || 20,
        page: page || "1",
        constraints: JSON.stringify({ ...filter, product_list: true }),
        sort: sort,
      };

      return api<{
        data: ProductApiData[];
        meta: { pagination: PaginationType };
      }>(`products?${queryString.stringify(params)}`, undefined, "raw");
    }
  );
};
