import SellComponent from "@/components/Sell";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useCreateProduct";
import { useAddProduct, useRecordPrice } from "@/hooks/useProductHooks";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import Authenticate from "@/components/Authenticate";
import { onEvent } from "@/utils/gtag";
import { reflauntLoader } from "@/utils/imageLoader";

export default function SellStepConfirmation() {
  const { product, setProduct } = useAddProduct();
  const { isLoggedIn } = useAuthentication();
  const router = useRouter();
  const { data: profileApiData } = useGetMyProfile();
  const { browserCurrency } = useBrowserCurrency();
  const [price, setPrice] = useState<string>();

  const { mutate: recordPrice } = useRecordPrice();

  const {
    createProduct: {
      mutate: createProduct,
      isLoading: loadingCreate,
      isSuccess: successCreate,
      data: createProductResponse,
    },
  } = useCreateProduct();

  const {
    updateProduct: {
      mutate: updateProduct,
      isLoading: loadingUpdate,
      isSuccess: successUpdate,
    },
  } = useUpdateProduct();

  const { record_price } = useAddProduct();

  useEffect(() => {
    if (!product) router.push("/sell/step-1");
  }, [product]);

  useEffect(() => {
    if (successCreate || successUpdate) {
      if (successCreate) {
        // onEvent("complete_product_listing", { complete_product_listing: null });
        onEvent("complete_product_listing", { complete_product_listing: {} });
        if (createProductResponse) {
          let customer_name;
          if (profileApiData) {
            if (
              profileApiData.customer.data.first_name &&
              profileApiData.customer.data.last_name
            ) {
              customer_name = `${profileApiData.customer.data.first_name} ${profileApiData.customer.data.last_name}`;
            } else if (profileApiData.customer.data.first_name) {
              customer_name = profileApiData.customer.data.first_name;
            } else {
              customer_name = "";
            }
          }
          recordPrice({
            Item: {
              ...record_price,
              product_id: {
                S: createProductResponse.id.toString(),
              },
              product_name: {
                S: createProductResponse.name,
              },
              price_chosen_by_user: {
                S: createProductResponse.price.toString(),
              },
              user_email: {
                S:
                  profileApiData && profileApiData.email
                    ? profileApiData.email
                    : "",
              },
              user_name: {
                S: customer_name ? customer_name : "",
              },
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "thomas_pricing_stat_record",
          });
        }
      }
      router.push("/sell/summary");
      setTimeout(() => {
        setProduct({} as ProductData);
      }, 2000);
    }
  }, [successCreate, successUpdate]);

  useEffect(() => {
    if (browserCurrency) {
      const result = browserCurrency.currencies?.find(
        (item) => item.code === (product.currency as Option).name
      );
      if (result) {
        setPrice(
          result.symbol === "£"
            ? `${result.symbol} ${product.price}`
            : `${product.price} ${result.symbol}`
        );
      }
    }
  }, [browserCurrency]);

  const handleClickNext = () => {
    if (product) {
      const thumbList = (product.images &&
        product.images
          .filter((item: ImageItem) => item.url)
          .map((item: ImageItem) => item.url)) as string[];

      const tagStyes = product.styles && product.styles.map((item) => item.id);
      const tagWears =
        product.tag_signs && product.tag_signs.map((item) => item.id);
      const newProduct: ProductDataApi = {
        name: product.name,
        price: Number(product.price),
        size_id: product.size.id as number,
        color_id: [product.color_id.id as number],
        condition_id: product.condition?.id as number,
        material_id: product.material.id as number,
        currency_id: product.currency?.id as number,
        additional_material: product.composition,
        category_id: product.category.id as number,
        categories: [
          product.category.id as number,
          product.sub_category.id as number,
        ],
        images: thumbList,
        image_labels: (product.images &&
          product.images.map((item: ImageItem) => item.label)) as string[],
        seller_id: profileApiData?.id as number,
        location_code: product.location_code || "DK",
        main_image: thumbList[0],
        selected: true,
        is_international_free: true,
        material: product.material.name,
        description: product.description,
        original_price_currency_id: Number(product.original_price_currency_id),
        original_price: product.original_price || "0",
        style_id: tagStyes?.concat(tagWears) as number[],
        price_in_euro: product.original_price_eur,
        shipping_type: product.shipping,
      };

      const updateProd: ProductDataApi = {
        ...newProduct,
        id: product.id,
        media: {
          data: (product.images &&
            product.images
              .filter((item: ImageItem) => item.url)
              .map((item: ImageItem) => ({
                original_image_path: item.url,
              }))) as MediaApi[],
        },
      };
      if (product.id) {
        updateProduct(updateProd);
      } else {
        createProduct(newProduct);
      }
    }
  };

  if (!isLoggedIn) return <Authenticate />;

  return (
    <SellComponent>
      <h2 className="text-3xl uppercase text-center mb-4">List your item</h2>
      <p className="pt-10">
        Please review the details of your listing before submitting
      </p>
      <div className="my-8">
        <hr className="border-t-grey my-8" />
      </div>

      <h3 className="uppercase text-2xl mb-4 font-helveticaNeue500">
        {product.name}
      </h3>
      <p className="mb-4">{price}</p>
      <p className="mb-4">{product.description}</p>
      <ul className="mb-4">
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Category</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium bold uppercase font-helveticaNeue500">
              {(product.category as Option).name}
            </span>
          </div>
        </li>
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Sub-category</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium uppercase font-helveticaNeue500">
              {(product.sub_category as Option).name}
            </span>
          </div>
        </li>
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Size</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium uppercase font-helveticaNeue500">
              {(product.size as Option).name}
            </span>
          </div>
        </li>
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Colour</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium uppercase font-helveticaNeue500">
              {(product.color_id as Option).name}
            </span>
          </div>
        </li>
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Style</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium uppercase font-helveticaNeue500">
              {product.styles &&
                product.styles.map((item) => item.name).join(", ")}
            </span>
          </div>
        </li>
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Condition</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium uppercase font-helveticaNeue500">
              {(product.condition as Option).name}
            </span>
          </div>
        </li>
        <li className="flex mb-1">
          <div className="w-[146px]">
            <span>Material</span>
          </div>
          <div className="flex-1 pl-4">
            <span className="font-medium uppercase font-helveticaNeue500">
              {(product.material as Option).name}
            </span>
          </div>
        </li>
      </ul>
      <p>
        {product.shipping && product.shipping === "free"
          ? "You have chosen to cover the cost of the shipping fee."
          : "You have chosen for the buyer to cover the shipping cost."}
      </p>

      <div className="my-12">
        <hr className="my-7 border-t-dark" />
      </div>

      <p className="mb-6">Photos of your item</p>

      <div className="z-0 grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-2 gap-4 mb-6 -mx-2 lg:-mx-3 mt-8">
        {product.images &&
          (product.images as ImageItem[])
            .filter((c: ImageItem) => c.url)
            .map((item: ImageItem) => {
              return (
                <div
                  key={item.label.toString()}
                  className="w-full mb-4 lg:mb-8 cursor-pointer"
                >
                  <Image
                    className="w-full h-full object-cover bg-center"
                    src={
                      item.url ? item.url : "/assets/images/default-image.png"
                    }
                    background-position="center"
                    width={250}
                    height={300}
                    layout="responsive"
                    alt="Product image"
                    objectFit="cover"
                    loader={reflauntLoader}
                  />
                </div>
              );
            })}
      </div>
      <div className="w-full">
        <p className="text-center">
          {(loadingCreate || loadingUpdate) && "Processing..."}
        </p>
      </div>
      <div className="flex flex-wrap -mx-2">
        <div className="w-2/4 px-2">
          <div className="mb-6">
            <button
              className="text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4"
              onClick={() => router.push("/sell/step-4")}
            >
              Back
            </button>
          </div>
        </div>
        <div className="w-2/4 px-2">
          <div className="mb-6">
            <button
              className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
              onClick={handleClickNext}
            >
              Submit listing
            </button>
          </div>
        </div>
      </div>
    </SellComponent>
  );
}
