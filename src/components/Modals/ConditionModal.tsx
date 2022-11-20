import React from "react";
import Image from "next/image";

interface ConditionModal {
  toggleConditionModal: () => void;
  active: boolean;
}

export const ConditionModal = ({
  toggleConditionModal,
  active,
}: ConditionModal) => (
  <>
    {/*Condition modal*/}
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative my-6 mx-auto w-11/12 md:w-420">
        {/*content*/}
        <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-end px-4 py-4">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={toggleConditionModal}
            >
              <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                <Image src="/assets/images/close.svg" alt="" layout="fill" />
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative flex-auto pb-16 px-6">
            <div className="text-center text-sm">
              <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4">
                condition guide
              </h3>
              <h4 className="font-helveticaNeue500 text-sm uppercase mb-1 mt-4">
                Never worn
              </h4>
              <p>The item has never been used or worn, much like brand new.</p>
              <h4 className="font-helveticaNeue500 text-sm uppercase mb-1 mt-4">
                EXCELLENT
              </h4>
              <p>
                The item has barely been used or worn and has minimal signs of
                usage.
              </p>
              <h4 className="font-helveticaNeue500 text-sm uppercase mb-1 mt-4">
                VERY GOOD
              </h4>
              <p>
                The item has been used or worn and has some visible signs of
                wear.
              </p>
              <h4 className="font-helveticaNeue500 text-sm uppercase mb-1 mt-4">
                GOOD
              </h4>
              <p>The item has been used or worn and shows signs of wear.</p>
              <h4 className="font-helveticaNeue500 text-sm uppercase mb-1 mt-4">
                Moderate
              </h4>
              <p>The item has obvious signs of wear.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*./Condition modal*/}
  </>
);

export default ConditionModal;
