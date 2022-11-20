import React from "react";
import Image from "next/image";

interface CheckCurrencyPaymentModal {
  toggleCheckCurrencyPaymentModal: () => void;
  active: boolean;
  error?: ErrorCurrency;
  continuePayment: () => void;
}

export const CheckCurrencyPaymentModal = ({
  error,
  toggleCheckCurrencyPaymentModal,
  active,
  continuePayment,
}: CheckCurrencyPaymentModal) => {
  return (
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative my-6 mx-auto w-11/12 md:w-540">
        <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-end px-4 py-4">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={toggleCheckCurrencyPaymentModal}
            >
              <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                <Image src="/assets/images/close.svg" alt="" layout="fill" />
              </span>
            </button>
          </div>
          <div className="relative flex-auto pb-16 px-6 md:px-9">
            <div className="text-center text-sm">
              <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4 text-center">
                The currency of your listing and your bank account do not match
              </h3>
              <p>
                You selected the currency of {error?.currency_1} for your
                listing. However, you selected the currency {error?.currency_2}{" "}
                for your bank account. <br />
                Please modify the currency of your bank details. If you don’t
                have a bank account in the matching currency, your bank may
                charge you a conversion fee when receiving your payment.
              </p>
              <div className="flex flex-wrap -mx-2 mt-[48px]">
                <div className="w-full px-2 mb-3">
                  <div>
                    <button
                      type="submit"
                      className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                      onClick={toggleCheckCurrencyPaymentModal}
                    >
                      Edit bank details
                    </button>
                  </div>
                </div>
                <div className="w-full px-2">
                  <div>
                    <button
                      type="submit"
                      className="text-center px-3 transition-all border border-dark inline-block  text-dark bg-white hover:border-white hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4"
                      onClick={continuePayment}
                    >
                      Continue with currency
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckCurrencyPaymentModal;
