import Image from "next/image";
import { useRemoveFromWishlist } from "@/hooks/useWishlist";
import Link from "next/link";
import { useAddToCart } from "@/hooks/useCart";
import { useGetCheckoutCart } from "@/hooks/useCheckout";
import { useState } from "react";
import { reflauntLoader } from "@/utils/imageLoader";
import { getSlug } from "@/utils/file";

interface WishlistComponent {
  product: Product;
  count: number;
}

const Wishlist = ({ product, count }: WishlistComponent) => {
  const [wishlistRemoved, setWishlistRemoved] = useState(false);

  const { mutate: removeProductFromWishlist } = useRemoveFromWishlist();
  const { mutate: addProductToCart } = useAddToCart();

  const {
    data: checkoutCart,
    isSuccess: getCheckoutCartSuccess,
    refetch: refetchCheckoutCart,
  } = useGetCheckoutCart();

  const addToCart = () => {
    addProductToCart(
      { product_id: product.id },
      { onSuccess: () => refetchCheckoutCart() }
    );
  };

  const removeFromWishlist = () => {
    removeProductFromWishlist(
      { product_id: product.id },
      {
        onSuccess: () => {
          setWishlistRemoved(true);
          refetchCheckoutCart();
        },
      }
    );
  };

  return (
    <>
      {!wishlistRemoved ? (
        <div className="bg-white mb-4 border-b border-b-grey">
          <div className="product-popup flex w-full text-left py-4 px-2">
            <div className="thumb w-100 relative">
              <Link href={`/product/${getSlug(product.name, product.id)}`}>
                <a>
                  <Image
                    loader={reflauntLoader}
                    className="w-full h-auto object-cover"
                    src={product.media.data[0].original_image}
                    alt="product image"
                    width={100}
                    height={120}
                  />
                </a>
              </Link>
            </div>
            <div className="info flex-1 text-sm pl-4">
              <div className="flex flex-wrap justify-between px-2">
                <div className="w-full md:w-auto">
                  <h3 className="font-helveticaNeue500 uppercase mb-1">
                    {product.name}
                  </h3>
                  <p className="mb-2">£{product.price}</p>
                  <p className="mb-2">SIZE: {product.size?.data?.name}</p>
                </div>
                <div className="md:text-right flex-1 w-full md:w-auto">
                  <p className="text-pink mb-2">
                    In {count > 1 ? count - 1 : count} other’s wishlists
                  </p>
                  <div className="flex justify-between md:justify-end md:flex-col">
                    {product.process_status.data.name === "SELLING" ? (
                      <>
                        <button
                          onClick={addToCart}
                          disabled={
                            getCheckoutCartSuccess &&
                            checkoutCart &&
                            checkoutCart.products.data.find(
                              (p: Product) => p.id === product.id
                            ) !== undefined
                          }
                          className={`font-helveticaNeue500 uppercase text-sm block mb-2 ${
                            getCheckoutCartSuccess &&
                            checkoutCart &&
                            checkoutCart.products.data.find(
                              (p: Product) => p.id === product.id
                            )
                              ? "text-grey"
                              : "cursor-pointer underline"
                          } text-right`}
                        >
                          {getCheckoutCartSuccess &&
                          checkoutCart &&
                          checkoutCart.products.data.find(
                            (p: Product) => p.id === product.id
                          ) !== undefined
                            ? "Added"
                            : "Add to bag"}
                        </button>
                      </>
                    ) : (
                      <p className="mb-1">OUT OF STOCK</p>
                    )}
                    <button
                      onClick={removeFromWishlist}
                      className="font-helveticaNeue500 uppercase text-sm underline block mb-2 cursor-pointer text-right"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Wishlist;
