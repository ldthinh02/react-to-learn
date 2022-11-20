import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRateOrderByOrderIDAndSellerID } from "@/hooks/useRatings";

interface RatingData {
  rate: number;
  values?: number;
  size?: number;
  isHiddenTotal?: boolean;
  data?: {
    order_id: string;
    seller_id: string;
  };
  onChange?: () => void;
}

const Rating = ({
  rate,
  values,
  size,
  isHiddenTotal,
  data,
  onChange,
}: RatingData) => {
  const sizes = size || 12;
  const [active, setActive] = useState<number>(0);
  const [middleActive, setMiddleActive] = useState<boolean>(false);

  const { mutate: rateOrderbyOrderIDAndSellerID, isLoading: ratingLoading } =
    useRateOrderByOrderIDAndSellerID();

  const getListItems = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(`rating-${i + 1}`);
    }
    return items;
  };

  const getRating = () => {
    const integerPart = parseInt(rate.toString());
    const decimalsPart = rate - integerPart;
    if (integerPart > 0) setActive(integerPart);
    if (decimalsPart > 0) setMiddleActive(true);
  };

  useEffect(() => {
    getRating();
  }, [rate]);

  const rateFn = (item: number) => {
    if (data) {
      const { order_id, seller_id } = data;
      rateOrderbyOrderIDAndSellerID(
        { order_id, seller_id, rate: item },
        { onSuccess: () => onChange?.() }
      );
    }
  };

  return (
    <div className="flex">
      {getListItems().map((item, index) => {
        return (
          <button
            key={item.toString()}
            className="mr-[4px]"
            onClick={() => rateFn(index + 1)}
            disabled={ratingLoading}
            onMouseMove={() => data && setActive(index + 1)}
          >
            {index < active ? (
              <Image
                className="cursor-pointer"
                src="/assets/icons/rating-1.svg"
                alt="icon rating"
                width={sizes}
                height={sizes}
              />
            ) : middleActive && index === active ? (
              <Image
                className="cursor-pointer"
                src="/assets/icons/rating-2.svg"
                alt="icon rating"
                width={sizes}
                height={sizes}
              />
            ) : (
              <Image
                className="cursor-pointer"
                src="/assets/icons/rating-3.svg"
                alt="icon rating"
                width={sizes}
                height={sizes}
              />
            )}
          </button>
        );
      })}
      {!isHiddenTotal && (
        <span
          className={`text-pink ${values ? "block" : "hidden"} ${
            sizes > 12 ? "text-[14px] pt-[1px]" : "text-[12px] -mt-[2px]"
          }`}
        >
          ({values})
        </span>
      )}
    </div>
  );
};

export default Rating;
