import React from "react";
import Image from "next/image";
import Price from "@/components/Price";
import { reflauntLoader } from "@/utils/imageLoader";
import { useCartConfirmed } from "@/hooks/useCartConfirmed";

interface CheckoutOrderConfirmedInfo {
  showMobileViewOrder: boolean;
  toggleMobileViewOrder: () => void;
}

export const CheckoutOrderConfirmedInfo = ({
  showMobileViewOrder,
  toggleMobileViewOrder,
}: CheckoutOrderConfirmedInfo) => {
  const { cartConfirmed } = useCartConfirmed();
  return (
    <div className="lg:py-12 px-6 lg:px-12 w-full lg:w-480">
      <div className="w-full m-auto flex flex-col">
        {/*Aside nav*/}
        {cartConfirmed ? (
          <div className="aside-nav-wrap -mx-6 lg:mx-0 mb-8 lg:mb-0">
            {/*My account nav toggle mobile*/}
            <div className="account-nav-toggle-mobile bg-green text-white lg:hidden">
              <a
                className={`font-helveticaNeue500 uppercase text-white py-4 px-6 block relative before:absolute before:top-2/4 before:right-4 before:-translate-y-2/4 before:w-4 before:h-4 before:bg-100% cursor-pointer ${
                  showMobileViewOrder ? "before:bg-close" : "before:bg-plus"
                }`}
                onClick={toggleMobileViewOrder}
              >
                View order (<Price price={Number(cartConfirmed.total)} />)
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
                      <Price price={Number(cartConfirmed.sub_total)} />
                    </td>
                  </tr>
                  <tr>
                    <td className={`text-sm p-1 pl-0`}>Shipping</td>
                    <td className={`text-sm p-1 pr-0 text-right`}>
                      <Price price={Number(cartConfirmed.shipping_rate)} />
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`text-sm p-1 pl-0 ${
                        cartConfirmed.coupon &&
                        cartConfirmed.coupon.data.code &&
                        (cartConfirmed.products_discount ||
                          cartConfirmed.shipping_discount)
                          ? ""
                          : "pb-8"
                      }`}
                    >
                      Tax
                    </td>
                    <td
                      className={`text-sm p-1 pr-0 text-right ${
                        cartConfirmed.coupon &&
                        cartConfirmed.coupon.data.code &&
                        (cartConfirmed.products_discount ||
                          cartConfirmed.shipping_discount)
                          ? ""
                          : "pb-8"
                      }`}
                    >
                      <Price price={Number(cartConfirmed.tax_total)} />
                    </td>
                  </tr>
                  {cartConfirmed.coupon &&
                  cartConfirmed.coupon.data.code &&
                  (cartConfirmed.products_discount ||
                    cartConfirmed.shipping_discount) ? (
                    <tr className="text-shocking_pink">
                      <td className="text-sm p-1 pl-0 pb-8">
                        Promocode {cartConfirmed.coupon.data.code}
                      </td>
                      <td className="text-sm p-1 pr-0 pb-8 text-right">
                        -£
                        {cartConfirmed.products_discount ||
                          0 + (cartConfirmed.shipping_discount || 0)}
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
                      <Price price={Number(cartConfirmed.total)} />
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
              <h3 className="font-helveticaNeue400 text-lg mb-6 md:mb-8 mt-8">
                Your shopping bag
              </h3>
              {/*Line*/}
              <div className="mt-8">
                <hr className="border-t-grey my-8" />
              </div>
              {/*./Line*/}
              {cartConfirmed &&
              cartConfirmed.checkout_packages &&
              cartConfirmed.checkout_packages.data &&
              cartConfirmed.checkout_packages.data.length > 0
                ? cartConfirmed.checkout_packages.data.map(
                    (checkout_package, index) => {
                      return (
                        <span key={index}>
                          <div className="flex flex-wrap mb-4">
                            <div className="w-full">
                              <span className="font-helveticaNeue400 text-sm">
                                Package {index + 1} of{" "}
                                {cartConfirmed.checkout_packages?.data.length}
                              </span>
                            </div>
                            <div className="w-full">
                              <span className="font-helveticaNeue500 text-sm">
                                Shipping from:{" "}
                                {checkout_package.products[0].seller_info?.city}
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
                                                product.base_currency_price
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

export default CheckoutOrderConfirmedInfo;
