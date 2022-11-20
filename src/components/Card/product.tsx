import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { reflauntLoader } from "@/utils/imageLoader";
import Price from "@/components/Price";
import { getSlug } from "@/utils/file";

const CardProduct = (product: GetProductBySellerApiData) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/product/${getSlug(product.name, product.id)}`);
      }}
      className={`w-full h-[250px] md:h-[310px] mb-[48px] z-40 cursor-pointer relative select-none love`}
    >
      <div className="w-full h-[192px] md:h-[268px]">
        <Image
          className="w-full h-auto lg:h-full object-cover"
          loader={reflauntLoader}
          src={
            product.media.data[0].original_image || "/assets/images/product.png"
          }
          alt="No images"
          width={240}
          height={268}
        />
      </div>
      <div className="w-full flex mt-[5px]">
        <div className="w-[24px] h-[22px] lg:w-[32px] lg:h-[30px]">
          <Image
            className="w-full h-auto object-cover"
            src="/assets/icons/heart.png"
            alt="Heart icon"
            width={32}
            height={30}
          />
        </div>
        <div className="lg:w-[207px] pl-[12px]">
          <p className="uppercase text-[14px]">{product.name}</p>
          <p className="text-[14px]">
            <Price price={product.base_currency_price} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
