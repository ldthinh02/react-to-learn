import ProductItem from "@/components/ProductItem";
import algoliasearch from "algoliasearch/lite";

const indexes = {
  newest: "products",
  price: "products_price_loew",
  "-price": "products_price_high",
};

type SearchAttributes = {
  search: string;
  sort?: keyof typeof indexes;
  categories?: string;
  designers?: string;
  conditions?: string;
  sizes?: string;
  colors?: string;
  locations?: string;
};

type AlgoliaResult = {
  data: ProductItem[];
  pagination: PaginationType;
};

export const getClient = () =>
  algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_ID || "",
    process.env.NEXT_PUBLIC_ALGOLIA_KEY || "",
    {
      // hosts: [{ url: "yourapplication.example.net" }],
    }
  );

export const getResult = async ({
  search,
  sort = "newest",
  categories,
  designers,
  conditions,
  sizes,
  colors,
  locations,
}: SearchAttributes): Promise<AlgoliaResult> => {
  const client = getClient();

  const attributes = [
    { name: "categories", value: categories as string },
    { name: "designers", value: designers as string },
    { name: "conditions", value: conditions as string },
    { name: "sizes", value: sizes as string },
    { name: "colors", value: colors as string },
    { name: "locations", value: locations as string },
  ]
    .filter((f) => f.value)
    .map((m) => m.value.split(",").map((v) => `${m.name}:${v}`));

  // convert attributes category array if url category param = 'clothing'
  const indexClothingCategoryParam = attributes.findIndex(
    (a) => JSON.stringify(a) === '["categories:clothing"]'
  );
  if (indexClothingCategoryParam > -1) {
    attributes[indexClothingCategoryParam] = [
      "categories:dresses",
      "categories:knitwear",
      "categories:outerwear",
      "categories:pants",
      "categories:skirts",
      "categories:swimwear",
      "categories:tops",
    ];
  }
  const index = client.initIndex(indexes[sort] as string);
  const results = await index
    .search<AlgoliaProduct>(search, {
      facetFilters: attributes,
    })
    .catch((e: Error) => e);

  if (results instanceof Error || results.message) {
    return {
      data: [],
      pagination: {
        total: 0,
        total_pages: 0,
        current_page: 0,
        per_page: 0,
      },
    };
  }

  return {
    data: results.hits
      .filter((f) => f.image)
      .map((m) => ({
        id: m.objectID,
        name: m.name,
        price: m.base_currency_price,
        image: m.image,
      })),
    pagination: {
      total: results.nbHits,
      total_pages: results.nbPages,
      current_page: results.page + 1,
      per_page: results.hitsPerPage,
    },
  };
};
