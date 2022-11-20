import React from "react";
import Image from "next/image";
import { reflauntLoader } from "@/utils/imageLoader";
import Price from "@/components/Price";
import { useRouter } from "next/router";
import { getSlug } from "@/utils/file";
interface CardData {
  classes?: string;
  product?: ProductApiData;
  inWishlist?: boolean;
}

const CardComponent = ({ classes, product, inWishlist }: CardData) => {
  const router = useRouter();

  return (
    <div
      className={`w-full mb-[48px] z-40 cursor-pointer relative select-none ${classes}`}
      onClick={() =>
        router.push(
          `/product/${
            getSlug(String(product?.name), Number(product?.id)) || "productId"
          }`
        )
      }
    >
      <div className="w-full">
        <Image
          className="w-full h-auto lg:h-full object-cover"
          loader={reflauntLoader}
          src={
            product?.medium_image_path ||
            product?.media.data[0].original_image ||
            "/assets/images/product.png"
          }
          alt="product image"
          width={290}
          height={348}
          objectFit="cover"
        />
      </div>
      <div className="w-full flex mt-[12px]">
        <div className="ư-full">
          <Image
            className="w-full h-full object-cover"
            src={
              inWishlist
                ? "/assets/icons/heart-pink.svg"
                : "/assets/icons/heart.svg"
            }
            alt="Heart icon"
            width={36}
            height={32}
          />
        </div>
        <div className="w-[118px] lg:w-[207px] pl-[12px]">
          <p className="uppercase text-[14px] leading-[19.6px] tracking-wide">
            {product?.name || "product name"}
          </p>
          {product && (
            <p className="text-[14px]">
              <Price price={product?.base_currency_price} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
