import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import {
  LIST_CATEGORY_ITEM,
  PROCESS_STATUS,
  WARDROBE_LOVES,
} from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginAndRegisterModal from "@/components/Modals/LoginAndRegisterModal";
import { Parallax } from "react-scroll-parallax";
import ProductItem from "@/components/ProductItem";
import SwiperAutoplay from "@/components/SwiperAutoplay";
import { getContent } from "@/utils/content";
import { getHeader } from "../utils";
import { reflauntLoader } from "@/utils/imageLoader";
import { useAllProducts } from "@/hooks/useAllProducts";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetWardrobes } from "@/hooks/useGetWardrobe";
import { useRouter } from "next/router";
import { onEvent } from "@/utils/gtag";
import HeaderSeo from "@/components/HeaderSeo";

type Images = {
  topSlide1: string;
  topSlide2: string;
  topSlide3: string;
  bannerLeft: string;
  bannerRight: string;
  category1?: string;
  category2?: string;
  category3?: string;
  category4?: string;
};
interface Home {
  messages: {
    homeBannerText1: string;
    homeBannerText2: string;
    homeBannerText3: string;
    sellBanner: string;
    newInBanner: string;
    repeatSectionTitle: string;
    repeatSectionBody: string;
    repeatSectionLink: string;
  };
  images: Images;
}

export default function Home({ messages, images }: Home) {
  const router = useRouter();
  const { mutate: getWardrobes } = useGetWardrobes();
  const [mainWardrobe, setMainWardrobe] = useState<string>();
  const listCategories = useRef(
    LIST_CATEGORY_ITEM.map((m, index) => {
      const key = `category${index + 1}` as keyof Images;
      return {
        ...m,
        url: images[key] || m.url,
      };
    })
  );

  const [secondaryWardrobes, setSecondaryWardrobes] = useState<
    WardrobeDataApi[]
  >([]);
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const { isLoggedIn } = useAuthentication();
  const toggleLoginModal = () => {
    setActiveLoginModal(!activeLoginModal);
  };

  const [productNew, setProductNew] = useState<ProductApiData[]>();
  const { mutate: getListProducts } = useAllProducts();

  useEffect(() => {
    if (!productNew) {
      const searchAttributes = {
        categories: [],
        subCategories: [],
        designers: [],
        conditions: [],
        sizes: [],
        colors: [],
        locations: [],
      };
      getListProducts(
        { searchAttributes, page: "1", per_page: 8 },
        {
          onSuccess: (data) => {
            if (data) setProductNew(data.data);
          },
        }
      );
    }
  }, [productNew]);

  useEffect(() => {
    getWardrobes(undefined, {
      onSuccess: (wardrobesData) => {
        if (wardrobesData && wardrobesData.length > 0) {
          const mainWardrobeData = wardrobesData.find((i) => i.is_main);
          const secondaryWardrobes = wardrobesData.filter(
            (i) => i.is_secondary
          );
          if (
            mainWardrobeData &&
            mainWardrobeData.products.data &&
            mainWardrobeData.products.data.length > 0
          ) {
            mainWardrobeData.products.data =
              sortProductByDateAdd(mainWardrobeData);
            setMainWardrobe(JSON.stringify(mainWardrobeData));
          }
          if (secondaryWardrobes && secondaryWardrobes.length > 0) {
            const result = secondaryWardrobes.map((item) => {
              return {
                ...item,
                products: {
                  data: sortProductByDateAdd(item),
                },
              };
            });
            setSecondaryWardrobes(result);
          }
        }
      },
    });
  }, []);

  const sortProductByDateAdd = (data: WardrobeDataApi) => {
    const products = data.products.data;
    const isNullDate = products
      .filter((item) => !item.official_wardrobe_updated_at)
      .sort((a, b) => {
        return b.id - a.id;
      });
    const isDate = products
      .filter((item) => item.official_wardrobe_updated_at)
      .sort((a, b) => {
        const data_first = new Date(a.official_wardrobe_updated_at);
        const data_second = new Date(b.official_wardrobe_updated_at);
        return Number(data_second) - Number(data_first);
      });
    return isDate.concat(isNullDate);
  };

  const onClickSell = () => {
    if (isLoggedIn) {
      router.push("/sell/step-1");
      onEvent("initiate_product_listing", {});
    } else {
      toggleLoginModal();
    }
  };

  return (
    <div>
      <HeaderSeo
        title="GANNI REPEAT: Buy and Sell the Best of GANNI Pre-loved Fashion"
        description="Extend the life of your wardrobe with GANNIREPEAT: A space to Buy and Sell Pre-loved GANNI Clothes, Shoes and Accessories."
      />

      {/* Main */}
      {/*  Top slider */}
      <div className="top-slider-section">
        <SwiperAutoplay
          slide1={images.topSlide1}
          slide2={images.topSlide2}
          slide3={images.topSlide3}
          text1={messages.homeBannerText1}
          text2={messages.homeBannerText2}
          text3={messages.homeBannerText3}
        />
      </div>
      {/*  ./Top slider */}

      {/* Buy & Sell Banner*/}
      <div className="grid grid-cols-2 grid-rows-1 gap-2 md:gap-4 py-[10px] md:p-4">
        <div
          className="bg-no-repeat bg-cover bg-center text-center p-4 sm:p-8 w-full h-[100px] md:h-[180px] cursor-pointer flex justify-center item-center"
          style={{
            backgroundImage: `url(${images.bannerLeft})`,
          }}
          onClick={() => router.push("/section/new-in")}
        >
          <div className="w-[64px] h-[60px] md:w-full md:h-full">
            <Image
              className="w-full h-full inline-block"
              src="/assets/images/Buy_white.svg"
              width={109}
              height={100}
              alt=""
              objectFit="cover"
            />
          </div>
        </div>
        <div
          className="bg-no-repeat bg-cover bg-center text-center p-4 sm:p-8  w-full h-[100px] md:h-[180px] cursor-pointer flex justify-center item-center"
          style={{
            backgroundImage: `url(${images.bannerRight})`,
          }}
          onClick={onClickSell}
        >
          <div className="w-[64px] h-[60px] md:w-full md:h-full">
            <Image
              className="w-full h-full inline-block"
              src="/assets/images/Sell_white.svg"
              width={109}
              height={100}
              alt=""
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      {/* ./Buy & Sell Banner*/}

      {/*  Section */}
      {mainWardrobe &&
        JSON.parse(mainWardrobe).products &&
        JSON.parse(mainWardrobe).products.data &&
        JSON.parse(mainWardrobe).products.data.length > 0 && (
          <>
            <section className="py-16">
              <div className="container m-auto lg:px-4 xl2:max-w-screen-xl2">
                <div className="overflow-title overflow-hidden mb-6 px-2 xl:px-4">
                  <p className="font-helveticaNeue500 text-dark text-2xl sm:text-3xl xl:text-4xl uppercase">
                    {JSON.parse(mainWardrobe).name}
                  </p>
                </div>
                {/* Products*/}
                <div className="grid grid-cols-2 lg:grid-cols-4 justify-center">
                  {JSON.parse(mainWardrobe).products.data.length &&
                    (JSON.parse(mainWardrobe) as WardrobeDataApi).products.data
                      .splice(0, 8)
                      .map((product) => (
                        <>
                          <ProductItem
                            classes="w-full"
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.selling_price}
                            image={product.media.data[0].original_image}
                            ganniWardrobe={
                              !!product.wardrobes?.data.find(
                                (w) => w.name.toLowerCase() === WARDROBE_LOVES
                              )
                            }
                            is_sold={
                              product.process_status?.data?.name !==
                              PROCESS_STATUS.SELLING
                            }
                          />
                        </>
                      ))}
                </div>
                {/* ./Products*/}
                {/* Button*/}
                {JSON.parse(mainWardrobe).products.data.length > 8 && (
                  <div className="flex justify-center">
                    <Link
                      href={`/wardrobe/${JSON.parse(mainWardrobe).slug_name}`}
                    >
                      <a className="font-helveticaNeue500 inline-block text-center leading-none pt-[16px] pb-[13px] py-4 transition-all bg-white text-dark hover:opacity-80 border border-dark text-xs min-w-100 uppercase">
                        Shop All
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      {secondaryWardrobes.map((wardrobe) => (
        <div key={wardrobe.id}>
          {wardrobe &&
            wardrobe.products &&
            wardrobe.products.data &&
            wardrobe.products.data.length > 0 && (
              <section className="py-16 bg-lightGrey">
                <Parallax translateX={[0, -50]}>
                  <div className="overflow-title mb-6">
                    <div className="container m-auto px-4 leading-tight">
                      <p className="font-helveticaNeueLTCom85Heavy text-green text-3xl xl:text-6xl xl:leading-tight whitespace-nowrap uppercase inline-block relative">
                        {wardrobe.name} / {wardrobe.name} / {wardrobe.name} /{" "}
                        {wardrobe.name} / {wardrobe.name} / {wardrobe.name}
                      </p>
                    </div>
                  </div>
                </Parallax>

                <div className="container m-auto lg:px-4 xl2:max-w-screen-xl2">
                  <div className="swiper productSliderMobile">
                    <div className="grid grid-cols-2 lg:grid-cols-4 justify-center">
                      {/* Products*/}
                      {wardrobe.products.data.length &&
                        wardrobe.products.data.map((product, index) => {
                          if (index > 3) return "";
                          return (
                            <>
                              <ProductItem
                                classes="w-full"
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.selling_price}
                                image={product.media.data[0].original_image}
                                ganniWardrobe={true}
                                is_sold={
                                  product.process_status?.data?.name !==
                                  PROCESS_STATUS.SELLING
                                }
                              />
                            </>
                          );
                        })}
                    </div>
                    {/* ./Products*/}
                  </div>
                  {/* Button*/}
                  {wardrobe.products.data.length > 4 ? (
                    <div className="flex justify-center">
                      <Link href={`/wardrobe/${wardrobe.slug_name}`}>
                        <a className="font-helveticaNeue500 inline-block text-center leading-none pt-[16px] pb-[13px] transition-all bg-white text-dark hover:opacity-80 border border-dark text-xs py-4 min-w-100 uppercase">
                          SHOP ALL
                        </a>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </section>
            )}
        </div>
      ))}
      {/*  ./Section */}

      {/* Sell banner*/}
      <div className="sell-banner bg-green py-6 md:py-16">
        <div className="container m-auto px-4 xl2:max-w-screen-xl2">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-52 mb-8 md:mb-0">
              <Image
                className="w-full h-full inline-block"
                src="/assets/images/Sell_white.svg"
                alt=""
                width="100%"
                height="100%"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-white font-helveticaNeue500 text-3xl md:text-4xl uppercase mb-4">
                {messages.sellBanner}
              </h1>
              <a
                className="font-helveticaNeue500 inline-block text-center leading-none pt-[16px] pb-[13px] py-4 transition-all bg-white min-w-[120px] hover:opacity-80 uppercase text-xs text-green cursor-pointer"
                onClick={onClickSell}
              >
                Start Selling
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ./Sell banner*/}

      {/*  Repeaters */}
      {/* TODO: Launch at a later date */}
      {/* <section className="py-16 bg-pink">
        <div className="overflow-title overflow-hidden mb-8">
          <p className="font-helveticaNeueLTCom85Heavy pb-3 text-3xl xl:text-6xl text-white whitespace-nowrap uppercase">
            Ganni repeaters / Ganni repeaters / Ganni repeaters / Ganni
            repeaters / Ganni repeaters / Ganni repeaters / Ganni repeaters /
            Ganni repeaters / Ganni repeaters / Ganni repeaters / Ganni
            repeaters / Ganni repeaters /
          </p>
        </div>
        <div className="container m-auto xl2:max-w-screen-xl2">
          <Swiper
            freeMode={true}
            spaceBetween={20}
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
            {LIST_SIDEBAR.map((item) => {
              return (
                <div key={item.title.toString()}>
                  <SwiperSlide className="!w-[280px] md:!w-[310px] !mr-[10px]">
                    <div className="shrink-0 h-full">
                      <div className="slide-content px-[18px]">
                        <a href="#" className="block">
                          <span className="block mb-4 w-[250px] h-[333px] md:w-[300px] md:h-[400px] relative">
                            <Image
                              className="object-contain"
                              src={item.url}
                              alt=""
                              layout="fill"
                              objectFit="cover"
                            />
                          </span>
                          <span className="font-helveticaNeue500 uppercase block text-2xl text-white">
                            {item.title}
                          </span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
          </Swiper>
        </div>
      </section> */}
      {/*  ./Repeaters */}
      {/*  Section */}
      <section className="py-16">
        <Parallax translateX={[0, -50]}>
          <div className="mb-6">
            <p className="font-helveticaNeueLTCom85Heavy overflow-hidden text-pink text-3xl xl:text-6xl xl:leading-tight whitespace-nowrap uppercase inline-block">
              {getHeader(15, messages.newInBanner)}
            </p>
          </div>
        </Parallax>

        <div className="container m-auto xl2:max-w-screen-xl2">
          {/* Products*/}
          <div className="flex flex-wrap w-full">
            {productNew &&
              productNew.length > 0 &&
              productNew.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.base_currency_price}
                  image={product.medium_image_path}
                  size={product.size?.data.name}
                  ganniWardrobe={product.ganni_love}
                  is_sold={
                    product.process_status_name !== PROCESS_STATUS.SELLING
                  }
                />
              ))}
          </div>
          {/* ./Products*/}
          {/* Button*/}
          <div className="flex justify-center">
            <Link href="/section/new-in">
              <a className="font-helveticaNeue500  inline-block text-center leading-none pt-[16px] pb-[13px] transition-all bg-white text-dark hover:opacity-80 border border-dark text-xs py-4 min-w-100 uppercase">
                SHOP ALL
              </a>
            </Link>
          </div>
        </div>
      </section>
      {/*  ./Section */}

      {/*  Find out more */}
      <div className="find-out-more p-0 md:p-6">
        <div className="border-2 border-green py-16">
          <div className="container m-auto px-4 xl2:max-w-screen-xl2">
            <p className="font-helveticaNeue500 text-green uppercase text-2xl mb-2">
              {messages.repeatSectionTitle}
            </p>
            <h2 className="font-helveticaNeue500 text-green uppercase text-3xl xl:text-5xl">
              {messages.repeatSectionBody} <br />
              <Link href="/about">
                <a>
                  <u className="font-helveticaNeue500 text-green uppercase text-3xl xl:text-5xl">
                    {messages.repeatSectionLink}
                  </u>
                </a>
              </Link>
            </h2>
          </div>
        </div>
      </div>
      {/*  ./Find out more */}

      {/*  Category */}
      <section className="py-16">
        <div className="container m-auto xl2:max-w-screen-xl2">
          <h2 className="font-helveticaNeue500 text-dark text-4xl uppercase mb-8">
            Shop by category
          </h2>
          <Swiper
            freeMode={false}
            slidesPerView={5}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            autoplay={true}
            breakpoints={{
              0: {
                width: 0,
                slidesPerView: 1,
              },
              360: {
                width: 220,
                slidesPerView: 1,
              },
              768: {
                width: 338,
                slidesPerView: 1,
              },
              1024: {
                width: 338,
                slidesPerView: 5,
              },
            }}
          >
            <div
              className="swiper-wrapper"
              style={{ transition: "translate3d(0, 0,0)" }}
            >
              {listCategories.current.map((item) => (
                <SwiperSlide
                  className="!w-[240px]"
                  style={{ width: "0px !important" }}
                  key={item.title.toString()}
                >
                  <span
                    className="block mb-4 w-[240px] h-[320px] relative cursor-pointer"
                    onClick={() => item.href && router.push(item.href)}
                  >
                    <Image
                      loader={reflauntLoader}
                      className="object-contain"
                      src={item.url}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </span>
                  <span className="font-helveticaNeue500 uppercase text-center block text-2xl text-black">
                    {item.title}
                  </span>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </section>
      {/*  ./Category */}
      {/* ./Main*/}
      <LoginAndRegisterModal
        active={activeLoginModal}
        toggleLoginModal={toggleLoginModal}
      />
    </div>
  );
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview: boolean;
}) => {
  const { messages, images } = await getContent("/", preview);

  // temporary until CMS admin built
  return {
    props: {
      messages: Object.keys(messages).length
        ? messages
        : {
            homeBannerText1: "buy",
            homeBannerText2: "sell",
            homeBannerText3: "repeat",
            newInBanner: "new",
            sellBanner: "GIVE YOUR PRE-LOVED ITEMS A NEW LEASE OF LIFE",
          },
      images:
        Object.keys(images).length > 0
          ? images
          : {
              topSlide1: "/assets/images/top-slide-1.jpg",
              topSlide2: "/assets/images/top-slide-2.jpg",
              topSlide3: "/assets/images/top-slide-3.jpg",
              bannerLeft: "/assets/images/BUY_BG.jpg",
              bannerRight: "/assets/images/SELL_BG.jpg",
            },
    },
  };
};
