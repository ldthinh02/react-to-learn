import React, { useState } from "react";
import Image from "next/image";
import {
  useCreateNewOffer,
  useGetMyOffers,
  useUpdateOffer,
} from "@/hooks/useOffer";
import { useFormik } from "formik";
import InputFormik from "@/components/InputFormik";
import { reflauntLoader } from "@/utils/imageLoader";
import Price from "@/components/Price";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import ErrorMessage from "../ErrorMessage";

interface MakeAnOfferModal {
  toggleMakeAnOfferModal: () => void;
  active: boolean;
  productDetail?: ProductApiData;
  counterOffer?: boolean;
  offer?: Offer;
}

export const MakeAnOfferModal = ({
  toggleMakeAnOfferModal,
  active,
  productDetail,
  counterOffer,
  offer,
}: MakeAnOfferModal) => {
  const [offerErrorMessage, setOfferErrorMessage] = useState("");

  const { data: myProfile } = useGetMyProfile();
  const {
    mutate: createNewOffer,
    isLoading: createNewOfferLoading,
    isSuccess: createNewOfferSuccess,
    error: createNewOfferError,
  } = useCreateNewOffer();
  const {
    mutate: updateOffer,
    error: updateOfferError,
    isLoading: updateOfferLoading,
    isSuccess: updateOfferSuccess,
  } = useUpdateOffer();
  const { refetch: refetchMyOffers } = useGetMyOffers();

  const currentBrowserCurrencyState = useBrowserCurrency(
    (state) => state.browserCurrency
  );

  const checkOfferAmount = async (rate: number) => {
    const base_currency_offer = Math.floor(
      offerFormik.values.initial_amount / rate
    );

    if (!productDetail || !productDetail.base_currency_price) {
      setOfferErrorMessage("Unable to make an offer: currency");
      return false;
    }

    if (!counterOffer) {
      const min_price = Math.ceil(productDetail.base_currency_price) * 0.8;
      if (base_currency_offer < Math.ceil(min_price)) {
        setOfferErrorMessage(
          "Offer must be no less than 80% of the asking price"
        );
        return false;
      }
    }

    if (
      counterOffer &&
      offer &&
      offer.buyer_username === myProfile?.customer.data.nickname
    ) {
      const min_price = offer.buyer_prev_offer ? offer.buyer_prev_offer : 0;
      const max_price = offer.amount;
      if (base_currency_offer <= Math.ceil(min_price)) {
        setOfferErrorMessage(
          "Counter offer must be higher than the original offer"
        );
        return false;
      }
      if (base_currency_offer >= Math.ceil(max_price)) {
        setOfferErrorMessage(`Counter offer must be lower than seller's offer`);
        return false;
      }
    }

    if (
      counterOffer &&
      offer &&
      offer.seller_username === myProfile?.customer.data.nickname
    ) {
      const min_price = offer.buyer_prev_offer
        ? offer.buyer_prev_offer
        : offer.amount;
      if (base_currency_offer <= Math.ceil(min_price)) {
        setOfferErrorMessage(
          "Counter offer must be higher than the original offer"
        );
        return false;
      }
    }

    if (
      base_currency_offer >=
      Math.ceil(Math.ceil(productDetail.base_currency_price))
    ) {
      setOfferErrorMessage("Offer amount must be lower than original price");
      return false;
    }
    return base_currency_offer;
  };

  const offerFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      initial_amount: 0,
    },
    onSubmit: async () => {
      let rate;
      let selectedCurrency;
      if (
        currentBrowserCurrencyState &&
        currentBrowserCurrencyState.currencies
      ) {
        selectedCurrency = currentBrowserCurrencyState.currencies.find(
          (currency) => currency.code === currentBrowserCurrencyState.currency
        );
        rate = selectedCurrency?.rate || 1;
      } else {
        rate = 1;
      }
      const validOfferAmount = await checkOfferAmount(rate);
      if (!validOfferAmount) return;
      if (counterOffer && offer) {
        updateOffer(
          { offer_id: offer.id, status: "COUNTERED", amount: validOfferAmount },
          { onSuccess: () => refetchMyOffers() }
        );
        return;
      }
      if (productDetail && selectedCurrency) {
        createNewOffer({
          initial_amount: validOfferAmount,
          product_id: productDetail.id.toString(),
          currency_id: selectedCurrency.id,
        });
      }
    },
  });

  return (
    <>
      {/*MakeAnOffer modal*/}
      <div
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
          active ? "" : "hidden"
        }`}
        id="makeAnOffer-modal"
      >
        <div className="relative my-6 mx-auto w-11/12 md:w-420">
          {/*content*/}
          <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-end px-4 py-4">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={toggleMakeAnOfferModal}
              >
                <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none w-[20px] h-[20px] relative">
                  <Image src="/assets/images/close.svg" alt="" layout="fill" />
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto pb-16 px-6">
              <div className="text-center text-sm">
                <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4">
                  {counterOffer ? "COUNTER OFFER" : "Make an offer"}
                </h3>
                <p>
                  Your offer will be submitted to the{" "}
                  {counterOffer
                    ? myProfile &&
                      productDetail &&
                      myProfile.id == productDetail.seller_id
                      ? "seller"
                      : "buyer"
                    : "seller"}{" "}
                  and they will have 2 days to respond.
                </p>
                {/*Product*/}
                <div className="product-popup mt-8 mb-8 flex w-full text-left">
                  <div className="thumb w-100">
                    <a href="#">
                      {productDetail ? (
                        <Image
                          loader={reflauntLoader}
                          className="w-full"
                          src={productDetail.media.data[0].original_image}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      ) : (
                        ""
                      )}
                    </a>
                  </div>
                  <div className="info flex-1 text-sm pl-4">
                    <h3 className="font-helveticaNeue500 uppercase mb-1">
                      {productDetail?.name}
                    </h3>
                    {productDetail ? (
                      <p>
                        <Price price={productDetail.base_currency_price} />
                      </p>
                    ) : (
                      ""
                    )}
                    <br />
                    <p>SIZE: {productDetail?.size?.data.name}</p>
                  </div>
                </div>
                {/*./Product*/}

                {/*Form*/}
                <div className="text-left">
                  <form onSubmit={offerFormik.handleSubmit}>
                    <div className="mb-6">
                      <InputFormik
                        disabled={
                          createNewOfferSuccess || createNewOfferLoading
                        }
                        name="initial_amount"
                        label={
                          counterOffer ? "COUNTER OFFER AMOUNT" : "Offer amount"
                        }
                        onChange={offerFormik.handleChange}
                        value={offerFormik.values.initial_amount.toString()}
                        labelClasses="text-sm mb-2"
                        wraperClasses="grow mr-2"
                        isError={
                          offerFormik.touched.initial_amount &&
                          offerErrorMessage
                            ? true
                            : false
                        }
                      />

                      {offerErrorMessage &&
                        offerFormik.touched.initial_amount &&
                        !createNewOfferSuccess &&
                        !updateOfferSuccess && (
                          <div className="input-response text-[#DA0714] mt-1 text-xs">
                            {offerErrorMessage}
                          </div>
                        )}
                      {!createNewOfferLoading &&
                        !createNewOfferSuccess &&
                        createNewOfferError && (
                          <ErrorMessage
                            message={(createNewOfferError as Error).message}
                          ></ErrorMessage>
                        )}
                      {updateOfferError && (
                        <div className="pl-2">
                          <ErrorMessage
                            message={(updateOfferError as Error).message}
                          ></ErrorMessage>
                        </div>
                      )}
                    </div>
                    <div className="mb-0">
                      <button
                        disabled={
                          createNewOfferSuccess || createNewOfferLoading
                        }
                        type="submit"
                        className={`font-helveticaNeue500 text-center px-3 py-4 transition-all border ${
                          createNewOfferSuccess
                            ? "text-white bg-kelly_green border-kelly_green"
                            : "text-kelly_green border-kelly_green hover:border-kelly_green hover:text-white hover:bg-kelly_green"
                        } text-xs w-full tracking-widest uppercase`}
                      >
                        {createNewOfferLoading || updateOfferLoading
                          ? "Submitting"
                          : createNewOfferSuccess || updateOfferSuccess
                          ? "Submitted"
                          : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
                {/*./Form*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*./MakeAnOffer modal*/}
    </>
  );
};

export default MakeAnOfferModal;
