import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CheckCurrencyModal {
  toggleCheckCurrencyModal: () => void;
  active: boolean;
  error?: ErrorCurrency;
  editListing?: boolean;
  from?: string;
}

export const CheckCurrencyModal = ({
  error,
  toggleCheckCurrencyModal,
  active,
  editListing,
  from,
}: CheckCurrencyModal) => {
  const router = useRouter();
  const editBankAccount = () => {
    toggleCheckCurrencyModal();
    if (from) router.push(`/my-account/bank-details?from=${from}`);
  };
  return (
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative my-6 mx-auto w-11/12 md:w-420">
        <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-end px-4 py-4">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={toggleCheckCurrencyModal}
            >
              <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                <Image src="/assets/images/close.svg" alt="" layout="fill" />
              </span>
            </button>
          </div>
          <div className="relative flex-auto pb-16 px-6">
            <div className="text-center text-sm">
              <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4">
                Currency mismatch between your listing and your bank details
              </h3>
              <p>
                You selected the currency {error?.currency_1} for your listing.
                However, you selected the currency {error?.currency_2} for your
                bank details. Please modify the currency of your listing or the
                currency of your bank details.
              </p>
              <div className="flex flex-wrap -mx-2 mt-[48px] mb-[40px]">
                <div className="w-2/4 px-2">
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                      onClick={() => {
                        toggleCheckCurrencyModal();
                        if (editListing) router.push("/sell/step-3");
                      }}
                    >
                      Edit listing
                    </button>
                  </div>
                </div>
                <div className="w-2/4 px-2">
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                      onClick={editBankAccount}
                    >
                      Edit bank details
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

export default CheckCurrencyModal;
