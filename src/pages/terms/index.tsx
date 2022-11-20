import HeaderSeo from "@/components/HeaderSeo";
import { TERM_DATA } from "@/utils/constants";
import Image from "next/image";
import { useState } from "react";

export default function Terms() {
  const [itemActive, setItemActive] = useState<number>();

  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Terms"
        description="Extend the life of your wardrobe with GANNIREPEAT: A space to Buy and Sell Pre-loved GANNI Clothes, Shoes and Accessories. Terms and Conditions."
      />

      <div className="w-full text-center py-[48px] md:py-[80px]">
        <p className="text-[28px] tracking-[0px] font-helveticaNeue500 md:text-[48px] leading-[53px] uppercase">
          Terms and conditions
        </p>
      </div>
      <div className="w-full md:px-12 lg:px-48 pb-10 ">
        <div className="w-full border-[#E5E5E5] border-b"></div>
        {TERM_DATA.map((item, index) => {
          return (
            <div
              key={item.title.toString()}
              className={`w-full border-[#E5E5E5] border-b ${
                index !== itemActive ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                setItemActive(index !== itemActive ? index : undefined);
              }}
            >
              <div
                className={`w-full flex justify-around pt-[18px] ${
                  index === itemActive ? "pb-[0]" : "pb-[18px]"
                }`}
              >
                <div className="w-[95%] lg:w-[98%]">
                  <p className="text-[18px] tracking-[0px] leading-[25px] font-helveticaNeue500 uppercase">
                    {index > 0 ? `${index}. ${item.title}` : item.title}
                  </p>
                </div>
                <div className="w-[5%] lg:w-[2%]">
                  {index !== itemActive ? (
                    <Image
                      src="/assets/images/angle-down.svg"
                      alt="Icon up"
                      width={13}
                      height={7}
                    />
                  ) : (
                    <Image
                      src="/assets/images/angle-up.svg"
                      alt="Icon up"
                      width={13}
                      height={7}
                    />
                  )}
                </div>
              </div>
              <div
                className={`w-full ${
                  index === itemActive ? "block" : "hidden"
                } pt-[30px]`}
              >
                {!item.flag &&
                  item.sub_title &&
                  item.sub_title.map((sub) => {
                    return (
                      <p key={sub.toString()} className="pb-[30px]">
                        {sub}
                      </p>
                    );
                  })}

                {!item.flag &&
                  item.values &&
                  item.values.map((sub) => {
                    return (
                      <div key={sub.label.toString()}>
                        <p className="pb-[30px]">{sub.label}</p>
                        {sub.sub_label &&
                          sub.sub_label.map((item, index) => {
                            return (
                              <p
                                key={item.title.toString()}
                                className="pl-[10px] md:pl-[50px] pb-[30px]"
                              >
                                {index + 1}.&nbsp;{item.title}
                              </p>
                            );
                          })}
                      </div>
                    );
                  })}

                {item.flag &&
                  item.flag === 1 &&
                  item.values &&
                  item.values.map((sub, index) => {
                    return (
                      <div key={sub.label.toString()}>
                        <p
                          className={`${
                            sub.flag ? "md:pl-[50px]" : ""
                          } pb-[30px]`}
                        >
                          {sub.flag ? index + 1 + ". " : ""}
                          {sub.label}
                        </p>
                        {sub.flag
                          ? sub.sub_label &&
                            sub.sub_label.map((item, index) => {
                              return (
                                <p
                                  key={item.title.toString()}
                                  className="pl-[50px] md:pl-[100px] pb-[8px]"
                                >
                                  {index + 1}.&nbsp;{item.title}
                                </p>
                              );
                            })
                          : sub.sub_label &&
                            sub.sub_label.map((item) => {
                              return (
                                <div key={item.title.toString()}>
                                  <p>“{item.title}”</p>
                                  <p className="pb-[30px]">
                                    {item.sub_title ? item.sub_title[0] : ""}
                                  </p>
                                </div>
                              );
                            })}
                      </div>
                    );
                  })}

                {item.flag &&
                  item.flag === 2 &&
                  item.sub_title &&
                  item.sub_title.map((sub, index) => {
                    return (
                      <p
                        key={sub.toString()}
                        className={`${
                          item.sub_title && item.sub_title.length > index + 1
                            ? "pl-[0px] md:pl-[50px]"
                            : "pl-[0px] md:pl-[50px]"
                        }  pb-[30px]`}
                      >
                        {index + 1}.&nbsp;{sub}
                      </p>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
