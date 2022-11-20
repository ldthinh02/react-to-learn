import React from "react";
import Image from "next/image";
import { useRemoveProductListing } from "@/hooks/useRemoveProductListing";

interface CheckRemoveProductListingModal {
  toggleChangeStatus: () => void;
  active: boolean;
  sku: string;
  onRefetchData: () => void;
}

export const CheckRemoveProductListingModal = ({
  toggleChangeStatus,
  active,
  sku,
  onRefetchData,
}: CheckRemoveProductListingModal) => {
  const { mutate: removeProductListing } = useRemoveProductListing();
  const removeProduct = () => {
    removeProductListing(sku, {
      onSuccess: () => {
        onRefetchData();
        toggleChangeStatus();
      },
    });
  };
  return (
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative my-48 mx-auto w-11/12 md:w-420">
        <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-end px-4 py-4">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={toggleChangeStatus}
            >
              <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                <Image src="/assets/images/close.svg" alt="" layout="fill" />
              </span>
            </button>
          </div>
          <div className="relative flex-auto pb-16 px-6">
            <div className="text-center text-sm">
              <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4">
                Remove listing item
              </h3>
              <p>Do you want to remove this product from listing items</p>
              <div className="flex flex-wrap -mx-2 mt-[48px]">
                <div className="w-2/4 px-2">
                  <button
                    type="submit"
                    className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                    onClick={removeProduct}
                  >
                    Yes
                  </button>
                </div>
                <div className="w-2/4 px-2">
                  <button
                    type="submit"
                    className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                    onClick={toggleChangeStatus}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckRemoveProductListingModal;
