import React from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { reflauntLoader } from "@/utils/imageLoader";
import Price from "@/components/Price";
import { useRouter } from "next/router";
import { onEvent } from "@/utils/gtag";
interface AddToBagModal {
  toggleAddToBagModal: () => void;
  active: boolean;
}

export const AddToBagModal = ({
  toggleAddToBagModal,
  active,
}: AddToBagModal) => {
  const myCart = useCart((state) => state.cart);

  const router = useRouter();

  const navigateToCheckout = () => {
    if (
      myCart &&
      myCart.products &&
      myCart.products.data &&
      myCart.products.data.length > 0
    ) {
      onEvent("checkout_progress", {
        checkout_progress: {
          checkout_page: "/checkout/shopping-bag",
          items: myCart.products.data.map((prod) => {
            return {
              product_id: prod.id,
              product_name: prod.name,
              product_category: prod.categories[0].name,
              product_brand: prod.designer_name,
              product_price: prod.base_currency_price,
              product_size: prod.size_name,
              product_condition: prod.condition_name,
              product_color: prod.color_name,
              product_quantity: 1,
              list_position: 1,
            };
          }),
        },
      });
    }

    router.push("/checkout/shopping-bag");
  };

  return (
    <>
      {/*Added to bag modal*/}
      <div
        className={` overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
          active ? "" : "hidden"
        }`}
        id="addedToBag-modal"
      >
        <div className="relative my-6 mx-auto w-11/12 md:w-420">
          {/*content*/}
          <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-end px-4 py-4">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={toggleAddToBagModal}
              >
                <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                  <Image src="/assets/images/close.svg" alt="" layout="fill" />
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto pb-16 px-6">
              <div className="text-center text-sm">
                {myCart &&
                myCart.products &&
                myCart.products.data.length > 0 ? (
                  <>
                    <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4">
                      ADDED TO BAG
                    </h3>
                    {myCart.products.data.map(
                      (product: Product, index: number) => {
                        if (
                          !myCart ||
                          !myCart.products ||
                          index < myCart.products.data.length - 1
                        )
                          return "";
                        return (
                          <span key={index}>
                            <div className="product-popup mt-8 mb-8 flex w-full text-left">
                              <div className="thumb w-100">
                                <Image
                                  loader={reflauntLoader}
                                  className="w-full"
                                  objectFit="contain"
                                  src={product.medium_image_path}
                                  alt=""
                                  width="100%"
                                  height="100%"
                                />
                              </div>
                              <div className="info flex-1 text-sm pl-4">
                                <h3 className="font-helveticaNeue500 uppercase mb-1">
                                  {product.name}
                                </h3>
                                <p>
                                  <Price price={product.base_currency_price} />
                                </p>
                                <br />
                                <p>SIZE: {product.size_name}</p>
                              </div>
                            </div>
                          </span>
                        );
                      }
                    )}
                    {/*Table*/}
                    {/* TODO: comment first in case design changes again */}
                    {/* <table className="table text-sm w-full text-left table-added-to-bag">
                      <tbody>
                        <tr>
                          <td className="p-2 pl-0">Order value</td>
                          <td className="p-2 pr-0 text-right">
                            £{myCart.sub_total}
                          </td>
                        </tr>
                        <tr>
                          <td>Shipping</td>
                          <td className="p-2 pr-0 pb-[20px] text-right">
                            {myCart.shipping_rate > 0
                              ? myCart.shipping_rate
                              : "FREE"}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t border-t-grey font-helveticaNeue500">
                        <tr>
                          <td className="py-[20px] px-[5px]">TOTAL</td>
                          <td className="py-[20px] px-[5px] pr-0 text-right">
                            £{myCart.total}
                          </td>
                        </tr>
                      </tfoot>
                    </table> */}
                    {/*./Table*/}
                    <a
                      onClick={toggleAddToBagModal}
                      className="cursor-pointer font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full text-xs py-[18px] uppercase tracking-widest mb-4"
                    >
                      Continue Shopping
                    </a>
                    <a
                      onClick={navigateToCheckout}
                      className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block text-dark bg-white hover:border-dark hover:text-white hover:bg-dark w-full text-xs py-[18px] uppercase tracking-widest cursor-pointer"
                    >
                      Checkout
                    </a>
                  </>
                ) : (
                  "My bag is empty"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*./Added to bag modal*/}
    </>
  );
};

export default AddToBagModal;
