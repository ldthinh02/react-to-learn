import "swiper/swiper-bundle.min.css";

import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import React from "react";

interface SwiperAutoplay {
  slide1: string;
  slide2: string;
  slide3: string;
  text1: string;
  text2: string;
  text3: string;
}

export const SwiperAutoplay = ({
  slide1,
  slide2,
  slide3,
  text1,
  text2,
  text3,
}: SwiperAutoplay) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div
            className="pt-[37px] pl-[12px] md:pt-20 md:pb-5 bg-right-top sm:bg-center-top bg-cover bg-no-repeat flex items-center md:px-5 h-[187px] md:h-[480px]"
            style={{
              backgroundImage: `url(${slide1})`,
            }}
          >
            <div>
              <span className="block font-helveticaNeueLTCom85Heavy text-[56px] md:text-[100px] xl:text-[160px] leading-none xl:leading-[130px] text-pink uppercase">
                {text1}
              </span>
              <span className="block font-helveticaNeueLTCom85Heavy text-[56px] md:text-[100px] xl:text-[160px] leading-none xl:leading-[130px] text-pink uppercase">
                {text2}
              </span>
              <span className="block font-helveticaNeueLTCom85Heavy text-green text-[56px] md:text-[100px] xl:text-[160px] leading-none xl:leading-[130px] uppercase">
                {text3}
              </span>
            </div>
          </div>
        </SwiperSlide>
        {slide2 && (
          <SwiperSlide>
            <div
              className="md:pt-20 md:pb-5 bg-right-top sm:bg-center-top bg-cover bg-no-repeat flex items-center px-5 h-[187px] md:h-[480px]"
              style={{
                backgroundImage: `url(${slide2})`,
              }}
            >
              <div>
                <div className="w-[67px] h-[60px] md:w-full md:h-full mb-[18px]">
                  <Image
                    className="w-full block"
                    src="/assets/images/Buy.svg"
                    width={109}
                    height={100}
                    alt="Homepage Buy Banner"
                  />
                </div>
                <h2>
                  <span className="block leading-none text-[20px] md:text-5xl xl:text-80px text-white uppercase md:mb-8">
                    Creative director{" "}
                  </span>
                  <span className="block leading-none text-[20px] md:text-5xl xl:text-80px text-white uppercase md:mb-8">
                    Ditte’s favourites
                  </span>
                </h2>
                <div className="font-helveticaNeue500 inline-block text-[12px] md:text-sm text-center px-2 py-2 md:px-3 md:py-4 transition-all bg-white text-dark w-180 hover:opacity-80 uppercase">
                  Shop Now
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
        {slide3 && (
          <SwiperSlide>
            <div
              className="md:pt-20 md:pb-5 bg-right-top sm:bg-center-top bg-cover bg-no-repeat flex items-center px-5 h-[187px] lg:h-[480px]"
              style={{
                backgroundImage: `url(${slide3})`,
              }}
            >
              <div>
                <div className="w-[67px] h-[60px] md:w-full md:h-full mb-[18px]">
                  <Image
                    className="block mb-6 max-w-100 xl:max-w-full"
                    src="/assets/images/Sell.svg"
                    alt="Homepage Sell Banner"
                    width={109}
                    height={100}
                  />
                </div>
                <h2>
                  <span className="block leading-none text-[18px] md:text-5xl xl:text-80px text-white uppercase mb-1 md:mb-8">
                    Your pre-loved{" "}
                  </span>
                  <span className="block leading-none text-[18px] md:text-5xl xl:text-80px text-white uppercase mb-1 md:mb-8">
                    ganni items
                  </span>
                </h2>
                <div className="font-helveticaNeue500 inline-block text-sm text-center leading-none pt-[12px] pb-[9px] py-2 md:pt-[16px] md:pb-[13px] md:py-4 transition-all bg-white text-dark min-w-180 hover:opacity-80 uppercase">
                  Start Selling
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default SwiperAutoplay;
