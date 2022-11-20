import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetProductByOrderProduct } from "@/hooks/useGetProductByOrderProduct";
import { useCreateGiftCard } from "@/hooks/useCreateGiftCard";
import ErrorMessage from "@/components/ErrorMessage";
import HeaderSeo from "@/components/HeaderSeo";
import { round } from "@/utils/index";

const ReceivePayment = () => {
  const router = useRouter();
  const { order_product, token, seller_email } = router.query;

  const { data: data } = useGetProductByOrderProduct(
    order_product ? Number(order_product) : 0,
    ""
  );
  const calculateBankAmount = (currencyCode: string) => {
    if (!data) {
      return null;
    }
    return round(data.data.calculated_payout_amount, {
      code: currencyCode,
    } as Currency);
  };

  const calculateVoucherAmount = (currencyCode: string) => {
    if (!data) {
      return null;
    }
    return ["DKK", "NOK", "SEK"].includes(currencyCode)
      ? Math.round(data.data.calculated_payout_amount * 1.2)
      : Math.ceil(data.data.calculated_payout_amount * 1.2 * 2) / 2;
  };

  const {
    mutateAsync: createGiftCard,
    isError: isCreateGiftCardError,
    error: createGiftCardError,
    isLoading: isCreateLoading,
  } = useCreateGiftCard();

  useEffect(() => {
    if (data && (data.type === "voucher" || data.type === "bank"))
      pushRouter("bank-confirmed");
  }, [data]);

  const redirect = async (type: string) => {
    if (type === "cash") {
      pushRouter("bank-transfer");
    }
    if (type === "gift-card") {
      await createGiftCard({
        order_product_id: String(order_product),
      });
      pushRouter("gift-card");
    }
  };

  const pushRouter = (url: string) => {
    router.push({
      pathname: `/receive-payment/${url}`,
      query: {
        token: token,
        order_product: order_product,
        seller_email: seller_email,
      },
    });
  };

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Receive Payment"
        description="GanniRepeat - Receive Payment"
      />

      {/* Receive_Payment_D */}
      <div className="pb-20 pt-20">
        <div className="container text-center m-auto px-4">
          <div className="text-center mb-8">
            <Image
              className="inline-block w-24"
              src="/assets/images/Payout.svg"
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <h2 className="font-helveticaNeue500 text-pink uppercase text-4xl mb-6">
            Receive your payment!
          </h2>
          {data && data.type === "product" && (
            <>
              <p className="text-sm mb-6">
                Time to choose your reward - cash or a GANNI gift card to spend
                on www.ganni.com? your item.
              </p>
              <p className="text-sm mb-12">
                Choosing the gift card earns you an extra 20% in value.{" "}
              </p>
              <div className="w-full lg:w-420 m-auto">
                <p
                  onClick={() => redirect("gift-card")}
                  className="cursor-pointer"
                >
                  <a className="font-helveticaNeue500 text-2xl text-center px-3 py-4 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white flex items-center justify-center mb-4 uppercase">
                    {isCreateLoading
                      ? "loading..."
                      : `${
                          (data.data.currency as Currency).symbol
                        }${calculateVoucherAmount(
                          (data.data.currency as Currency).code
                        )} GANNI GIFT CARD`}
                  </a>
                  {isCreateGiftCardError && (
                    <ErrorMessage
                      message={(createGiftCardError as Error).message}
                    ></ErrorMessage>
                  )}
                </p>
                <p onClick={() => redirect("cash")} className="cursor-pointer">
                  <a className="font-helveticaNeue500 text-2xl text-center px-3 py-4 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white flex items-center justify-center uppercase">
                    {(data.data.currency as Currency).symbol}
                    {calculateBankAmount(
                      (data.data.currency as Currency).code
                    )}{" "}
                    bank transfer
                  </a>
                </p>
              </div>
            </>
          )}
          {data && data.type !== "product" && (
            <>
              <p className="text-sm mb-6">
                Time to choose your reward - cash or a GANNI gift card to spend
                on www.ganni.com? your item.
              </p>
              <p className="text-sm mb-12">
                Choosing the gift card earns you an extra 20% in value.{" "}
              </p>
              {data.type === "bank" && (
                <p className="text-sm mb-12">
                  This payment was be received by cash.
                </p>
              )}
              {data.type === "voucher" && (
                <p className="text-sm mb-12">
                  This payment was be received by gift card.
                </p>
              )}
            </>
          )}
        </div>
      </div>
      {/* ./Receive_Payment_D */}
    </div>
  );
};

export default ReceivePayment;
