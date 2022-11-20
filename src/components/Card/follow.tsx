import React from "react";
import Image from "next/image";
import Rating from "@/components/Rating";
import { reflauntLoader } from "@/utils/imageLoader";

interface CardFollowData {
  name: string;
  tag: string;
  rate?: number;
  totalRate?: number;
  image: string;
}

const CardFollow = ({ name, tag, rate, totalRate, image }: CardFollowData) => {
  return (
    <div className="w-full h-[250px] md:w-[208px] md:h-[264px] mb-[100px] z-40 cursor-pointer relative select-none">
      <div className="w-full h-[192px] md:h-[220px]">
        <Image
          className="w-full h-auto lg:h-full object-cover"
          src={image}
          alt="follower image"
          width={208}
          height={210}
          loader={reflauntLoader}
        />
      </div>
      <div className="w-full">
        <h3 className="font-helveticaNeue500 text-dark bold uppercase text-lg mb-0">
          {name}
        </h3>
        <p className="font-helveticaNeue500 text-dark uppercase text-sm mb-4">
          @{tag}
        </p>
        {rate && totalRate ? <Rating rate={rate} values={totalRate} /> : null}
      </div>
    </div>
  );
};

export default CardFollow;
