import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAllProducts } from "@/hooks/useAllProducts";
import { getResult } from "@/utils/algolia";
import ProductItem from "@/components/ProductItem";
import { PROCESS_STATUS } from "@/utils/constants";
import * as _ from "lodash";

export const useGetAttributes = ({
  categories,
  subCategories,
  conditions,
  sizes,
  locations,
  colors,
  wardrobes,
}: Attributes) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const router = useRouter();
  const { mutate: getAllProduct } = useAllProducts();
  const [attributes, setAttributes] = useState<AttributeIds>({
    categories: [],
    subCategories: [],
    conditions: [],
    sizes: [],
    locations: [],
    colors: [],
  });
  const [selected, setSelected] = useState<AttributeNames>({
    categories: [],
    subCategories: [],
    conditions: [],
    sizes: [],
    locations: [],
    colors: [],
  });

  const getIds = (
    values: Attribute[],
    names: string[],
    attributeName?: string
  ) => {
    if (attributeName === "sizes") {
      if (
        router.query.categories === "clothing" ||
        router.query.categories === "new-in" ||
        router.pathname.includes("/wardrobe")
      ) {
        return (
          names
            .map(
              (m) =>
                values
                  .filter((f) => f.name.toLowerCase() === m)
                  ?.map((v) => v.id) || []
            )
            .flat() || []
        );
      } else {
        return (
          names.map(
            (m) =>
              values.find(
                (f) =>
                  f.name.toLowerCase() === m &&
                  router.query.categories?.includes(
                    (f as Size).type.toLowerCase()
                  )
              )?.id || ""
          ) || []
        );
      }
    }
    if (
      attributeName === "clothing" &&
      names.length === 1 &&
      names[0] === "clothing"
    ) {
      return (
        values
          .filter((f) => f.sizing_type === "CLOTHING")
          .map((v) => {
            return v.id;
          }) || ""
      );
    }
    return (
      names.map(
        (m) => values.find((f) => f.name.toLowerCase() === m)?.id || ""
      ) || []
    );
  };

  const getNames = (string?: string) => {
    if (!string) return [];
    return string
      .split(",")
      .map((m) => m.toLowerCase())
      .filter((f) => f !== "new-in");
  };

  useEffect(() => {
    const attributeNames = {
      categories: getNames(router.query.categories as string),
      subCategories: getNames(router.query.subCategories as string),
      conditions: getNames(router.query.conditions as string),
      sizes: getNames(router.query.sizes as string),
      colors: getNames(router.query.colors as string),
      locations: getNames(router.query.locations as string),
    };
    setSelected(attributeNames);

    const searchAttributes = {
      categories: getIds(
        categories,
        attributeNames.categories.length === 2
          ? attributeNames.categories.slice(1)
          : attributeNames.categories,
        "clothing"
      ),
      subCategories: getIds(subCategories, attributeNames.subCategories),
      conditions: getIds(conditions, attributeNames.conditions),
      sizes: getIds(sizes, attributeNames.sizes, "sizes"),
      colors: getIds(colors, attributeNames.colors),
      locations: getIds(locations, attributeNames.locations),
    };

    setAttributes(searchAttributes);

    // search from Algolia if search term
    if (router.query.search?.length) {
      getResult({
        search: router.query.search as string,
        categories: router.query.categories as string,
        conditions: router.query.conditions as string,
        sizes: router.query.sizes as string,
        colors: router.query.colors as string,
        locations: router.query.locations as string,
      }).then((result) => {
        if (!(result instanceof Error)) {
          setProducts(result.data);
          setPagination(result.pagination);
        }
      });
    } else {
      // get results from api
      getAllProduct(
        {
          searchAttributes,
          sort: router.query.sort as string,
          page: router.query.page as string,
          slug: router.query.slug as string,
          wardrobes: wardrobes,
        },
        {
          onSuccess: ({ data, meta }) => {
            let products = data.map((m: ProductApiData) => ({
              id: m.id,
              name: m.name,
              size: m.size_name,
              price: m.base_currency_price,
              image: m.medium_image_path,
              wardrobes: m.wardrobes,
              is_sold: m.process_status_name !== PROCESS_STATUS.SELLING,
              brand: m.designer_name,
              condition: m.condition_name,
              material: m.material_name,
              color: m.color_name,
              currency: m.currency_code,
              ganni_love: m.ganni_love,
            }));

            if (router.query.sort) {
              if (router.query.sort === "price")
                products = _.orderBy(products, ["price"], ["asc"]);
              else products = _.orderBy(products, ["price"], ["desc"]);
            }
            setProducts(products);
            setPagination(meta.pagination);
          },
        }
      );
    }
  }, [router.query]);

  return { ...attributes, selected, products, pagination };
};
