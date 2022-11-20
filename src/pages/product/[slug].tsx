import Image from "next/image";
import SwiperCarousel from "@/components/SwiperCarousel";
import { useEffect, useMemo, useRef, useState } from "react";
import SizeModal from "@/components/Modals/SizeModal";
import ConditionModal from "@/components/Modals/ConditionModal";
import Link from "next/link";
import { MakeAnOfferModal } from "@/components/Modals/MakeAnOfferModal";
import { useGetProductById } from "@/hooks/useGetProductById";
import { useRouter } from "next/router";
import LoginAndRegisterModal from "@/components/Modals/LoginAndRegisterModal";
import { useAuthentication, useHasToken } from "@/hooks/useAuthentication";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { DATA_MENU, GANNI_SELLER_EMAIL } from "@/utils/constants";
import {
  useAddToWishlist,
  useCountLikes,
  useGetMyWishlist,
  useRemoveFromWishlist,
} from "@/hooks/useWishlist";
import { useAddToCart, useCart } from "@/hooks/useCart";
import {
  useGetCheckoutCart,
  useGetGuestToken,
  useSetDefaultCheckoutShipment,
} from "@/hooks/useCheckout";
import { Button } from "@/components/Button";
import cookies from "js-cookie";
import { useGetProductsByCategory } from "@/hooks/useGetProductsByCategory";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reflauntLoader } from "@/utils/imageLoader";
import Price from "@/components/Price";
import {
  useAddOfficialWardrobe,
  useRemoveOfficialWardrobe,
} from "@/hooks/useWardrobeHooks";
import { AddToBagModal } from "@/components/Modals/AddToBagModal";
import Rating from "@/components/Rating";
import { useGetMyOffers } from "@/hooks/useOffer";
import { onEvent } from "@/utils/gtag";
import { useChatBox } from "@/hooks/useChatBox";
import HeaderSeo from "@/components/HeaderSeo";
import { getId, getSlug } from "@/utils/file";
import { useGetConversation } from "@/hooks/useGetConversation";

const ProductDetail = () => {
  const { isLoggedIn } = useAuthentication();
  const { data: profile } = useGetMyProfile();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showMakeAnOfferModal, setShowMakeAnOfferModal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showTaxes, setShowTaxes] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [activeRegisterModal, setActiveRegisterModal] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState<
    ProductApiData[]
  >([]);
  const [likes, setLikes] = useState(0);
  const [officialLiked, setOfficialLiked] = useState(false);
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);
  const [isProductSelling, setIsProductSelling] = useState(true);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [id, setId] = useState<string>();

  const { mutate: getProductsByCategory } = useGetProductsByCategory();

  const myCart = useCart((state) => state.cart);

  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const { mutate: getProductById, isError: isGettingProductDetailError } =
    useGetProductById();
  const [productDetail, setProductDetail] = useState<ProductApiData>();
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>(
    "Buy your GANNI category on GANNIREPEAT, the space to Buy and Sell Pre-loved GANNI Iconic Styles. Second-hand GANNI category available."
  );

  const { mutate: setDefaultShipment } = useSetDefaultCheckoutShipment();
  const { mutate: addOfficialWardrobe } = useAddOfficialWardrobe();
  const { mutate: removeOfficialWardrobe } = useRemoveOfficialWardrobe();

  const { mutate: addToWishlist, isSuccess: addToWishlistSuccess } =
    useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { mutate: addProductToCart } = useAddToCart();
  const { mutate: getGuestToken } = useGetGuestToken();
  const { refetch: refetchCart } = useGetCheckoutCart();
  const { mutate: getCountLikes } = useCountLikes();
  const { data: myWishlist, refetch: refetchMyWishlist } = useGetMyWishlist();
  const { data: myOffers } = useGetMyOffers();
  const { chatData, setChatData } = useChatBox();
  const { mutate: getConversation } = useGetConversation();

  useEffect(() => {
    if (slug) {
      setId(getId(slug as string));
    }
  }, [slug]);

  useEffect(() => {
    if (id) {
      getProductById(
        { id },
        {
          onSuccess: (productData) => {
            setProductDetail(productData);
            setIsProductSelling(productData.is_selling);
            setProductImages(
              productData.media.data.map((e: ImageApiData) => e.original_image)
            );
            getProductsByCategory(
              {
                constraints: `"category_ids":"${productData.categories.data[0].id}","product_list":true`,
                relate_product_id: productData.id,
              },
              {
                onSuccess: (data) => {
                  setProductsByCategory(data);
                },
              }
            );
            // onEvent("view_item", { view_item: null });
            onEvent("view_item", {
              view_item: {
                content_type: "product",
                product_id: productData.id,
                product_name: productData.name,
                product_category: productData.categories.data[0].name,
                product_brand: productData.designer?.data.name,
                product_condition: productData.condition?.data.name,
                product_currency: productData.currency.data.code,
                product_size: productData.size?.data.name,
                product_color: productData.color?.data.name,
                product_price: productData.base_currency_price,
                product_quantity: 1,
              },
            });
          },
        }
      );
      getCountLikes(id, {
        onSuccess: (data) => {
          setNumberOfLikes(data);
        },
      });
    }
  }, [id]);

  useMemo(() => {
    if (profile && productDetail) {
      if (
        profile?.email === "ganni@gannirepeat.com" &&
        productDetail.wardrobes &&
        productDetail.wardrobes.data.length > 0 &&
        productDetail.wardrobes.data.find(
          (wardrobe) => wardrobe.name === `Ditte's Favourites`
        ) !== undefined
      ) {
        setOfficialLiked(true);
      }
    }
  }, [profile, productDetail]);

  const toggleLoginModal = () => {
    setActiveLoginModal(!activeLoginModal);
  };

  const toggleAddToBagModal = () => {
    setShowAddToBagModal(!showAddToBagModal);
  };

  const toggleSizeModal = () => {
    setShowSizeModal(!showSizeModal);
  };

  const toggleConditionModal = () => {
    setShowConditionModal(!showConditionModal);
  };

  const toggleMakeAnOfferModal = () => {
    setShowMakeAnOfferModal(!showMakeAnOfferModal);
  };

  const toggleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleShowPayment = () => {
    setShowPayment(!showPayment);
  };

  const toggleShowShipping = () => {
    setShowShipping(!showShipping);
  };

  const toggleShowTaxes = () => {
    setShowTaxes(!showTaxes);
  };

  const token = useHasToken();
  const addToCart = () => {
    if (!token) {
      getGuestToken(
        { grant_type: "anonymous" },
        {
          onSuccess: (data) => {
            cookies.set("token", data.access_token);
            setTimeout(() => {
              addProductToCart(
                { product_id: Number(id) },
                {
                  onSuccess: () => {
                    toggleAddToBagModal();
                    setDefaultShipment({ fallback_language: "en" });
                    refetchCart();
                    if (productDetail) {
                      // onEvent("add_to_cart", { add_to_cart: null });
                      onEvent("add_to_cart", {
                        add_to_cart: {
                          content_type: "product",
                          product_id: productDetail.id,
                          product_name: productDetail.name,
                          product_category:
                            productDetail.categories.data[0].name,
                          product_brand: productDetail.designer?.data.name,
                          product_price: productDetail.base_currency_price,
                          product_condition: productDetail.condition?.data.name,
                          product_material: productDetail.material?.data.name,
                          product_size: productDetail.size?.data.name,
                          product_color: productDetail.color?.data.name,
                          product_currency: productDetail.currency.data.code,
                          product_quantity: 1,
                        },
                      });
                    }
                  },
                }
              );
            });
          },
        }
      );
    } else {
      addProductToCart(
        { product_id: Number(id) },
        {
          onSuccess: () => {
            toggleAddToBagModal();
            setDefaultShipment({ fallback_language: "en" });
            refetchCart();
            if (productDetail) {
              // onEvent("add_to_cart", { add_to_cart: null });
              onEvent("add_to_cart", {
                add_to_cart: {
                  content_type: "product",
                  product_id: productDetail.id,
                  product_name: productDetail.name,
                  product_category: productDetail.categories.data[0].name,
                  product_brand: productDetail.designer?.data.name,
                  product_price: productDetail.base_currency_price,
                  product_condition: productDetail.condition?.data.name,
                  product_material: productDetail.material?.data.name,
                  product_size: productDetail.size?.data.name,
                  product_color: productDetail.color?.data.name,
                  product_currency: productDetail.currency.data.code,
                  product_quantity: 1,
                },
              });
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    if (numberOfLikes) setLikes(numberOfLikes);
  }, [numberOfLikes]);

  const toggleWishlist = (product_id: number) => {
    if (isLoggedIn) {
      if (profile?.email === "ganni@gannirepeat.com") {
        if (officialLiked) {
          removeOfficialWardrobe(
            { product_id: String(product_id) },
            {
              onSuccess: () => {
                setOfficialLiked(false);
              },
            }
          );
        } else {
          addOfficialWardrobe(
            { product_id: String(product_id) },
            {
              onSuccess: () => {
                setOfficialLiked(true);
              },
            }
          );
        }
      } else if (inWishlist) {
        removeFromWishlist({ product_id });
        setInWishlist(false);
        const newLikes = likes - 1;
        setLikes(newLikes);
        refetchMyWishlist();
      } else {
        addToWishlist({ product_id });
        setInWishlist(true);
        const newLikes = likes + 1;
        setLikes(newLikes);
        refetchMyWishlist();
      }
    } else {
      toggleLoginModal();
    }
  };

  useEffect(() => {
    if (!myWishlist || !productDetail) return;
    const foundInWishlist = myWishlist.find(
      (wishlist: Wishlist) => wishlist.product_id === productDetail.id
    );
    if (foundInWishlist) setInWishlist(true);
  }, [myWishlist && productDetail]);

  const onOpenRegister = () => {
    setActiveLoginModal(true);
    setActiveRegisterModal(true);
  };
  const onOpenLogin = () => {
    setActiveLoginModal(true);
    setActiveRegisterModal(false);
  };

  const isProductSeller = () => {
    return profile && productDetail && profile.id === productDetail.seller_id;
  };
  const isProductOwnedByGanniSeller = () => {
    return (
      productDetail && productDetail.seller_info.email === GANNI_SELLER_EMAIL
    );
  };

  const hasNotMadeAnOfferBefore = () => {
    return (
      myOffers &&
      id &&
      myOffers.find((offer) => offer.product_id == Number(id)) === undefined
    );
  };

  const messageSeller = () => {
    const product = productDetail as ProductApiData;
    getConversation(
      { productId: product.id, customerId: Number(profile?.id) },
      {
        onSuccess: (data) => {
          setChatData(getDataChat(product, data));
        },
        onError: () => {
          setChatData(getDataChat(product));
        },
      }
    );
  };

  const getDataChat = (
    product: ProductApiData,
    conversation?: ConversationApiData
  ) => {
    return {
      ...chatData,
      product: product,
      conversation: conversation || ({} as ConversationApiData),
      customer: product.seller_info,
      is_buyer: true,
    };
  };

  const imageRef = useRef<(HTMLLIElement | null)[]>([]);
  const settings: Settings = {
    customPaging: function (i: number) {
      return (
        <li ref={(el) => (imageRef.current[i] = el)}>
          <button>{i}</button>
        </li>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: "0px",
  };
  const onClickImagePaginator = (index: number) => {
    if (imageRef.current) {
      imageRef.current[index]?.click();
    }
  };

  const getQueryCategory = (level: 1 | 2) => {
    const dataCheck = DATA_MENU.filter((item) => item.label !== "new-in");
    const levelFirst = dataCheck.find((item) =>
      item.sub_menu.includes(String(productDetail?.categories?.data[0]?.name))
    );
    const levelSecond = levelFirst?.label
      ? productDetail?.categories?.data[0]?.name
      : productDetail?.categories?.data[1]?.name;
    const link = levelFirst?.label
      ? levelFirst.label
      : productDetail?.categories?.data[0]?.name;
    const main = link?.toLowerCase();
    return level < 2
      ? {
          url: `/section/${main}?categories=${main}`,
          label: main,
        }
      : {
          url: `/section/${main}?categories=${[
            main,
            levelSecond?.toLowerCase(),
          ].join(",")}`,
          label: levelSecond,
        };
  };

  useEffect(() => {
    if (productDetail) {
      const category = productDetail.categories.data[0].name;
      const subCategory = productDetail.categories.data[1].name;
      const color = productDetail?.color?.data.name || "";
      const size = productDetail.size?.data.name || "";
      const material = productDetail.material?.data.name || "";
      setMetaTitle(
        `${category} GANNI ${color} ${size} in ${material} on GANNIREPEAT`
      );
      setMetaDescription(
        `Buy your GANNI ${category} on GANNIREPEAT, the space to Buy and Sell Pre-loved GANNI Iconic Styles. Second-hand GANNI ${subCategory} available.`
      );
    }
  }, [productDetail]);

  return (
    <div>
      <HeaderSeo title={metaTitle} description={metaDescription} />

      {!isGettingProductDetailError && (
        <main className="">
          {/* TODO: get categories from api */}
          {/*Breadcrumbs*/}
          <div className="container m-auto px-4 xl2:max-w-screen-xl2">
            <ul className="breadcrumbs flex flex-wrap items-center -ml-3 py-8">
              <li className="font-helveticaNeue400 text-xs text-dark pl-3 pr-4 bg-breadcrumbs bg-no-repeat bg-right-center bg-6">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="font-helveticaNeue400 text-xs text-dark pl-3 pr-4 bg-breadcrumbs bg-no-repeat bg-right-center bg-6">
                <Link href={getQueryCategory(1).url}>
                  <a className="capitalize">{getQueryCategory(1).label}</a>
                </Link>
              </li>
              <li className="font-helveticaNeue400 text-xs text-dark pl-3 pr-4 bg-breadcrumbs bg-no-repeat bg-right-center bg-6">
                <Link href={getQueryCategory(2).url}>
                  <a className="capitalize">{getQueryCategory(2).label}</a>
                </Link>
              </li>
              <li className="font-helveticaNeue400 text-xs text-dark pl-3 pr-4">
                <span>{productDetail?.name}</span>
              </li>
            </ul>
          </div>
          {/*./Breadcrumbs*/}

          {/*Product details*/}
          <div className="container m-auto px-4 xl2:max-w-screen-xl2">
            <div className="product-details-wrap flex flex-wrap items-start">
              {/*Product Gallery*/}
              <div className="p-gallery w-full lg:w-3/5 flex items-center pb-12 lg:space-x-4">
                {productImages.length > 0 && (
                  <>
                    <div className="w-24 h-600 hidden lg:block pb-12 flex-shrink-0">
                      {productImages.map((image, index) => {
                        return (
                          <div
                            className="py-[3px]"
                            key={index}
                            onClick={() => onClickImagePaginator(index)}
                            // onClick={() =>
                            //   document.getElementById(image)?.click()
                            // }
                          >
                            <Image
                              loader={reflauntLoader}
                              className="w-full cursor-pointer"
                              src={image}
                              alt="product image"
                              width={100}
                              height={120}
                              objectFit="cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex-1 w-full lg:w-product-slides pb-12">
                      <Slider {...settings}>
                        {productImages.map((image, index) => {
                          return (
                            <div className="image-wrapper" key={index}>
                              <Image
                                loader={reflauntLoader}
                                src={image}
                                alt="product image"
                                width={634}
                                height={760}
                                objectFit="cover"
                              />
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </>
                )}
              </div>
              {/*Product info*/}
              <div className="p-info w-full lg:w-2/5 pb-8 lg:pl-12">
                <span
                  className={`inline-block font-helveticaNeue500 min-w-[150px] text-center text-xs text-white uppercase leading-none pt-[10px] pb-[8px] py-3 tracking-wider mb-4 ${
                    productDetail?.shipping_type === "free" ? "bg-green" : ""
                  }`}
                >
                  {productDetail?.shipping_type === "free"
                    ? "Free shipping"
                    : ""}
                </span>
                <h1 className="font-helveticaNeue500 text-4xl lg:text-5xl uppercase text-dark mb-4">
                  {productDetail?.name}
                </h1>
                <div className="flex justify-between mb-8">
                  {productDetail && (
                    <p className="price font-helveticaNeue500 text-3xl">
                      <Price price={productDetail.base_currency_price} />
                    </p>
                  )}
                  <div className="loc flex items-center font-helveticaNeue500 text-xs text-grey2">
                    <Image
                      src="/assets/images/marker.svg"
                      alt=""
                      width="14px"
                      height="20px"
                    />{" "}
                    <span className="ml-2 pt-1 capitalize">
                      {productDetail?.seller_info?.city}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-helveticaNeue400 text-lg">
                    Size:{" "}
                    <span className="font-helveticaNeue500">
                      {productDetail?.size?.data?.name
                        ? productDetail?.size?.data?.name
                        : "Size"}
                    </span>
                  </p>
                  {productDetail &&
                  ["CLOTHING", "SHOES"].includes(
                    productDetail.categories.data[0]?.sizing_type
                  ) ? (
                    <a
                      onClick={toggleSizeModal}
                      className="font-helveticaNeue500 text-xs text-grey2 underline uppercase transition-all hover:text-dark cursor-pointer"
                    >
                      SIZE GUIDE
                    </a>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-between items-center mb-8">
                  <p className="font-helveticaNeue400 text-lg">
                    Condition:{" "}
                    <span className="font-helveticaNeue500">
                      {productDetail?.condition?.data?.name
                        ? productDetail?.condition?.data?.name
                        : "Condition"}
                    </span>
                  </p>
                  <a
                    onClick={toggleConditionModal}
                    className="font-helveticaNeue500 text-xs text-grey2 underline uppercase transition-all hover:text-dark cursor-pointer"
                  >
                    Condition GUIDE
                  </a>
                </div>
                {!isProductSeller() && isProductSelling && (
                  <Button
                    onClick={addToCart}
                    disabled={
                      myCart !== null &&
                      myCart.products &&
                      myCart.products.data.find(
                        (product: Product) => product.id === Number(id)
                      ) != undefined
                    }
                    classes="font-helveticaNeue500 text-2xl leading-none text-center pt-[18px] pb-[12px] transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase py-3 mb-4"
                  >
                    {myCart &&
                    myCart.products &&
                    myCart.products.data.find(
                      (product: Product) => product.id === Number(id)
                    )
                      ? "Added"
                      : "Add to bag"}
                  </Button>
                )}
                {!isProductSeller() && productDetail && (
                  <>
                    <div className={`fvt active mb-8 flex`}>
                      <div
                        className={`relative flex items-center justify-center h-[32px] w-[36px] cursor-pointer ${
                          inWishlist || officialLiked
                            ? "animate-heartScale"
                            : ""
                        } transition-all`}
                        onClick={() => {
                          toggleWishlist(productDetail.id);
                        }}
                      >
                        <Image
                          className="w-full h-auto object-cover"
                          src={
                            inWishlist || officialLiked
                              ? "/assets/icons/heart-pink.svg"
                              : "/assets/icons/heart.svg"
                          }
                          alt="Heart icon"
                          width={40}
                          height={36}
                        />

                        {!profile ||
                          (profile.email !== "ganni@gannirepeat.com" && (
                            <span
                              className={`font-helveticaNeue500 absolute top-[30%] text-white text-xs z-50 ${
                                likes > 99
                                  ? "left-[25%]"
                                  : likes > 9
                                  ? "left-[30%]"
                                  : "left-[45%]"
                              }`}
                            >
                              {likes > 99 ? "99+" : likes}
                            </span>
                          ))}
                      </div>
                      {addToWishlistSuccess && inWishlist ? (
                        <span className="pl-4 pt-2 text-shocking_pink">
                          ADDED TO WISHLIST!
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                )}
                <div
                  onClick={() =>
                    router.push(
                      `/seller/${getSlug(
                        String(productDetail?.seller_info.first_name),
                        String(productDetail?.seller_id)
                      )}/selling`
                    )
                  }
                  className="user-profile-block flex cursor-pointer"
                >
                  <div className="thumb mb-8 w-24 relative">
                    <Image
                      loader={reflauntLoader}
                      src={
                        productDetail?.seller_info &&
                        productDetail?.seller_info.profile_picture
                          ? productDetail?.seller_info.profile_picture
                          : "/assets/images/Default_Profile.svg"
                      }
                      alt="seller picture"
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  </div>
                  {/*Info*/}
                  <div className="info mb-8 lg:mb-12 flex-1 pl-4">
                    {productDetail?.seller_info &&
                    productDetail?.seller_info.rate ? (
                      <Rating
                        rate={productDetail.seller_info.rate}
                        values={productDetail.seller_info.number_rate}
                      />
                    ) : (
                      ""
                    )}
                    <h3 className="font-helveticaNeue500 text-dark uppercase text-2xl mb-1">
                      {productDetail?.seller_info
                        ? productDetail?.seller_info.first_name
                        : "SellerName"}
                    </h3>
                    <p className="font-helveticaNeue500 text-dark uppercase text-xl mb-1">
                      {productDetail?.seller_info
                        ? `@${productDetail?.seller_info.nickname}`
                        : "@SellerUsername"}
                    </p>
                  </div>
                </div>
                {!isLoggedIn && (
                  <div>
                    <div className="border border-pink p-4 flex items-center mb-8 lg:mb-12">
                      <div className="w-6">
                        <Image
                          src="/assets/images/Info.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="pl-4 text-sm flex-1">
                        <p>
                          <a
                            onClick={onOpenLogin}
                            className="underline cursor-pointer"
                          >
                            Log in
                          </a>{" "}
                          or{" "}
                          <a
                            onClick={onOpenRegister}
                            className="underline cursor-pointer"
                          >
                            create an account
                          </a>{" "}
                          to make an offer or message the seller about this
                          item.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {!isProductSeller() &&
                  !isProductOwnedByGanniSeller() &&
                  isProductSelling && (
                    <div>
                      {hasNotMadeAnOfferBefore() && (
                        <a
                          onClick={toggleMakeAnOfferModal}
                          className="font-helveticaNeue500 leading-none text-center pt-[18px] pb-[12px] py-3 transition-all border text-green border-green hover:border-green hover:text-white hover:bg-green uppercase text-2xl w-full block mb-4 cursor-pointer"
                        >
                          Make an offer
                        </a>
                      )}

                      {isLoggedIn && (
                        <a
                          className="font-helveticaNeue500 cursor-pointer text-center px-3 py-4 transition-all border border-dark text-dark hover:border-dark hover:text-white hover:bg-dark uppercase text-2xl w-full block mb-12"
                          onClick={messageSeller}
                        >
                          Message
                        </a>
                      )}
                    </div>
                  )}

                {/*Accordions*/}
                {/*Description*/}
                <div className="filter-single product-page-accordion mb-4 lg:mb-8">
                  <h4
                    className={`font-helveticaNeue500 text-dark text-2xl uppercase relative mb-4 pr-5 cursor-pointer before:w-4 before:h-2 before:bg-collapse-title before:rotate-180 before:bg-100% before:absolute before:top-2/4 before:right-0 before:-m-1 before:transition-all ${
                      showDescription ? "before:rotate-0" : ""
                    }`}
                    onClick={toggleShowDescription}
                  >
                    Description
                  </h4>
                  <div
                    id="acc-productDescription"
                    className={`font-helveticaNeue400 text-sm ${
                      showDescription ? "" : "hidden"
                    }`}
                  >
                    <p className="mb-6">{productDetail?.description || ""}</p>
                    {productDetail?.color?.data?.name && (
                      <p className="mb-6">
                        Colour: <br />
                        {productDetail?.color?.data?.name}
                      </p>
                    )}
                    {productDetail?.styles?.data &&
                      productDetail?.styles?.data.length > 0 && (
                        <p className="mb-6">
                          Pattern: <br />
                          {productDetail?.styles?.data
                            ?.map((item) => item.name)
                            .join(", ")}
                        </p>
                      )}
                    {productDetail?.material?.data?.name && (
                      <p className="mb-6">
                        Material: <br />
                        {productDetail?.material?.data?.name}
                      </p>
                    )}
                  </div>
                </div>
                {/*./Description*/}
                {/*Payment*/}
                <div className="filter-single product-page-accordion mb-4 lg:mb-8">
                  <h4
                    className={`font-helveticaNeue500 text-dark text-2xl uppercase relative mb-4 pr-5 cursor-pointer before:w-4 before:h-2 before:bg-collapse-title before:rotate-180 before:bg-100% before:absolute before:top-2/4 before:right-0 before:-m-1 before:transition-all ${
                      showPayment ? "before:rotate-0" : ""
                    }`}
                    onClick={toggleShowPayment}
                  >
                    Payment
                  </h4>
                  <div
                    id="acc-productPayment"
                    className={`font-helveticaNeue400 text-sm ${
                      showPayment ? "" : "hidden"
                    }`}
                  >
                    <p className="mb-6">
                      GANNI Repeat accepts main credit and debit cards payments
                      including Visa and Mastercard. For your protection, all
                      transactions are powered by Stripe, our payment service
                      provider. You benefit from the most advanced online
                      payment security system. Most countries are charged in
                      local currency while some countries are charged in Euro.
                      Prices on the website will show the currency for the
                      website that you are visiting.
                    </p>
                  </div>
                </div>
                {/*./Payment*/}
                {/*Shipping & Returns*/}
                <div className="filter-single product-page-accordion mb-4 lg:mb-8">
                  <h4
                    className={`font-helveticaNeue500 text-dark text-2xl uppercase relative mb-4 pr-5 cursor-pointer before:w-4 before:h-2 before:bg-collapse-title before:rotate-180 before:bg-100% before:absolute before:top-2/4 before:right-0 before:-m-1 before:transition-all ${
                      showShipping ? "before:rotate-0" : ""
                    }`}
                    onClick={toggleShowShipping}
                  >
                    Shipping & Returns
                  </h4>
                  <div
                    id="acc-productShipping"
                    className={`font-helveticaNeue400 text-sm ${
                      showShipping ? "" : "hidden"
                    }`}
                  >
                    <p className="mb-6">
                      <p>
                        The below shipping fees will be applied at checkout:
                      </p>
                      <p className="mt-[10px]">
                        For orders in Europe (excluding UK):
                      </p>
                      <p>
                        <span>
                          <Price price={6.5} />
                        </span>{" "}
                        -{" "}
                        <span>
                          <Price price={35} />
                        </span>
                      </p>
                      <p className="mt-[10px]">
                        For other international orders:
                      </p>
                      <p>
                        <span>
                          <Price price={15} />
                        </span>{" "}
                        -{" "}
                        <span>
                          <Price price={45} />
                        </span>
                      </p>
                      <p className="mt-[10px]">
                        Please note that no returns are accept for change of
                        mind. We protect our buyers by only transferring the
                        proceeds of the sale once the delivery has been made and
                        after a 2-days window, during which the buyer can submit
                        any claims on the item if it is not as per the listing’s
                        information.
                      </p>
                    </p>
                  </div>
                </div>
                {/*./Shipping & Returns*/}
                {/*Taxes & Duties*/}
                <div className="filter-single product-page-accordion mb-4 lg:mb-8">
                  <h4
                    className={`font-helveticaNeue500 text-dark text-2xl uppercase relative mb-4 pr-5 cursor-pointer before:w-4 before:h-2 before:bg-collapse-title before:rotate-180 before:bg-100% before:absolute before:top-2/4 before:right-0 before:-m-1 before:transition-all ${
                      showTaxes ? "before:rotate-0" : ""
                    }`}
                    onClick={toggleShowTaxes}
                  >
                    Taxes & Duties
                  </h4>
                  <div
                    id="acc-productTaxes"
                    className={`font-helveticaNeue400 text-sm ${
                      showTaxes ? "" : "hidden"
                    }`}
                  >
                    <p className="mb-6">
                      Orders shipped outside of the European Union may be
                      subject to import taxes, customs duties and other fees
                      levied by the destination country. All orders are
                      delivered duties unpaid, and all import taxes, duties and
                      customs fees, as well as compliance with the laws and
                      regulations of the destination country, are the
                      responsibility of the Buyer. Payment is usually collected
                      at time of delivery.
                    </p>
                  </div>
                </div>
                {/*./Taxes & Duties*/}
                {/*./Accordions*/}
                {/* FaQ */}
                <div className="productfaq">
                  <div className="border-2 border-green py-8">
                    <div className="container m-auto px-4 xl2:max-w-screen-xl2">
                      <p className="font-helveticaNeue500 text-green uppercase text-xs mb-2">
                        Learn more
                      </p>
                      <h2 className="font-helveticaNeue500 text-green uppercase text-2xl xl:text-3xl">
                        Got a question? read our{" "}
                        <a
                          href="https://ganni-customerservice.zendesk.com/hc/en-us"
                          className="font-helveticaNeue500 text-green uppercase text-2xl xl:text-3xl underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          FAQs
                        </a>
                      </h2>
                    </div>
                  </div>
                </div>
                {/* ./FaQ */}
              </div>
            </div>
          </div>
          {/*./Product details*/}

          {/* Section */}
          <section className="py-16 w-full">
            <div className="overflow-title overflow-hidden mb-6">
              <div className="container m-auto px-4 xl2:max-w-screen-xl2">
                <h2 className="font-helveticaNeue500 text-dark text-3xl xl:text-4xl uppercase">
                  You might also like
                </h2>
              </div>
            </div>

            <div className="container m-auto px-4 xl2:max-w-screen-xl2">
              <div className="swiper productSliderMobile">
                {/* TODO: change fetch from API */}
                <SwiperCarousel products={productsByCategory} />
              </div>
              {/*Button*/}
              <div className="flex justify-center">
                <Link href="/section/new-in">
                  <a className="font-helveticaNeue500 inline-block text-center leading-none pt-[16px] pb-[13px] py-4 transition-all bg-white text-dark hover:opacity-80 border border-dark text-xs min-w-100 uppercase tracking-widest cursor-pointer">
                    Shop All
                  </a>
                </Link>
              </div>
            </div>
          </section>
          {/* ./Section */}
        </main>
      )}

      {productDetail?.categories.data[0]?.sizing_type &&
      ["CLOTHING", "SHOES"].includes(
        productDetail?.categories.data[0]?.sizing_type
      ) ? (
        <SizeModal
          toggleSizeModal={toggleSizeModal}
          active={showSizeModal}
          sizing_type={productDetail?.categories.data[0].sizing_type}
        />
      ) : (
        ""
      )}
      <ConditionModal
        toggleConditionModal={toggleConditionModal}
        active={showConditionModal}
      />
      <MakeAnOfferModal
        toggleMakeAnOfferModal={toggleMakeAnOfferModal}
        active={showMakeAnOfferModal}
        productDetail={productDetail}
      />
      <LoginAndRegisterModal
        active={activeLoginModal}
        toggleLoginModal={toggleLoginModal}
        openRegister={activeRegisterModal}
      />
      <AddToBagModal
        toggleAddToBagModal={toggleAddToBagModal}
        active={showAddToBagModal}
      />
    </div>
  );
};

export default ProductDetail;
