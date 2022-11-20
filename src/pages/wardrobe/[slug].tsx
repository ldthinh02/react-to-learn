import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import { useGetAttributes } from "@/hooks/useGetAttributes";
import { api } from "@/utils/api";
import FilterComponent from "@/components/FilterComponent";
import HeaderSeo from "@/components/HeaderSeo";

interface WardrobeType {
  categories: Attribute[];
  subCategories: Attribute[];
  conditions: Attribute[];
  sizes: Attribute[];
  locations: Attribute[];
  colors: Attribute[];
  wardrobes: WardrobeDataApi[];
}

const Wardrobe = (props: WardrobeType) => {
  const router = useRouter();
  const { slug } = router.query;
  const [wardrobeData, setWardrobeData] = useState<WardrobeDataApi>();
  const { products, pagination } = useGetAttributes(props);

  useEffect(() => {
    if (slug && props.wardrobes.length > 0) {
      const findWardrobe = props.wardrobes.find((w) => w.slug_name === slug);
      if (findWardrobe) {
        setWardrobeData(findWardrobe);
      }
    }
  }, [slug]);

  return (
    <div>
      <HeaderSeo
        title={`Shop ${
          wardrobeData ? wardrobeData.name : ""
        } Pre-loved GANNI on GANNIREPEAT`}
        description={`Extend the life of your wardrobe with GANNIREPEAT: A space to Buy and Sell the latest Pre-loved ${
          wardrobeData ? wardrobeData.name : ""
        } GANNI `}
      />

      <FilterComponent props={props} wardrobeData={wardrobeData}>
        <div className="flex flex-wrap w-full">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              size={product.size}
              is_sold={product.is_sold}
              ganniWardrobe={product.ganni_love}
            />
          ))}
        </div>
        {pagination && (
          <div className="pagination w-full flex justify-end mt-10">
            <Pagination pageNumber={pagination.total_pages} />
          </div>
        )}
      </FilterComponent>
    </div>
  );
};

export const getStaticProps = async () => {
  const categoryData = await api<Attribute[]>("categories/all");
  const conditions = await api<Attribute[]>("conditions");
  const sizes = await api<Attribute[]>("sizes");
  const locationsData = await api<{ id: number; country_name: string }[]>(
    "provider"
  );
  const colors = await api<Attribute[]>("colors");
  const locations: Attribute[] = locationsData
    .map((location) => ({
      id: location.id,
      name: location.country_name,
    }))
    .filter((l) => l.name);
  const wardrobes = await api<WardrobeDataApi[]>("wardrobes");
  const categories = categoryData.filter((item) => Number(item.parent_id) < 1);
  const subCategories = categoryData.filter(
    (item) => Number(item.parent_id) > 0
  );
  return {
    props: {
      categories,
      subCategories,
      conditions,
      sizes,
      locations,
      colors,
      wardrobes,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await api<WardrobeDataApi[]>("wardrobes");
  if (res && res.length > 0) {
    return {
      paths: res.map((r) => {
        return { params: { slug: r.slug_name || "slug" } };
      }),
      fallback: false,
    };
  } else {
    return {
      paths: [{ params: { slug: "ditte-favourites" } }],
      fallback: false,
    };
  }
};
export default Wardrobe;
