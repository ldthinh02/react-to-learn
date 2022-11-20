import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import ProductItem from "@/components/ProductItem";
import { PROCESS_STATUS } from "@/utils/constants";
interface SwiperCarousel {
  products: ProductApiData[];
}

export const SwiperCarousel = ({ products }: SwiperCarousel) => (
  <>
    <Swiper
      freeMode={true}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        },
      }}
    >
      {products.length > 0 &&
        products.map((product, index) => {
          return (
            // TODO: change here details of product
            <SwiperSlide key={index}>
              <ProductItem
                classes="w-full"
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.base_currency_price}
                image={product.medium_image_path}
                size={product.size?.data.name}
                ganniWardrobe={product.ganni_love}
                is_sold={product.process_status_name !== PROCESS_STATUS.SELLING}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  </>
);

export default SwiperCarousel;
