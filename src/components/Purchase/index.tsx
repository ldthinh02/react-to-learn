import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { ORDER_PACKAGE_STATUS, ORDER_STATUS } from "@/utils/constants";
import {
  getExpired,
  getOrderProductStatus,
  getOrderStatus,
  getOrderTaxTotal,
} from "@/utils/index";
import Link from "next/link";
import Price from "@/components/Price";
import { reflauntLoader } from "@/utils/imageLoader";
import { useChatBox } from "@/hooks/useChatBox";
import { useGetConversation } from "@/hooks/useGetConversation";
import Rating from "@/components/Rating";
import { getSlug } from "@/utils/file";

interface Purchase {
  order: OrderApiData;
  orderPackages: OrderPackage[];
  refetchOrders: () => void;
}

const Purchase = ({ order, orderPackages, refetchOrders }: Purchase) => {
  const { chatData, setChatData } = useChatBox();
  const [active, setActive] = useState(false);
  const activePanel = () => {
    setActive(!active);
  };
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const { mutate: getConversation } = useGetConversation();

  const messageSeller = (
    orderProduct: OrderProduct,
    orderPackage: OrderPackage
  ) => {
    const product = orderProduct.product.data as ProductApiData;
    getConversation(
      { productId: product.id, customerId: order.user_id },
      {
        onSuccess: (data) => {
          setChatData(getDataChat(product, orderPackage.id, data));
        },
        onError: () => {
          setChatData(getDataChat(product, orderPackage.id));
        },
      }
    );
  };

  const getDataChat = (
    product: ProductApiData,
    order_package_id: number,
    conversation?: ConversationApiData
  ) => {
    const data: OrderDetailChatBox = {
      order_id: String(order.order_id),
      order_package_id: order_package_id,
      user: {
        first_name: product.user.data.customer.data.first_name,
        nickname: product.user.data.customer.data.nickname,
      },
    };
    return {
      ...chatData,
      product: product,
      conversation: conversation || ({} as ConversationApiData),
      customer: product.user?.data?.customer?.data,
      buyer_id: order.user_id,
      order: data,
      is_buyer: true,
    };
  };

  const isExpired = () => {
    return getExpired(order.created_at) > 4;
  };

  useEffect(() => {
    setNumberOfProducts(
      order.order_packages.data.map((op) => op.order_products.data).flat()
        .length
    );
  }, []);

  return (
    <div className="accordion-single type-2 border border-grey px-4 mb-4">
      <div
        className={`accordion before:w-4 before:h-4 before:rotate-180 before:bg-no-repeat before:bg-center before:bg-100% before:absolute before:top-2/4 before:right-0 before:-mt-[3px] before:transition-all  py-4 font-helveticaNeue500 pr-8 w-full text-left relative flex cursor-pointer ${
          active ? "before:bg-minus" : "before:bg-plus-dark"
        }`}
        onClick={activePanel}
      >
        <div className="w-2/4">
          <h3 className="font-helveticaNeue500 text-sm uppercase text-dark mb-2">
            Order {order.order_index}
          </h3>
          <p className="text-grey2 text-sm">
            {dayjs(order.created_at).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="w-2/4 pl-2">
          <h3 className="font-helveticaNeue500 text-sm uppercase text-dark mb-2">
            Status
          </h3>
          <p className="text-grey2 text-sm capitalize">
            {isExpired() && order.status === ORDER_STATUS.CANCELLED
              ? "CANCELLED"
              : getOrderStatus(
                  order.order_packages.data
                    .map((op) => op.order_products.data)
                    .flat()
                )}
          </p>
        </div>
      </div>
      <div
        className={`panel overflow-hidden transition-all duration-200 ease-out ${
          active ? "max-h-[2800px]" : "max-h-0"
        }`}
      >
        <div className="content pt-8 pb-8 text-sm border-t border-t-grey">
          <h3 className="font-helveticaNeue400 text-lg mb-8">Order Summary</h3>
          <table className="table w-full summary-table">
            <tbody>
              <tr>
                <td className="text-sm p-1 pl-0">Number of items</td>
                <td className="text-sm p-1 pr-0 text-right">
                  {numberOfProducts}
                </td>
              </tr>
              <tr>
                <td className="text-sm p-1 pl-0">Order value</td>
                <td className="text-sm p-1 pr-0 text-right">
                  {/* {order.currency.data.symbol} */}
                  <Price price={order.sub_total} />
                </td>
              </tr>
              <tr>
                <td className="text-sm p-1 pl-0">Shipping</td>
                <td className="text-sm p-1 pr-0 text-right">
                  {/* {order.currency.data.symbol} */}
                  <Price price={order.shipping_fee} />
                </td>
              </tr>
              <tr>
                <td className="text-sm p-1 pl-0 pb-8">Tax</td>
                <td className="text-sm p-1 pr-0 text-right pb-8">
                  {/* {order.currency.data.symbol} */}
                  <Price
                    price={getOrderTaxTotal(
                      order.order_packages.data
                        .map((op) => op.order_products.data)
                        .flat()
                    )}
                  />
                </td>
              </tr>
            </tbody>
            <tfoot className="">
              <tr>
                <td className="font-helveticaNeue500 text-sm p-1 pl-0 ">
                  TOTAL
                </td>
                <td className="font-helveticaNeue500 text-sm p-1 pr-0 text-right ">
                  <Price price={order.total} />
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="my-8">
            <hr className="border-t-grey my-8" />
          </div>
          <h3 className="font-helveticaNeue400 text-lg mb-8">Order contents</h3>
          {orderPackages.length > 0 &&
            orderPackages.map((orderPackage, index) => {
              return (
                <div key={index} className="border border-grey">
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full flex bg-grey1 p-3 font-helveticaNeue500">
                      <div className="w-full md:w-2/4">
                        <span className="text-sm">
                          Package {index + 1} of {orderPackages.length}
                        </span>
                      </div>
                      <div className="w-full md:w-2/4 md:text-right">
                        <span className="text-sm uppercase">
                          {orderPackage.user?.data.customer.data.nickname},{" "}
                          {
                            orderPackage.user?.data.customer.data.addresses
                              .data[0].city
                          }
                        </span>
                      </div>
                    </div>
                    {!orderPackage.tracking_number && (
                      <div className="font-helveticaNeue500 text-lg p-6 border-b border-grey w-full pb-12">
                        {(!isExpired() &&
                          order.status !== ORDER_STATUS.CANCELLED) ||
                        order.status !== ORDER_STATUS.CANCELLED ? (
                          <>
                            Pending shipment
                            <p className="font-helveticaNeue400 text-sm flex justify-between">
                              Hang tight! The seller has not yet confirmed the
                              shipment of your item
                            </p>
                          </>
                        ) : (
                          <>
                            Cancelled
                            <p className="font-helveticaNeue400 text-sm flex justify-between">
                              Unfortunately the sale was cancelled as the seller
                              did not ship their item(s) on time.
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    {orderPackage.tracking_number &&
                      orderPackage.status === ORDER_PACKAGE_STATUS.PENDING && (
                        <div className="font-helveticaNeue500 text-lg p-6 border-b border-grey w-full pb-12">
                          Package in transit
                          <p className="font-helveticaNeue400 text-sm flex justify-between">
                            The seller has shipped your item
                            <Link href={orderPackage.tracking_status_url}>
                              <a
                                target="_blank"
                                className="uppercase underline font-helveticaNeue500"
                              >
                                track package
                              </a>
                            </Link>
                          </p>
                        </div>
                      )}
                    {orderPackage.tracking_number &&
                      orderPackage.status ===
                        ORDER_PACKAGE_STATUS.DELIVERED && (
                        <div className="font-helveticaNeue500 text-lg p-6 border-b border-grey w-full pb-12">
                          Package delivered
                          <p className="font-helveticaNeue400 text-sm flex justify-between">
                            <span className="md:w-1/2">
                              Your order has been delivered. We hope {"you'll"}{" "}
                              love your new item(s)! <br /> <br />
                              If you have any issues with your order please
                              contact us within the next 48 hours. After that
                              time, we will consider the order completed.
                            </span>
                            <Link href={`/report-an-issue/${orderPackage.id}`}>
                              <a className="uppercase underline font-helveticaNeue500">
                                Get in touch about your package
                              </a>
                            </Link>
                          </p>
                        </div>
                      )}
                    {orderPackage.tracking_number &&
                      orderPackage.status === ORDER_PACKAGE_STATUS.SHIPPED && (
                        <div className="font-helveticaNeue500 text-lg p-6 border-b border-grey w-full pb-12">
                          Package is shipped
                          <p className="font-helveticaNeue400 text-sm flex justify-between">
                            The seller has shipped your item
                            <Link href={orderPackage.tracking_status_url}>
                              <a
                                target="_blank"
                                className="uppercase underline font-helveticaNeue500"
                              >
                                track package
                              </a>
                            </Link>
                          </p>
                        </div>
                      )}
                    {orderPackage.tracking_number &&
                      (orderPackage.status ===
                        ORDER_PACKAGE_STATUS.MANUAL_CREATED ||
                        orderPackage.status ===
                          ORDER_PACKAGE_STATUS.COMPLETED) && (
                        <div className="font-helveticaNeue500 text-lg p-6 border-b border-grey w-full pb-12">
                          Completed
                          <p
                            className={`font-helveticaNeue400 text-sm md:flex md:justify-between`}
                          >
                            <span className="md:w-1/2">
                              Thank you for your order <br /> <br />
                              Please let us know how satisfied you are with your
                              purchase by rating the seller
                            </span>
                            <div className="mt-6 md:mt-0">
                              <p
                                className={`${
                                  orderPackage.rating
                                    ? "text-shocking_pink"
                                    : ""
                                } font-bold`}
                              >
                                {orderPackage.rating
                                  ? "Thank you for your feedback!"
                                  : "Rate your experience"}
                              </p>
                              <Rating
                                rate={
                                  orderPackage.rating ? orderPackage.rating : 0
                                }
                                size={24}
                                data={{
                                  order_id: order.id.toString(),
                                  seller_id: orderPackage.seller_id.toString(),
                                }}
                                onChange={refetchOrders}
                                isHiddenTotal
                              />
                            </div>
                          </p>
                        </div>
                      )}
                  </div>
                  {orderPackage.order_products.data.map((orderProduct) => {
                    return (
                      <div
                        className="bg-white mb-4"
                        key={`product-${orderProduct.product.data.id}`}
                      >
                        <div className="product-popup flex w-full text-left py-4 px-2 space-y-6">
                          <div className="thumb w-100">
                            <Link
                              href={`/product/${getSlug(
                                String(orderProduct.product.data.name),
                                Number(orderProduct.product.data.id)
                              )}`}
                            >
                              <a>
                                <Image
                                  width={100}
                                  height={120}
                                  className="w-full"
                                  loader={reflauntLoader}
                                  src={
                                    orderProduct.product.data.media
                                      ? orderProduct.product.data.media.data[0]
                                          .medium_image_path
                                      : "/assets/images/Product_Image_thumb.jpg"
                                  }
                                  alt=""
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="info md:flex flex-1 text-sm pl-4 justify-between !mt-0">
                            <div>
                              <h3 className="font-helveticaNeue500 uppercase mb-1">
                                {orderProduct.product.data.name}
                              </h3>
                              <p className="mb-2">
                                <Price
                                  price={
                                    orderProduct.product.data
                                      .base_currency_price
                                  }
                                />
                              </p>
                              {orderProduct.product.data.size?.data.name && (
                                <p className="mb-2">
                                  SIZE:{" "}
                                  {orderProduct.product.data.size.data.name}
                                </p>
                              )}
                              <br />
                              <p className="font-helveticaNeue500 capitalize">
                                Status:{" "}
                                {!isExpired() &&
                                order.status !== ORDER_STATUS.CANCELLED
                                  ? getOrderProductStatus(orderProduct.status)
                                  : "Cancelled"}
                              </p>
                            </div>
                            <div className="pt-3 md:pt-0">
                              <a
                                onClick={() =>
                                  messageSeller(orderProduct, orderPackage)
                                }
                                className="uppercase underline font-helveticaNeue500 cursor-pointer"
                              >
                                Message seller
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="my-8">
                          <hr className="border-t-grey my-8" />
                        </div>
                      </div>
                    );
                  })}
                  {orderPackage.tracking_status_url && (
                    <div className="">
                      <Link href={orderPackage.tracking_status_url}>
                        <a
                          className="w-full inline-block py-[18px] text-xs text-center tracking-[1px] font-helveticaNeue500 uppercase border border-black"
                          target="_blank"
                        >
                          Track package
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
