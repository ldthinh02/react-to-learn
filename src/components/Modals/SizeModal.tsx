import React, { useState } from "react";
import Image from "next/image";

const size_chart = {
  CLOTHING: [
    ["GANNI SIZE", "US", "UK", "IT", "AU", "KR", "JEANS"],
    ["EU 32 | XXS", 0, 4, 38, 4, 33, 24],
    ["EU 34 | XS", 2, 6, 40, 6, 44, "24-25"],
    ["EU 36 | S", 4, 8, 42, 8, 55, "26-27"],
    ["EU 38 | M", 6, 10, 44, 10, 66, "28-29"],
    ["EU 40 | L", "8/10", 12, 46, 12, 77, "30-31"],
    ["EU 42 | L", "10/12", 14, 48, 14, 88, "32"],
    ["EU 44 | XL", 14, 16, 50, 16, "EU 44"],
    ["EU 46 | 2XL", 16, 18, 52, 18, "EU 46"],
    ["EU 48 | 2XL", 18, 20, 56, 20, "EU 48"],
    ["EU 50 | 3XL", 20, 22, 58, 22, "EU 50"],
    ["EU 52 | 4XL", 22, 24, 60, 24, "EU 52"],
  ],
  SHOES: [
    ["EU", "US", "UK", "FR", "KR"],
    [35, 5, 2, 36, 220],
    [36, 6, 3, 37, 230],
    [37, 7, 4, 38, 240],
    [38, 8, 5, 39, 250],
    [39, 9, 6, 40, 260],
    [40, 10, 7, 41, 270],
    [41, 11, 8, 42, 280],
    [42, 12, 9, 43, 290],
    [43, 13, 10, 44, 300],
    [44, 14, 11, 45, 310],
  ],
};

interface SizeModal {
  toggleSizeModal: () => void;
  active: boolean;
  sizing_type: "CLOTHING" | "SHOES";
}

export const SizeModal = ({
  toggleSizeModal,
  active,
  sizing_type,
}: SizeModal) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showHowToMeasure, setShowHowToMeasure] = useState(false);

  const toggleSizeGuide = () => {
    setShowSizeGuide(!showSizeGuide);
  };

  const toggleHowToMeasure = () => {
    setShowHowToMeasure(!showHowToMeasure);
  };

  return (
    <>
      {/*Size guide modal*/}
      <div
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
          active ? "" : "hidden"
        }`}
      >
        <div className="relative my-6 mx-auto w-11/12 md:w-560">
          {/*content*/}
          <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-end px-4 py-4">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={toggleSizeModal}
              >
                <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                  <Image src="/assets/images/close.svg" alt="" layout="fill" />
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto pb-16 px-6">
              {/*Size guide*/}
              <div className="filter-single product-page-accordion mb-4 pt-4 border-b border-t border-grey">
                <h4
                  className={`font-helveticaNeue500 text-dark text-lg uppercase relative mb-4 pr-5 cursor-pointer before:w-3 before:h-1.5 before:bg-collapse-title before:bg-100% before:absolute before:top-2/4 before:right-[3px] before:-m-1 before:transition-all ${
                    showSizeGuide ? "" : "before:rotate-180"
                  }`}
                  onClick={toggleSizeGuide}
                >
                  Size guide
                </h4>
                <div
                  className={`font-helveticaNeue400 text-sm ${
                    showSizeGuide ? "" : "hidden"
                  }`}
                >
                  <p className="mb-6">
                    GANNI sizes are based on European sizing.
                  </p>
                  <p className="mb-6">
                    If you don&apos;t know your European size, the below charts
                    will help you match our sizes to your usual size.
                  </p>
                  <table className="table w-full text-center mb-4">
                    <thead>
                      <tr>
                        {size_chart[sizing_type][0].map((heading, index) => {
                          return (
                            <th
                              className={`font-helveticaNeue500 text-xs uppercase text-dark ${
                                sizing_type === "CLOTHING" && index === 0
                                  ? "text-left"
                                  : ""
                              }`}
                              key={index}
                            >
                              {heading}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {size_chart[sizing_type].map((body, body_index) => {
                        if (body_index === 0) return "";
                        return (
                          <tr key={body_index}>
                            {body.map((data, data_index) => {
                              return (
                                <td
                                  className={`${
                                    sizing_type === "CLOTHING" &&
                                    data_index === 0
                                      ? "w-[100px] text-left"
                                      : ""
                                  } `}
                                  key={data_index}
                                >
                                  {data}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/*./Size guide*/}
              {/*How to measure*/}
              <div className="filter-single product-page-accordion border-b border-grey">
                <h4
                  className={`font-helveticaNeue500 text-dark text-lg uppercase relative mb-4 pr-5 cursor-pointer before:w-3 before:h-1.5 before:bg-collapse-title before:bg-100% before:absolute before:top-2/4 before:right-[3px]  before:-m-1 before:transition-all ${
                    showHowToMeasure ? "" : "before:rotate-180"
                  }`}
                  onClick={toggleHowToMeasure}
                >
                  How to measure
                </h4>
                <div
                  className={`font-helveticaNeue400 text-sm ${
                    showHowToMeasure ? "" : "hidden"
                  }`}
                >
                  <p className="mb-6">
                    The below guidelines indicate how to get the measurements
                    listed in the product measurement&apos;s tab.
                  </p>

                  <p className="mb-6">
                    If you have any questions, please reach out to our customer
                    service team at customerservice@ganni.com.
                  </p>

                  <div className="mb-6 flex justify-between">
                    <div>
                      <p>A. Length</p>
                      <p>B. Shoulder</p>
                      <p>C. Sleeve</p>
                      <p>D. Bust</p>
                      <p>E. Waist</p>
                      <p>F. Rise</p>
                      <p>G. Hip</p>
                      <p>H. Inside Leg</p>
                      <p>J. Outside Leg</p>
                    </div>
                    <div>
                      <Image
                        src="/assets/images/image-detail.jpg"
                        alt="how-to-measure"
                        width={266}
                        height={300}
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*./How to measure*/}
            </div>
          </div>
        </div>
      </div>
      {/*./Size guide modal*/}
    </>
  );
};

export default SizeModal;
