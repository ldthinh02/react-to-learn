import HeaderSeo from "@/components/HeaderSeo";
import Image from "next/image";

export default function GenerateLabelConfirmed() {
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Generate Label Confirmed"
        description="GanniRepeat - Generate Label Confirmed"
      />

      {/* <!--Shipping_Address_Confirmed--> */}
      <div className="sec-404 pb-20 pt-20">
        <div className="container text-center m-auto px-4">
          <div className="text-center mb-8">
            <Image
              className="inline-block w-24"
              src="/assets/images/GanniRepeat_2.svg"
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <h2 className="font-helveticaNeue500 text-pink uppercase text-4xl mb-6">
            THANK YOUR FOR CONFIRMING!
          </h2>
          <p className="text-sm mb-8">
            We will now generate your free shipping label and email you when
            it&apos;s ready. This can take up to a few hours.{" "}
          </p>
          <p className="text-sm mb-12">
            In the meantime, find your nearest drop-off point by clicking the
            button below.
          </p>

          <div className="w-full lg:w-420 m-auto">
            <a
              href="#"
              className="font-helveticaNeue500 text-center px-6 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase text-xs py-4 tracking-widest"
            >
              FIND nearest DROP-OFF POINT
            </a>
          </div>
        </div>
      </div>
      {/* <!--./Shipping_Address_Confirmed--> */}
    </div>
  );
}
