import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";

interface Footer {
  children?: React.ReactNode;
}

const Footer = ({ children }: Footer) => {
  const [showCurrency, setShowCurrency] = useState<boolean>(false);

  const currentBrowserCurrencyState = useBrowserCurrency(
    (state) => state.browserCurrency
  );
  const compileBrowserCurrency = useBrowserCurrency(
    (state) => state.setBrowserCurrency
  );

  const selectCurrency = (value: string) => {
    if (
      currentBrowserCurrencyState.currencies &&
      currentBrowserCurrencyState.currencies.length > 0
    ) {
      const currency = currentBrowserCurrencyState.currencies.find(
        (i: Currency) => i.code === value
      );
      if (currency) {
        compileBrowserCurrency({ currency: currency.code });
      }
      setShowCurrency(false);
    }
  };

  return (
    // <!-- Footer -->
    <footer id="site-footer" className="py-16 border border-t-dark">
      {children}
      <div className="container m-auto px-4 xl2:max-w-screen-xl2">
        <div className="flex flex-wrap">
          <div className="md:flex-1 flex flex-wrap mb-8 md:mb-0">
            <div className="footer-nav mr-16">
              <ul>
                <li className="m-0.5">
                  <a
                    href="https://ganni-customerservice.zendesk.com/hc/en-us"
                    className="font-helveticaNeue500 text-dark text-lg uppercase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FAQs
                  </a>
                </li>
                <li className="m-0.5">
                  <Link href="/terms">
                    <a className="font-helveticaNeue500 text-dark text-lg uppercase">
                      {`Terms & Conditions`}
                    </a>
                  </Link>
                </li>
                <li className="m-0.5">
                  <Link href="/privacy">
                    <a
                      href="#"
                      className="font-helveticaNeue500 text-dark text-lg uppercase"
                    >
                      Privacy Notice
                    </a>
                  </Link>
                </li>
                <li className="m-0.5">
                  <Link href="/contact-us">
                    <a className="font-helveticaNeue500 text-dark text-lg uppercase">
                      Contact Us
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-nav h-[40px] lg:h-[140px]">
              <ul>
                <li className="m-0.5">
                  <Link href="/how-to-repeat">
                    <a className="font-helveticaNeue500 text-dark text-lg uppercase">
                      How to repeat
                    </a>
                  </Link>
                </li>
                <li className="m-0.5">
                  <Link href="/about">
                    <a className="font-helveticaNeue500 text-dark text-lg uppercase">
                      About
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`min-w-[150px] h-auto md:px-[12px] transition-all ease-linear ${
              showCurrency ? "border px-[12px] border-[#111111]" : ""
            }`}
          >
            <div className="relative align-middle w-[150px]">
              <div
                className="w-[150px] flex text-[18px] uppercase select-none font-medium justify-between float-right cursor-pointer mb-[5px]"
                onClick={() => setShowCurrency(!showCurrency)}
              >
                <span className="font-helveticaNeue500 pt-3 leading-none">
                  Currency
                </span>
                <div className="w-[13px] h-[7px] pb-2">
                  {showCurrency ? (
                    <Image
                      className="w-full"
                      src="/assets/images/angle-up.svg"
                      alt="Icon up"
                      width={13}
                      height={7}
                    />
                  ) : (
                    <Image
                      className="w-full"
                      src="/assets/images/angle-down.svg"
                      alt="Icon up"
                      width={13}
                      height={7}
                    />
                  )}
                </div>
              </div>
              {showCurrency ? (
                currentBrowserCurrencyState.currencies &&
                currentBrowserCurrencyState.currencies.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className={`${
                        currentBrowserCurrencyState.currency === item.code
                          ? "text-green"
                          : ""
                      } text-left cursor-pointer uppercase font-helveticaNeue500 hover:text-green`}
                      onClick={() => selectCurrency(item.code)}
                    >
                      {item.code}
                    </p>
                  );
                })
              ) : (
                <div className="w-full h-auto z-50 absolute top-[32px] right-[0px]">
                  <span className="text-green uppercase text-lg font-helveticaNeue500">
                    {currentBrowserCurrencyState.currency}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom text-right md:text-center mt-[52px] md:mt-8">
          <div className="font-helveticaNeue400 text-sm text-dark inline-flex">
            <span className="mr-2">Powered by</span>
            <Image
              src="/assets/images/logo-reflaunt.svg"
              alt=""
              width={65}
              height={16}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
