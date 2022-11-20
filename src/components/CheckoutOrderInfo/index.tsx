import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useApplyPromoCode, useGetCheckoutCart } from "@/hooks/useCheckout";
import InputFormik from "@/components/InputFormik";
import { useFormik } from "formik";
import Price from "@/components/Price";
import { reflauntLoader } from "@/utils/imageLoader";

interface CheckoutOrderInfoCheckoutOrderInfo {
  showMobileViewOrder: boolean;
  toggleMobileViewOrder: () => void;
}

interface PseudoCheckoutPackage {
  seller_id: number;
  products: Product[];
  city: string;
}

export const CheckoutOrderInfoCheckoutOrderInfo = ({
  showMobileViewOrder,
  toggleMobileViewOrder,
}: CheckoutOrderInfoCheckoutOrderInfo) => {
  const [shoppingBagProducts, setShoppingBagProducts] = useState<
    PseudoCheckoutPackage[]
  >([]);
  const myCart = useCart((state) => state.cart);
  const { refetch: refetchCart } = useGetCheckoutCart();

  useMemo(() => {
    if (
      myCart &&
      myCart.products &&
      myCart.products.data &&
      myCart.products.data.length > 0
    ) {
      const parse_products_into_packages = [];
      const exist_seller_ids = new Set();
      const products = myCart.products.data;
      for (const product of products) {
        if (exist_seller_ids.has(product.seller_id)) {
          const exist_package = parse_products_into_packages.find(
            (i) => i.seller_id === product.seller_id
          );
          exist_package?.products.push(product);
        } else {
          parse_products_into_packages.push({
            seller_id: product.seller_id,
            products: [product],
            city: product.seller_info?.city,
          });
          exist_seller_ids.add(product.seller_id);
        }
      }
      setShoppingBagProducts(parse_products_into_packages);
    }
  }, [myCart]);

  const {
    mutate: applyPromoCode,
    isSuccess: applyPromoSuccess,
    isError: applyPromoError,
  } = useApplyPromoCode();

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
    <div className="lg:py-12 px-6 lg:px-12 w-full lg:w-480">
      <div className="w-full m-auto flex flex-col">
        {/*Aside nav*/}
        {myCart ? (
          <div className="aside-nav-wrap -mx-6 lg:mx-0 mb-8 lg:mb-0">
            {/*My account nav toggle mobile*/}
            <div className="account-nav-toggle-mobile bg-green text-white lg:hidden">
              <a
                className={`font-helveticaNeue500 uppercase text-white py-4 px-6 block relative before:absolute before:top-2/4 before:right-4 before:-translate-y-2/4 before:w-4 before:h-4 before:bg-100% cursor-pointer ${
                  showMobileViewOrder ? "before:bg-close" : "before:bg-plus"
                }`}
                onClick={toggleMobileViewOrder}
              >
                View order (£{myCart.total})
              </a>
            </div>
            {/*./My account nav toggle mobile*/}
            <div
              id="checkout-cart"
              className={`inner bg-lightGrey lg:block px-6 lg:px-0 pt-6 lg:pt-0 ${
                showMobileViewOrder ? "" : "hidden"
              }`}
            >
              <h3 className="font-helveticaNeue400 text-lg mb-6 md:mb-8">
                Order summary
              </h3>
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
                      className={`text-sm p-1 pr-0 text-right ${
                        myCart.coupon &&
                        myCart.coupon.data.code &&
                        (myCart.products_discount || myCart.shipping_discount)
                          ? ""
                          : "pb-8"
                      }`}
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
                        -£
                        {myCart.products_discount ||
                          0 + (myCart.shipping_discount || 0)}
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
                <div className="pl-4 text-sm flex-1">
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
              </form>
              {/* <div className="mb-8">
                <label className="label uppercase font-helveticaNeue500 text-sm mb-2 block">
                  Promocode
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="font-helveticaNeue400 border border-mgrey h-12 block outline-0 w-full text-sm px-4 text-dark rounded-none mr-2"
                    placeholder="Enter your promocode"
                  />
                  <button className="font-helveticaNeue500 text-center px-3 py-4 transition-all bg-grey uppercase text-xs hover:opacity-80 tracking-widest">
                    SUbmit
                  </button>
                </div>
                <span className="input-response text-mgrey mt-2 text-sm block"></span>
              </div> */}
              {/*./Promo code*/}
              <h3 className="font-helveticaNeue400 text-lg mb-6 md:mb-8 mt-8">
                Your shopping bag
              </h3>
              {/*Line*/}
              <div className="mt-8">
                <hr className="border-t-grey my-8" />
              </div>
              {/*./Line*/}
              {shoppingBagProducts && shoppingBagProducts.length > 0
                ? shoppingBagProducts.map(
                    (checkout_package: PseudoCheckoutPackage, index) => {
                      return (
                        <span key={index}>
                          <div className="flex flex-wrap mb-4">
                            <div className="w-full">
                              <span className="font-helveticaNeue400 text-sm">
                                Package {index + 1} of{" "}
                                {shoppingBagProducts.length}
                              </span>
                            </div>
                            <div className="w-full">
                              <span className="font-helveticaNeue500 text-sm">
                                Shipping from:{" "}
                                <span className="text-sm capitalize">
                                  {
                                    checkout_package.products[0].seller_info
                                      ?.city
                                  }
                                </span>
                              </span>
                            </div>
                          </div>
                          {checkout_package.products.map(
                            (product, i: number) => {
                              return (
                                <div className="bg-white mb-4" key={i}>
                                  <div className="product-popup flex w-full text-left py-4 px-2">
                                    <div className="thumb w-100 relative">
                                      <Image
                                        loader={reflauntLoader}
                                        objectFit="contain"
                                        className="w-full"
                                        src={product.medium_image_path}
                                        alt=""
                                        layout="fill"
                                      />
                                    </div>
                                    <div className="info flex-1 text-sm pl-4">
                                      <div className="flex flex-wrap justify-between px-2">
                                        <div className="w-full md:w-auto">
                                          <h3 className="font-helveticaNeue500 uppercase mb-1">
                                            {product.name}
                                          </h3>
                                          <p className="mb-2">
                                            <Price
                                              price={
                                                product.checkout_product.data
                                                  .selling_price
                                              }
                                            />
                                          </p>
                                          <p className="mb-2">
                                            SIZE: {product.size_name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                          {index < shoppingBagProducts.length - 1 && (
                            <div className="mt-9">
                              <hr className="border-t-grey my-8" />
                            </div>
                          )}
                        </span>
                      );
                    }
                  )
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
        {/*Aside nav*/}
      </div>
    </div>
  );
};

export default CheckoutOrderInfoCheckoutOrderInfo;
