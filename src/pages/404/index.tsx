import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import HeaderSeo from "@/components/HeaderSeo";

const NotFoundPage = () => {
  const router = useRouter();
  const {
    query: { page },
  } = router;
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - 404 page"
        description="GanniRepeat - 404 page"
      />

      <div className="py-[84px]">
        <div className="text-center text-4xl text-[#E25B8B] uppercase pb-[50px]">
          <p>Oops!</p>
          {page ? (
            <p>Oops! This item has already found a new home</p>
          ) : (
            <p>The page you are looking for no longer exists</p>
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            className="w-[327px] md:w-[480px] h-[65px] flex justify-center items-center border text-2xl uppercase cursor-pointer transition-all hover:border-[#E25B8B] hover:bg-[#E25B8B] hover:text-white"
            onClick={() => router.push("/section/new-in")}
          >
            <Image
              src="/assets/icons/buy.svg"
              alt="icon buy"
              width={24}
              height={14}
            />
            <span className="ml-[8px]">Shop new in</span>
          </div>
          <div
            className="w-[327px] md:w-[480px] h-[65px] flex justify-center items-center border mt-[15px] text-2xl uppercase cursor-pointer transition-all hover:border-[#E25B8B] hover:bg-[#E25B8B] hover:text-white"
            onClick={() => router.push("/sell/step-1")}
          >
            <Image
              src="/assets/icons/sell.svg"
              alt="icon sell"
              width={24}
              height={14}
            />
            <span className="ml-[8px]">Sell an item</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
