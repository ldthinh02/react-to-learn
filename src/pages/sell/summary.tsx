import HeaderSeo from "@/components/HeaderSeo";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SellStepSummary() {
  const router = useRouter();
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Sell Step Summary"
        description="GanniRepeat - Sell Step Summary"
      />

      <main className="container mx-auto flex px-5 py-24 items-center justify-center flex-col text-center">
        <div className="mb-[56px]">
          <Image src="/assets/icons/sell.svg" alt="" width={100} height={60} />
        </div>
        <h1 className="text-[36px] leading-none uppercase text-[#E25B8B] pb-[30px]">
          YOUR LISTING HAS BEEN SUBMITTED!
        </h1>
        <p className="pb-[20px]">
          Thank you for your submission, you will receive an email confirmation
          shortly.
        </p>
        <p className="pb-[20px]">
          Our team will validate your listing within the next 72 hours and
          inform you as soon as it is live.
        </p>
        <p className="pb-[72px] md:pb-[20px]">Thank you for repeating.</p>

        <div className="flex flex-col w-full md:w-[480px] mx-2">
          <div className="w-full">
            <div className="mb-[8px]">
              <button
                className="text-center px-3 leading-none transition-all border border-dark inline-block text-dark w-full uppercase text-xl tracking-widest py-4"
                onClick={() => router.push("/section/new-in")}
              >
                <span className="pr-[8px]">
                  <Image
                    src="/assets/icons/buy.svg"
                    alt=""
                    width={24}
                    height={14}
                  />
                </span>
                shop new in
              </button>
            </div>
          </div>
          <div className="w-full">
            <div>
              <button
                className="text-center px-3 leading-none transition-all border border-dark inline-block text-dark w-full uppercase text-xl tracking-widest py-4"
                onClick={() => router.push("/sell/step-1")}
              >
                <span className="pr-[8px]">
                  <Image
                    src="/assets/icons/sell.svg"
                    alt=""
                    width={24}
                    height={14}
                  />
                </span>
                sell an item
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
