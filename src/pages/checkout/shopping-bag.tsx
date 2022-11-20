import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ShoppingBagProductCard } from "@/components/ShoppingBagProductCard";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCart } from "@/hooks/useCart";
import { useFormik } from "formik";
import { useApplyPromoCode, useGetCheckoutCart } from "@/hooks/useCheckout";
import InputFormik from "@/components/InputFormik";
import Price from "@/components/Price";
import Link from "next/link";
import { useCartConfirmed } from "@/hooks/useCartConfirmed";
import HeaderSeo from "@/components/HeaderSeo";

const CheckoutShoppingBag = () => {
  const router = useRouter();

  const { isLoggedIn } = useAuthentication();
  const { setCartConfirmed } = useCartConfirmed();
  useEffect(() => {
    setCartConfirmed(null);
  }, []);

  const myCart = useCart((state) => state.cart);
  const { refetch: refetchCart } = useGetCheckoutCart();

  const {
    mutate: applyPromoCode,
    isSuccess: applyPromoSuccess,
    isError: applyPromoError,
  } = useApplyPromoCode();

  const next = () => {
    if (!myCart || !myCart.products || myCart.products.data.length === 0) {
      router.push("/section/new-in");
    } else if (isLoggedIn) {
      router.push("/checkout/delivery");
    } else {
      router.push("/checkout/login");
    }
  };

  const promoCodeFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      applyPromoCode(
        { code: values.code },
        {
          onSuccess: () => {
            refetchCart();
          },
        }
      );
    },
  });

  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Shopping Bag"
        description="Extend the life of your wardrobe with GANNIREPEAT: The Easiest, Safest and Cheapest way to Buy Pre-loved GANNI Clothes, Shoes and Accessories."
      />

      {/*Checkout_Bag_D*/}
      <div className={`flex flex-wrap`}>
        <div className="py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-2/4 bg-[#FAFAFA]">
          <div className="w-full m-auto">
            <h2 className="font-helveticaNeue500 text-xl uppercase mb-6">
              Your shopping bag
            </h2>

            {myCart && myCart.products && myCart.products.data.length > 0 ? (
              myCart.products.data.map((product: Product, index) => {
                return (
                  <span key={index}>
                    <div className="flex flex-wrap mb-4">
                      <div className="w-full md:w-2/4">
                        {/* <span className="font-helveticaNeue400 text-sm">
                          Package {index + 1} of{" "}
                          {myCart?.checkout_packages?.data.length}
                        </span> */}
                      </div>
                      <div className="w-full md:w-2/4 md:text-right">
                        <span className="font-helveticaNeue500 text-sm">
                          Shipping from:{" "}
                          <span className="text-sm capitalize">
                            {product.seller_info?.city}
                          </span>
                        </span>
                      </div>
                    </div>
                    {/*Product*/}

                    <span>
                      <ShoppingBagProductCard product={product} />
                    </span>

                    {/*./Product*/}
                  </span>
                );
              })
            ) : (
              <div className="text-sm flex-1">
                <p>The items you add to your shopping bag will appear here.</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-2/4">
          <h2 className="font-helveticaNeue500 text-2xl uppercase mb-6 md:mb-12">
            Order summary
          </h2>
          {myCart && myCart.products && myCart.products.data.length > 0 ? (
            <>
              {/*Summary Table*/}
              <table className="table w-full summary-table mb-8">
                <tbody>
                  <tr>
                    <td className="text-sm p-1 pl-0">Order value</td>
                    <td className="text-sm p-1 pr-0 text-right">
                      <Price price={Number(myCart.sub_total)} />
                    </td>
                  </tr>
                  <tr>
                    <td className={`text-sm p-1 pl-0`}>Shipping</td>
                    <td className={`text-sm p-1 pr-0 text-right`}>
                      <Price price={Number(myCart.shipping_rate)} />
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`text-sm p-1 pl-0 ${
                        myCart.coupon &&
                        myCart.coupon.data.code &&
                        (myCart.products_discount || myCart.shipping_discount)
                          ? ""
                          : "pb-8"
                      }`}
                    >
                      Tax
                    </td>
                    <td
                      className={`text-sm p-1 pr-0 ${
                        myCart.coupon &&
                        myCart.coupon.data.code &&
                        (myCart.products_discount || myCart.shipping_discount)
                          ? ""
                          : "pb-8"
                      } text-right`}
                    >
                      <Price price={Number(myCart.tax_total)} />
                    </td>
                  </tr>
                  {myCart.coupon &&
                  myCart.coupon.data.code &&
                  (myCart.products_discount || myCart.shipping_discount) ? (
                    <tr className="text-shocking_pink">
                      <td className="text-sm p-1 pl-0 pb-8">
                        Promocode {myCart.coupon.data.code}
                      </td>
                      <td className="text-sm p-1 pr-0 pb-8 text-right">
                        <Price
                          price={
                            myCart.products_discount ||
                            0 + (myCart.shipping_discount || 0)
                          }
                        />
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
                <tfoot className="border-t border-t-grey">
                  <tr>
                    <td className="font-helveticaNeue500 text-sm p-1 pl-0 pt-8">
                      TOTAL
                    </td>
                    <td className="font-helveticaNeue500 text-sm p-1 pr-0 text-right pt-8">
                      <Price price={Number(myCart.total)} />
                    </td>
                  </tr>
                </tfoot>
              </table>
              {/*./Summary Table*/}
              {/*Info block*/}
              <div className="border border-pink p-4 flex items-center mb-6 lg:mb-8">
                <div className="w-6">
                  <Image
                    src="/assets/images/Info.svg"
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="pl-4 text-sm flex-1 w-full">
                  <p>
                    The final shipping costs are calculated based on your
                    delivery location and local sales taxes. However, the
                    shipping costs exclude all relevant import duties and
                    customs fees. As the recipient, you will need to pay for
                    these duties and fees upon request by your Local Customs.
                  </p>
                </div>
              </div>
              {/*./Info block*/}
              {/*Promo code*/}
              <form onSubmit={promoCodeFormik.handleSubmit}>
                <div className="flex items-end">
                  <InputFormik
                    name="code"
                    label="Promo Code"
                    onChange={promoCodeFormik.handleChange}
                    value={promoCodeFormik.values.code}
                    labelClasses="text-sm mb-2"
                    wraperClasses="grow mr-2"
                  />
                  <button
                    type="submit"
                    className="font-helveticaNeue500 text-center h-12 py-4 transition-all w-24 bg-grey uppercase text-xs hover:opacity-80 tracking-widest"
                  >
                    Submit
                  </button>
                </div>
                {(applyPromoSuccess &&
                  myCart.coupon &&
                  myCart.coupon.data.code) ||
                applyPromoError ? (
                  <span className="input-response mt-2 text-sm block text-pink">
                    {applyPromoSuccess && myCart.coupon
                      ? `Promocode ${myCart.coupon.data.code} has been applied`
                      : "Invalid promocode"}
                  </span>
                ) : (
                  ""
                )}
                {/* ./Promo code */}
              </form>
            </>
          ) : (
            <div className="text-sm flex-1">
              <p>You don&apos;t have any items in your bag.</p>
            </div>
          )}

          <div className="flex flex-wrap mt-12">
            <div className="w-full">
              <div className="mb-6">
                {myCart &&
                myCart.products &&
                myCart.products.data.length > 0 ? (
                  <button
                    onClick={next}
                    className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                  >
                    Checkout
                  </button>
                ) : (
                  <button
                    onClick={next}
                    className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                  >
                    CONTINUE SHOPPING
                  </button>
                )}
              </div>
            </div>
            {isLoggedIn && (
              <Link passHref={true} href="/my-account/wishlist">
                <div className="w-full">
                  <div className="mb-6">
                    <button className="font-helveticaNeue500 text-center px-3 transition-all   border border-dark text-dark hover:border-dark hover:text-white hover:bg-dark py-4 text-xs block w-full uppercase tracking-widest">
                      Go to wishlist
                    </button>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/*./Checkout_Bag_D*/}
    </div>
  );
};

export default CheckoutShoppingBag;
