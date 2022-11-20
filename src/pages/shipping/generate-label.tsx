import HeaderSeo from "@/components/HeaderSeo";
import Image from "next/image";
import { useRouter } from "next/router";

export default function GenerateLabel() {
  const router = useRouter();

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Generate Shipping Label"
        description="GanniRepeat - Generate Shipping Label"
      />

      {/* <!--Shipping_Generate_Label--> */}
      <div className="pb-20 pt-20">
        <div className="container text-center m-auto px-4">
          <div className="text-center mb-8">
            <Image
              className="inline-block w-24"
              src="/assets/images/Label.svg"
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <h2 className="font-helveticaNeue500 text-pink uppercase text-4xl mb-6">
            YOUR ITEM HAS BEEN SOLD!
          </h2>
          <p className="text-sm mb-8">Your item has found a new owner!</p>
          <p className="text-sm mb-8">
            Please generate your shipping label by clicking below and ship your
            items within 5 days.
          </p>

          <div className="w-full lg:w-240 m-auto">
            {/* <!--Product--> */}
            <div className="product-popup mt-8 mb-8 flex w-full text-left">
              <div className="thumb w-100">
                <Image
                  className="w-full"
                  src="/assets/images/Product_Image_thumb.jpg"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="info flex-1 text-sm pl-4">
                <h3 className="font-helveticaNeue500 uppercase mb-1">
                  style name max characters 28
                </h3>
                <p>£250</p>
                <br />
                <p>SIZE: 44</p>
              </div>
            </div>
            {/* <!--./Product--> */}
          </div>
          <div className="w-full lg:w-420 m-auto">
            <a
              onClick={() => router.push("/shipping/generate-label-confirm")}
              className="font-helveticaNeue500 text-center px-6 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase text-xs py-4 tracking-widest"
            >
              Generate free shipping label
            </a>
          </div>
        </div>
      </div>
      {/* <!--./Shipping_Generate_Label--> */}
    </div>
  );
}
