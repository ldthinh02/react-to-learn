import { reflauntLoader } from "@/utils/imageLoader";
import Image from "next/image";
import Price from "@/components/Price";
import {
  useAddToWishlist,
  useGetMyWishlist,
  useRemoveFromWishlist,
} from "@/hooks/useWishlist";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import LoginAndRegisterModal from "@/components/Modals/LoginAndRegisterModal";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import {
  useAddOfficialWardrobe,
  useRemoveOfficialWardrobe,
} from "@/hooks/useWardrobeHooks";
import { onEvent } from "@/utils/gtag";
import { getSlug } from "@/utils/file";
interface ProductItem {
  price: number;
  name: string;
  id: number;
  image: string;
  size?: string;
  wardrobes?: {
    data: { name: string }[];
  };
  ganniWardrobe?: boolean;
  classes?: string;
  is_sold?: boolean;
  fromCategoryPage?: boolean;
  category?: string;
  brand?: string;
  condition?: string;
  material?: string;
  color?: string;
  currency?: string;
  ganni_love?: boolean;
}

const ProductItem = ({
  price,
  name,
  id,
  image,
  size,
  ganniWardrobe,
  classes,
  is_sold,
  fromCategoryPage,
  brand,
  condition,
  material,
  color,
  currency,
}: ProductItem) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [officialLiked, setOfficialLiked] = useState(false);
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPrice, setNewPrice] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);
  const router = useRouter();

  const { isLoggedIn } = useAuthentication();
  const { data: myProfile } = useGetMyProfile();

  const {
    data: myWishlist,
    isSuccess: myWishlistSuccess,
    refetch: refetchMyWishlist,
  } = useGetMyWishlist();

  const { mutate: addOfficialWardrobe } = useAddOfficialWardrobe();
  const { mutate: removeOfficialWardrobe } = useRemoveOfficialWardrobe();

  useMemo(() => {
    if (myWishlistSuccess && myWishlist) {
      if (
        myWishlist.find((wishlist) => wishlist.product_id === id) !== undefined
      ) {
        setInWishlist(true);
      } else {
        setInWishlist(false);
      }
    }
  }, [myWishlist]);

  useEffect(() => {
    if (ganniWardrobe) setOfficialLiked(ganniWardrobe);
  }, []);

  useEffect(() => {
    if (
      inWishlist ||
      (officialLiked &&
        myProfile &&
        myProfile.email === "ganni@gannirepeat.com")
    ) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [inWishlist, officialLiked, myProfile]);

  const toggleLoginModal = () => {
    setActiveLoginModal(!activeLoginModal);
  };

  const toggleWishlist = () => {
    if (isSubmitting) return;
    setLike(!like);
    setIsSubmitting(true);
    if (isLoggedIn) {
      // ganni user
      if (myProfile && myProfile.email === "ganni@gannirepeat.com") {
        if (officialLiked) {
          removeOfficialWardrobe(
            { product_id: id.toString() },
            {
              onSuccess: () => {
                setOfficialLiked(false);
                setIsSubmitting(false);
              },
              onError: () => setIsSubmitting(false),
            }
          );
        } else {
          addOfficialWardrobe(
            { product_id: id.toString() },
            {
              onSuccess: () => {
                setOfficialLiked(true);
                setIsSubmitting(false);
              },
              onError: () => setIsSubmitting(false),
            }
          );
        }
        // normal user
      } else {
        if (inWishlist) {
          removeFromWishlist(
            { product_id: id },
            {
              onSuccess: () => {
                refetchMyWishlist();
                setIsSubmitting(false);
              },
              onError: () => setIsSubmitting(false),
            }
          );
        } else {
          addToWishlist(
            { product_id: id },
            {
              onSuccess: () => {
                refetchMyWishlist();
                setIsSubmitting(false);
              },
              onError: () => setIsSubmitting(false),
            }
          );
        }
      }
    } else {
      toggleLoginModal();
    }
  };

  const navigateToPDP = () => {
    if (fromCategoryPage) {
      // onEvent("select_content", { select_content: null });
      onEvent("select_content", {
        select_content: {
          product_id: id,
          product_name: name,
          product_price: price,
          product_size: size,
          product_brand: brand,
          product_condition: condition,
          product_material: material,
          product_color: color,
          product_currency: currency,
          product_quantity: 1,
        },
      });
    }
    router.push(`/product/${getSlug(name, id)}`);
  };

  const changeContent = () => {
    const change = document.getElementById(`${id.toString()}`);
    if (change && size) change.innerText = `Size: ${size}`;
  };

  const changeEnter = () => {
    const change = document.getElementById(`${id.toString()}`);
    if (change) change.innerText = `${newPrice}`;
  };

  return (
    <div
      className={`mb-8 px-2 xl:px-4 ${classes ? classes : "w-1/2 xl:w-1/4"}`}
      onMouseEnter={changeContent}
      onMouseLeave={changeEnter}
    >
      <div className="mb-4 relative">
        <div className="flex items-center justify-center">
          <div className="w-full h-full cursor-pointer">
            <div
              className="max-w-[240px] max-h-[288px] flex items-center justify-center relative"
              onClick={navigateToPDP}
            >
              {is_sold && (
                <div className="absolute z-10">
                  <Image
                    src="/assets/images/sold.svg"
                    alt="Sold icon"
                    width={214}
                    height={54}
                    objectFit="cover"
                  />
                </div>
              )}
              <Image
                className="w-[240px] h-[288px]"
                src={image}
                alt=""
                width={240}
                height={288}
                loader={reflauntLoader}
                objectFit="cover"
              />
              {ganniWardrobe && (
                <div className="w-full h-full absolute top-[0] right-[0] bottom-[0] left-[0] z-50">
                  <div className="w-[33px] h-[30px] lg:w-[41px] lg:h-[38px] absolute top-[8px] right-[2px] lg:right-[8px] xl:right-[2px]">
                    <Image
                      className="w-full h-full"
                      src="/assets/icons/we-love.svg"
                      alt="We love icon"
                      width={41}
                      height={38}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[12px]">
          <span
            className={`cursor-pointer self-start min-w-[36px] ${
              like ? "animate-heartScale" : ""
            } transition-all`}
            onClick={toggleWishlist}
          >
            <Image
              src={
                like
                  ? "/assets/images/Heart-pink.svg"
                  : "/assets/images/Heart.svg"
              }
              alt="wishlist heart image"
              width={39}
              height={34}
            />
          </span>
          <div
            className="cursor-pointer transition-all pt-0 pl-[12px]"
            onClick={navigateToPDP}
          >
            <p className="text-xs md:text-sm uppercase leading-[19.6px] tracking-wide text-dark font-helveticaNeue500 ease-in">
              {name}
            </p>
            <p
              id={id.toString()}
              className="text-[14px] uppercase text-dark font-helveticaNeue400"
            >
              <Price
                price={price}
                onChangePrice={(value) => setNewPrice(value)}
              />
            </p>
          </div>
        </div>
      </div>
      <LoginAndRegisterModal
        active={activeLoginModal}
        toggleLoginModal={toggleLoginModal}
      />
    </div>
  );
};

export default ProductItem;
