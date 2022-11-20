import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRemoveFromCart } from "@/hooks/useCart";
import { useAddToWishlist } from "@/hooks/useWishlist";
import { useGetCheckoutCart } from "@/hooks/useCheckout";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetMyWishlist } from "@/hooks/useWishlist";
import { reflauntLoader } from "@/utils/imageLoader";
import Price from "@/components/Price";
import { onEvent } from "@/utils/gtag";
import { getSlug } from "@/utils/file";

interface ShoppingBagProductCard {
  product: Product;
}

export const ShoppingBagProductCard = ({ product }: ShoppingBagProductCard) => {
  const { isLoggedIn } = useAuthentication();

  const { refetch: refetchCart } = useGetCheckoutCart();
  const { data: myWishlist } = useGetMyWishlist();

  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const removeProductFromCart = () => {
    removeFromCart(
      { product_id: product.id },
      {
        onSuccess: () => {
          refetchCart();
          // onEvent("remove_from_cart", { remove_from_cart: null });
          onEvent("remove_from_cart", {
            remove_from_cart: {
              content_type: "product",
              product_id: product.id,
              product_name: product.name,
              product_category: product.categories[0].name,
              product_brand: product.designer_name,
              product_condition: product.condition_name,
              product_size: product.size_name,
              product_color: product.color_name,
              product_price: product.base_currency_price,
              product_quantity: 1,
            },
          });
        },
      }
    );
  };

  const removeAndAddToWishlist = () => {
    addToWishlist(
      { product_id: product.id },
      {
        onSuccess: () => {
          removeFromCart(
            { product_id: product.id },
            {
              onSuccess: () => {
                refetchCart();
              },
            }
          );
        },
      }
    );
  };

  return (
    <div className={`bg-white mb-4 `}>
      <div className="product-popup flex w-full text-left py-4 px-2">
        <div className="thumb w-100 cursor-pointer">
          <Link href={`/product/${getSlug(product.name, product.id)}`}>
            <a>
              <Image
                loader={reflauntLoader}
                className="w-full"
                src={product.medium_image_path}
                alt="Product Image"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div className="info flex-1 text-sm pl-4">
          <div className="flex flex-wrap md:flex-nowrap justify-between px-2">
            <div className="">
              <h3 className="font-helveticaNeue500 uppercase mb-1">
                {product.name}
              </h3>
              <p className="mb-2">
                <Price price={product.checkout_product.data.selling_price} />
              </p>
              <p className="mb-2">SIZE: {product.size_name}</p>
            </div>
            <div className="md:text-right grow w-full md:w-auto min-w-[150px]">
              <a
                onClick={removeProductFromCart}
                className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
              >
                Remove
              </a>
              <br />
              {isLoggedIn &&
                (!myWishlist ||
                  myWishlist.find(
                    (wishlist) => wishlist.product_id === product.id
                  ) === undefined) && (
                  <a
                    onClick={removeAndAddToWishlist}
                    className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                  >
                    Move to wishlist
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagProductCard;
