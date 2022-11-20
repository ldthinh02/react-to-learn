import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import { getStaticAllAttributes } from "@/utils/index";
import { useGetAttributes } from "@/hooks/useGetAttributes";
import { onEvent } from "@/utils/gtag";
import FilterComponent from "@/components/FilterComponent";
import HeaderSeo from "@/components/HeaderSeo";

const Buy = (props: Attributes) => {
  const router = useRouter();
  const { category } = router.query;
  const { products, pagination } = useGetAttributes(props);

  useEffect(() => {
    if (products && products.length > 0) {
      const convertToGAParams = products.map((prod) => {
        return {
          product_id: prod.id,
          product_name: prod.name,
          product_brand: prod.brand,
          product_price: prod.price,
          product_condition: prod.condition,
          product_size: prod.size,
          product_color: prod.color,
          product_quantity: 1,
          list_position: 1,
        };
      });
      onEvent("view_item_list", {
        view_item_list: {
          items: convertToGAParams,
        },
      });
    }
  }, [products]);

  const getMetaTitle = () => {
    const { categories } = router.query;
    const value = categories as string;
    const listValue = value ? value.split(",") : [];
    let cate = "";
    let subDes = "";
    if (category !== "new-in") {
      if (listValue[1]) {
        subDes = listValue[1];
        if (listValue[1] === "other")
          cate = listValue[1] + " " + ucFirst(listValue[0]);
        else cate = listValue[1];
      } else {
        cate = listValue[0];
        subDes = listValue[0];
      }
    }
    return {
      title: `Shop ${category === "new-in" ? "New in" : ""} Pre-loved GANNI ${
        category === "new-in" ? ucFirst(cate) : cate
      } on GANNIREPEAT`,
      description: `Extend the life of your wardrobe with GANNIREPEAT: A space to Buy and Sell Pre-loved GANNI ${ucFirst(
        subDes
      )} uploaded by our Community.`,
    };
  };

  const ucFirst = (value?: string) => {
    return value ? `${value.charAt(0).toUpperCase() + value.slice(1)}` : "";
  };

  return (
    <div>
      <HeaderSeo
        title={getMetaTitle().title}
        description={getMetaTitle().description}
      />

      <FilterComponent props={props}>
        <div className="flex flex-wrap w-full">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              size={product.size}
              ganniWardrobe={product.ganni_love}
              is_sold={product.is_sold}
              category={product.category}
              brand={product.brand}
              condition={product.condition}
              material={product.material}
              color={product.color}
              currency={product.currency}
              fromCategoryPage={true}
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

export const getStaticProps = getStaticAllAttributes;
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { category: "all" } },
      { params: { category: "new-in" } },
      { params: { category: "clothing" } },
      { params: { category: "shoes" } },
      { params: { category: "accessories" } },
    ],
    fallback: false,
  };
};
export default Buy;
