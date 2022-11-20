import {
  getExpired,
  getOrderPackageStatus,
  getPriceInEuro,
} from "@/utils/index";
import { ORDER_PACKAGE_STATUS, PROCESS_STATUS } from "@/utils/constants";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { reflauntLoader } from "@/utils/imageLoader";
import { useRouter } from "next/router";
import Price from "@/components/Price";
import { useChatBox } from "@/hooks/useChatBox";
import { useGetConversation } from "@/hooks/useGetConversation";
import { getSlug } from "@/utils/file";

interface SoldItem {
  packageData: OrderPackage;
  browserCurrency: BrowserCurrency;
}

const SoldItem = ({ packageData, browserCurrency }: SoldItem) => {
  const { chatData, setChatData } = useChatBox();
  const products: ProductApiData[] = packageData.products;
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { mutate: getConversation } = useGetConversation();

  const activePanel = () => {
    setActive(!active);
  };
  const receivePayment = (
    packageData: OrderPackage,
    product: ProductApiData
  ) => {
    const orderProduct = packageData.order_products.data.find(
      (e) => e.product_id === product.id
    );
    if (orderProduct && orderProduct.receive_payment_url) {
      router.push(orderProduct.receive_payment_url);
    }
  };

  const messageBuyer = () => {
    const product = packageData.products[0] as ProductApiData;
    getConversation(
      { productId: product.id, customerId: packageData.buyer.id },
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
    const order: OrderDetailChatBox = {
      order_id: packageData.buyer.order_id,
      order_package_id: packageData.id,
      user: {
        first_name: packageData.buyer.first_name,
        nickname: packageData.buyer.username,
      },
    };
    return {
      ...chatData,
      product: product,
      conversation: conversation || ({} as ConversationApiData),
      customer: product.user?.data?.customer?.data,
      buyer_id: packageData.buyer.id,
      order: order,
      is_buyer: false,
    };
  };

  const isExpired = () => {
    return (
      getExpired(packageData.created_at) > 4 &&
      packageData.status !== ORDER_PACKAGE_STATUS.SHIPPED
    );
  };

  return (
    <div className="accordion-single type-2 border border-grey px-4 mb-4">
      <div
        className={`${
          active ? "before:bg-minus" : "before:bg-plus-dark"
        } accordion before:w-4 before:h-4 before:rotate-180 before:bg-no-repeat before:bg-center before:bg-100% before:absolute before:top-2/4 before:right-0 before:-mt-[3px] before:transition-all  py-4 font-helveticaNeue500 pr-8 w-full text-left relative flex cursor-pointer`}
        onClick={activePanel}
      >
        <div className="w-2/4">
          <h3 className="font-helveticaNeue500 text-sm uppercase text-dark mb-2">
            Package {packageData.package_index}
          </h3>
          <p className="text-grey2 text-sm">
            {dayjs(packageData.created_at).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="w-2/4 pl-2">
          <h3 className="font-helveticaNeue500 text-sm uppercase text-dark mb-2">
            Status
          </h3>
          <p className="text-grey2 text-sm capitalize">
            {isExpired() ? "CANCELLED" : getOrderPackageStatus(packageData)}
          </p>
        </div>
      </div>
      <div
        className={`panel overflow-hidden transition-all duration-200 ease-out ${
          active ? "max-h-[2800px]" : "max-h-0"
        }`}
      >
        <div className="flex-1 w-full border-t border-grey pt-8 pb-8">
          <p className="mb-2">
            Sold on {dayjs(packageData.created_at).format("DD/MM/YYYY")} to{" "}
            <Link
              href={`/seller/${getSlug(
                packageData.buyer.first_name,
                packageData.buyer.id
              )}/selling`}
            >
              <a className="font-bold cursor-pointer">
                {packageData.buyer.username}
              </a>
            </Link>
          </p>
          {isExpired() && <p>Unfortunately your sale was cancelled</p>}
          {packageData.status === ORDER_PACKAGE_STATUS.PENDING && (
            <div className="md:flex justify-between">
              <p className="text-green">
                {packageData.tracking_number
                  ? "Your package's tracking number"
                  : "Please ship the item(s) and add the tracking number"}
              </p>
              <div className="text-right">
                {packageData.shipping_type === "free" ? (
                  <Link
                    href={`/shipping/tracking?order_package_id=${packageData.id}`}
                  >
                    <a className="font-helveticaNeue500 uppercase text-sm underline">
                      {packageData.tracking_number || "Add tracking number"}
                    </a>
                  </Link>
                ) : (
                  <Link
                    href={
                      packageData.generate_shipping_label_url ||
                      "/my-account/sold-items"
                    }
                  >
                    <a
                      className="font-helveticaNeue500 uppercase text-sm underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {packageData.tracking_number || "Generate shipping"}
                    </a>
                  </Link>
                )}
                <p
                  className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                  onClick={() => messageBuyer()}
                >
                  Message buyer
                </p>
              </div>
            </div>
          )}
          {packageData.status === ORDER_PACKAGE_STATUS.SHIPPED && (
            <div className="md:flex justify-between">
              <p className="text-green">
                Please ship your item using the pre-paid packing label
              </p>
              {packageData.shipping_type === "free" ? (
                <Link
                  href={`/shipping/tracking?order_package_id=${packageData.id}`}
                >
                  <a className="font-helveticaNeue500 uppercase text-sm underline">
                    {packageData.tracking_number || "Add tracking number"}
                  </a>
                </Link>
              ) : (
                <Link
                  href={
                    packageData.generate_shipping_label_url ||
                    "/my-account/sold-items"
                  }
                >
                  <a
                    className="font-helveticaNeue500 uppercase text-sm underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Print packing label
                  </a>
                </Link>
              )}
            </div>
          )}
          {(packageData.status === ORDER_PACKAGE_STATUS.DELIVERED ||
            packageData.status === ORDER_PACKAGE_STATUS.MANUAL_CREATED) &&
            products.filter(
              (p) =>
                p.process_status.data.name === PROCESS_STATUS.SOLD_CONFIRMED
            ).length === products.length && (
              <div className="md:flex justify-between">
                <p className="text-green">
                  Your sale is finalised! Please choose your preferred payment
                  option
                </p>
              </div>
            )}
          {(packageData.status === ORDER_PACKAGE_STATUS.DELIVERED ||
            packageData.status === ORDER_PACKAGE_STATUS.MANUAL_CREATED) &&
            products.filter(
              (p) => p.process_status.data.name === PROCESS_STATUS.PAYMENT_SENT
            ).length === products.length && (
              <div className="md:flex justify-between">
                <p className="text-grey2">Payment received</p>
              </div>
            )}
        </div>
        {products.length > 0 &&
          products.map((p, index) => {
            return (
              <div
                className="product-popup flex w-full text-left py-4 px-2 border-t border-grey"
                key={p.id}
              >
                <div className="thumb w-100">
                  <Link href={`/product/${getSlug(p.name, p.id)}`}>
                    <a>
                      <Image
                        className="w-full"
                        loader={reflauntLoader}
                        src={p.media.data[0].original_image}
                        alt=""
                        width={100}
                        height={120}
                      />
                    </a>
                  </Link>
                </div>
                <div className="info flex-1 text-sm pl-4 flex justify-between">
                  <div className="flex flex-wrap justify-between px-2">
                    <div className="w-full md:w-auto">
                      <h3 className="font-helveticaNeue500 uppercase mb-1">
                        {p.name}
                      </h3>
                      <p className="mb-2">
                        <Price price={p.base_currency_price} />
                      </p>
                      {p.size?.data?.name && (
                        <p className="mb-2">SIZE: {p.size.data.name}</p>
                      )}
                      {packageData.order_product_status[index] && (
                        <p className="mt-8 text-[14px] text-[#111111] capitalize">
                          {packageData.order_product_status[
                            index
                          ].toLowerCase()}
                        </p>
                      )}

                      {p.payment?.data.type === "SELLER" &&
                        (p.payment.data.max_amount > 0 ? (
                          <p>
                            <br />
                            <Price
                              price={getPriceInEuro(
                                p.calculated_payout_amount,
                                p.currency.data.code,
                                browserCurrency
                              )}
                            />{" "}
                            in bank transfer
                          </p>
                        ) : (
                          <p>
                            <br />
                            <Price
                              price={getPriceInEuro(
                                p.calculated_payout_amount +
                                  p.calculated_payout_amount * 0.2,
                                p.currency.data.code,
                                browserCurrency
                              )}
                            />{" "}
                            in Ganni gift card
                          </p>
                        ))}
                    </div>
                  </div>
                  {(packageData.status === ORDER_PACKAGE_STATUS.DELIVERED ||
                    packageData.status ===
                      ORDER_PACKAGE_STATUS.MANUAL_CREATED) &&
                    p.process_status.data.name ===
                      PROCESS_STATUS.SOLD_CONFIRMED && (
                      <a
                        onClick={() => receivePayment(packageData, p)}
                        className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                      >
                        Receive payment
                      </a>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SoldItem;
