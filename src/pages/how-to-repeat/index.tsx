import HeaderSeo from "@/components/HeaderSeo";
import { initiateProductListing } from "@/utils/gtag";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HowToRepeat() {
  const router = useRouter();
  const onClickSell = () => {
    router.push("/sell/step-1");
    initiateProductListing();
  };
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - How to Repeat"
        description="GanniRepeat - How to Repeat"
      />

      <div className="w-full px-1 md:px-36">
        <p className="font-helveticaNeue500 uppercase text-left md:text-center text-[24px] leading-[29px] tracking-[0px] pb-[8px] pt-[48px]">
          how to
        </p>
        <p className="font-helveticaNeueLTCom85Heavy text-left md:text-center text-[80px] leading-[72px] -tracking-[0.05em] uppercase text-[#2E9A60] font-extrabold">
          repeat
        </p>
        <p className="text-left md:text-center text-[18px] pt-[18px] pb-[48px]">
          Our peer-to-peer marketplace connects you with our community to sell
          past purchases and find “new” favourites. Find out how to REPEAT below
          and help keep clothes in circulation.
        </p>
      </div>

      <div className="w-full h-auto px-[10px] md:px-20 flex flex-col sm:flex-row justify-center item-center pb-[81px]">
        <div className="w-full h-[730px] sm:h-[780px] md:h-[820px] lg:w-[622px] lg:h-[750px] border-2 border-rose-300 float-left sm:mr-[20px] md:mr-[36px] p-[24px] lg:p-[60px]">
          <div className="w-full h-[120px] flex justify-center">
            <Image
              src="/assets/images/buy-pink.svg"
              alt="buy icon"
              width={129}
              height={120}
            />
          </div>
          <div className="w-full">
            <p className="font-helveticaNeue500 pt-[24px] text-center text-[24px] uppercase text-[#E25B8B]">
              HOW TO SHOP PRE-LOVED GANNI
            </p>
          </div>
          <div className="w-full flex justify-center pt-[36px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src="/assets/icons/heart-black.svg"
                alt="buy icon"
                width={50}
                height={50}
              />
            </div>
            <div className="w-[90%] text-[14px] pl-[24px]">
              <b className="font-helveticaNeue500 text-[14px] leading-[20px] tracking-[0px] uppercase">
                Find your favourites
              </b>
              <p>
                {`Search for that GANNI piece you've always wanted or add items to your wishlist to come back to later.`}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center pt-[24px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src="/assets/icons/data-black.svg"
                alt="buy icon"
                width={50}
                height={50}
              />
            </div>
            <div className="w-[90%] text-[14px] pl-[24px]">
              <b className="font-helveticaNeue500 text-[14px] leading-[20px] tracking-[0px] uppercase">
                Make an offer
              </b>
              <p>{`Place a bid to the seller via REPEAT.`}</p>
            </div>
          </div>

          <div className="w-full flex justify-center pt-[24px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src="/assets/icons/logo-black.svg"
                alt="buy icon"
                width={50}
                height={50}
              />
            </div>
            <div className="w-[90%] text-[14px] pl-[24px]">
              <b className="font-helveticaNeue500 text-[14px] leading-[20px] tracking-[0px] uppercase">
                JOIN THE COMMUNITY
              </b>
              <p>
                {`Enjoy your new purchase pleased in the knowledge that you are helping to keep clothes in circulation.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mt-[48px] mb-[40px]">
            <div className="w-full px-2">
              <div className="mb-6">
                <button
                  className="text-center leading-none px-[16px] transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                  onClick={() => router.push("/section/new-in")}
                >
                  Shop new in
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[820px] sm:h-[780px] lg:w-[622px] md:h-[820px] lg:h-[750px] border-2 border-[#2E9A60] float-left mt-[20px] sm:mt-[0px] sm:mr-[20px] md:mr-[36px] p-[24px] lg:p-[50px]">
          <div className="w-full h-[120px] flex justify-center">
            <Image
              src="/assets/images/sell-green.svg"
              alt="buy icon"
              width={129}
              height={120}
            />
          </div>
          <div className="w-full">
            <p className="font-helveticaNeue500 leading-tight pt-[24px] text-center text-[24px] uppercase text-[#2E9A60]">
              HOW TO SELL PRE-LOVED GANNI
            </p>
          </div>

          <div className="w-full flex justify-center pt-[36px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src="/assets/icons/icon-black.svg"
                alt="buy icon"
                width={50}
                height={50}
              />
            </div>
            <div className="w-[90%] text-[14px] pl-[24px]">
              <b className="font-helveticaNeue500 text-[14px] leading-[20px] tracking-[0px] uppercase">
                List your item
              </b>
              <p>
                {`Tell us about your item including details of its condition and photos, then upload the listing for sale on GANNI REPEAT.`}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center pt-[24px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src="/assets/icons/package-black.svg"
                alt="buy icon"
                width={50}
                height={50}
              />
            </div>
            <div className="w-[90%] text-[14px] pl-[24px]">
              <b className="font-helveticaNeue500 text-[14px] leading-[20px] tracking-[0px] uppercase">
                Ship your item for free
              </b>
              <p>
                {`Once sold, ship your item for free using our pre-paid shipping label. Alternatively, entice buyers with free shipping.`}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center pt-[24px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src="/assets/icons/data-black.svg"
                alt="buy icon"
                width={50}
                height={50}
              />
            </div>
            <div className="w-[90%] text-[14px] pl-[24px]">
              <b className="font-helveticaNeue500 text-[14px] leading-[20px] tracking-[0px] uppercase">
                Choose your payment
              </b>
              <p>
                {`Choose to be paid in either cash or a GANNI gift card with an extra 20% value.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mt-[48px] mb-[40px]">
            <div className="w-full px-2">
              <div className="mb-6">
                <button
                  className="text-center leading-none px-[16px] transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                  onClick={onClickSell}
                >
                  Start selling
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
