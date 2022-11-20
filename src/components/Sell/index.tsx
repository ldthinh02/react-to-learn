import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useAddProduct } from "@/hooks/useProductHooks";
import HeaderSeo from "@/components/HeaderSeo";

interface SellData {
  children: React.ReactNode;
  title?: string;
}

const SellComponent = ({ children, title }: SellData) => {
  const { step } = useAddProduct();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const actions: string[] = ["Details", "Pictures", "Price", "Address"];

  return (
    <div className="m-auto z-0">
      <HeaderSeo
        title="Sell the Best of GANNI Pre-loved Fashion on GANNIREPEAT"
        description="Extend the life of your wardrobe and Give your Pre-Loved GANNI Iconic Pieces a new Lease of Life by Selling them on GANNIREPEAT."
      />

      <div className="w-full mt-3 flex flex-wrap lg:bg-lightGrey flex-row-reverse">
        <div
          className={`${
            showMenu ? "lg:w-[30%]" : "lg:w-[100px]"
          } md:float-right lg:pb-[56px] lg:px-[24px] w-full lg:min-h-screen lg:border-2 lg:border-green`}
        >
          <div className="w-full m-auto flex flex-col">
            <div className="-mx-[18px] sm:mx-0 lg:mx-0 lg:mb-0">
              <div
                className="bg-green text-white lg:hidden uppercase py-4 px-[18px]"
                onClick={() => setShowMenu(!showMenu)}
              >
                how to sell
                <div
                  className={`${
                    showMenu ? "rotate-45" : ""
                  } inline-block cursor-pointer float-right`}
                >
                  <Image
                    src="/assets/icons/plus-2.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div
                className={`${
                  showMenu ? "block" : "hidden"
                } lg:block bg-lightGrey px-[18px] lg:px-0 pt-6 lg:pt-0`}
              >
                <div className="pb-8 lg:pb-0">
                  <div
                    className={`text-center ${
                      showMenu ? "text-right pr-4" : "text-center"
                    } py-6 hidden lg:block`}
                  >
                    <div
                      className={`${
                        showMenu ? "rotate-45" : ""
                      } inline-block cursor-pointer`}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <Image
                        src="/assets/images/plus2.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      !showMenu ? "md:h-[150px]" : ""
                    } mt-[0px] mb-[48px]`}
                  >
                    <h3
                      className={`${
                        !showMenu
                          ? "rotate-90 text-[24px] leading-none mr-2"
                          : "text-xs"
                      } font-helveticaNeue500 hidden md:block ease-in uppercase text-green whitespace-nowrap`}
                    >
                      How to sell
                    </h3>
                    <h2
                      className={`${
                        showMenu ? "block" : "hidden"
                      } block pt-2 text-3xl text-green uppercase`}
                    >
                      RESELLING YOUR PRE-LOVED GANNI IS AS EASY AS 1,2,3
                    </h2>
                  </div>
                  <div
                    className={`${showMenu ? "hidden" : "block mb-[232px]"}`}
                  >
                    <div className="w-[48px] h-[48px] mb-[50px]">
                      <Image
                        className="w-full"
                        src="/assets/images/Label.svg"
                        alt=""
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="w-[48px] h-[48px] mb-[50px]">
                      <Image
                        className="w-full"
                        src="/assets/images/Package.svg"
                        alt=""
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="w-[48px] h-[48px]">
                      <Image
                        className="w-full"
                        src="/assets/images/Payout.svg"
                        alt=""
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <ul className={`${showMenu ? "block" : "hidden"} mb-12`}>
                    <li className="flex mb-6">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          className="w-full"
                          src="/assets/images/Label.svg"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div
                        className={`pl-[24px] flex-1 text-sm text-dark hide-on-collapse`}
                      >
                        <h3 className="uppercase">List your item</h3>
                        <p>
                          Tell us about your item including details of its
                          condition and photos, then upload the listing for sale
                          on GANNI REPEAT.
                        </p>
                      </div>
                    </li>
                    <li className="flex mb-6">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          className="w-full"
                          src="/assets/images/Package.svg"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div
                        className={`pl-[24px] flex-1 text-sm text-dark hide-on-collapse`}
                      >
                        <h3 className="uppercase">Ship your item for free</h3>
                        <p>
                          Once sold, ship your item for free using our pre-paid
                          shipping label. Alternatively, entice buyers with free
                          shipping.
                        </p>
                      </div>
                    </li>
                    <li className="flex mb-6">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          className="w-full"
                          src="/assets/images/Payout.svg"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div
                        className={`pl-[24px] flex-1 text-sm text-dark hide-on-collapse`}
                      >
                        <h3 className="uppercase">Choose payment</h3>
                        <p>
                          Choose to be paid in either cash or a GANNI gift card
                          with an extra 20% value.
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className={`${showMenu ? "block" : "hidden"}`}>
                    <div className="border-2 border-pink py-8 bg-white">
                      <div className="container m-auto px-4 xl2:max-w-screen-xl2">
                        <p className="text-pink uppercase text-xs mb-2">
                          Learn more
                        </p>
                        <h2 className="text-pink uppercase text-2xl xl:text-3xl">
                          Got a question? read our{" "}
                          <a
                            href="https://ganni-customerservice.zendesk.com/hc/en-us"
                            className="text-pink uppercase text-2xl xl:text-3xl underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            FAQs
                          </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            showMenu ? "lg:w-[70%]" : "lg:w-[90%]"
          } md:float-left bg-white py-6 lg:py-[48px] px-0 sm:px-6 lg:px-[80px] w-full lg:w-auto lg:flex-1`}
        >
          {title ? (
            <div className="mb-[48px]">
              <h2 className="text-2xl font-helveticaNeue500 uppercase text-center">
                {title}
              </h2>
              <div className="w-full flex justify-center item-center mt-[18px]">
                <div className="w-[660px] grid grid-cols-4 grid-rows-1">
                  {actions.map((action, index) => {
                    return (
                      <div key={action.toString()} className="w-full">
                        {index < step + 1 ? (
                          <Link href={`/sell/step-${index + 1}`}>
                            <a>
                              <div className="cursor-pointer">
                                <div className="w-full flex flex-col justify-center item-center">
                                  <Image
                                    src="/assets/icons/bg-active.svg"
                                    alt=""
                                    width={18}
                                    height={20}
                                  />
                                </div>
                                <div className="text-center text-[#2E9A60] mt-[8px]">
                                  {index + 1}. {action}
                                </div>
                              </div>
                            </a>
                          </Link>
                        ) : (
                          <div className="cursor-pointer">
                            <div className="w-full flex flex-col justify-center item-center">
                              <Image
                                src="/assets/icons/bg-default.svg"
                                alt=""
                                width={18}
                                height={20}
                              />
                            </div>
                            <div className="text-center text-[#C4C4C4] mt-[8px]">
                              {index + 1}. {action}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default SellComponent;
