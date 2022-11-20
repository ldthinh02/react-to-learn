import HeaderSeo from "@/components/HeaderSeo";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | About"
        description="Learn more about GANNIREPEAT: A space to Buy and Sell Pre-loved GANNI Clothes, Shoes and Accessories, and Join the Community."
      />

      <div className="w-full">
        <p className="uppercase text-center text-4xl md:text-5xl pt-[48px] pb-[48px] sm:py-[80px]">
          About repeat
        </p>
      </div>
      <div className="container m-auto px-2 xl2:max-w-screen-xl2">
        <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 grid-flow-row gap-6 pb-[153px]">
          <div className="w-full">
            <div className="w-full border-2 border-rose-300 float-left text-[#E25B8B] sm:mr-[20px] md:mr-[36px] mb-[36px] p-[30px] lg:p-[60px] uppercase">
              <p className="font-helveticaNeue text-[12px] lg:text-[24px] pb-[10px] lg:pb-[20px]">
                Ganni repeat
              </p>
              <p className="font-helveticaNeue500 text-[28px] lg:text-[48px] leading-[1.12]">
                EXTEND THE LIFE OF YOUR WARDROBE WITH GANNI REPEAT: A UNIVERSE
                CREATED TO EMBRACE A MORE RESPONSIBLE APPROACH TO FASHION
              </p>
            </div>
            <div className="lg:w-[622px] lg:h-[532px] sm:hidden my-[32px]">
              <Image
                className="sm:w-full sm:h-full"
                src="/assets/images/about-1.png"
                alt="Product image"
                width={622}
                height={850}
              />
            </div>
            <div className="w-full hidden sm:block">
              <div className="w-full relative">
                <Image
                  className="w-[339px] h-[410px] md:w-full md:h-full"
                  src="/assets/images/about-1.png"
                  alt="Product image"
                  width={622}
                  height={812}
                />
                <div className="absolute right-0 -bottom-[10%]">
                  <p className="font-helveticaNeue500 text-[150px] xl:text-[160px] text-[#2E9A60] font-bold uppercase leading-[0.8]">
                    buy sell repeat
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full lg:pt-[28px]">
              <p className="font-helveticaNeueLTCom85Heavy text-[80px] lg:text-[160px] lg:p-[0px] text-[#2E9A60] font-extrabold uppercase leading-[0.7]">
                ganni
              </p>
              <p className="font-helveticaNeueLTCom85Heavy -tracking-[8px] text-[80px] lg:text-[160px] lg:p-[0px] text-[#2E9A60] font-extrabold uppercase leading-none">
                repeat
              </p>
              <p className="text-[18px] sm:text-[12px] lg:text-[18px] text-[#E25B8B] pt-[10px]">
                <p className="pb-[20px] text-[18px] sm:text-[12px] lg:text-[20px] text-[#E25B8B] pt-[10px]">
                  Our mission is to reduce waste and help close the loop in the
                  fashion industry.
                </p>
                <p className="pb-[20px] text-[18px] sm:text-[12px] lg:text-[20px] text-[#E25B8B] pt-[10px]">
                  First launched in 2019 GANNI REPEAT started as a rental
                  platform with the ambition to extend the life of GANNI pieces
                  and to encourage our community to embrace a more circular
                  approach to fashion.
                </p>
                <p className="pb-[20px] text-[18px] sm:text-[12px] lg:text-[20px] text-[#E25B8B] pt-[10px]">
                  Now we are expanding our universe to enable you to resell,
                  recycle and repair new and pre-loved GANNI.
                </p>
                <p className="pb-[20px] text-[18px] sm:text-[12px] lg:text-[20px] text-[#E25B8B] pt-[10px]">
                  We won’t pretend fashion is sustainable, and we acknowledge
                  that we still have a long way to go when it comes to
                  developing a circular textile economy, but we believe that
                  together, we can help close the loop.
                </p>
                <p className="pb-[36px] text-[18px] sm:text-[12px] lg:text-[20px] text-[#E25B8B] pt-[10px]">
                  Will you join us?
                </p>
              </p>
            </div>
            <div className="w-full hidden sm:block z-[50]">
              <Image
                src="/assets/images/about-2.jpg"
                alt="Product image"
                width={622}
                height={850}
              />
            </div>
            <div className="w-full relative sm:hidden">
              <div className="w-[300px] lg:w-[622px] h-full fixed absolute top-[0] right-[0] bottom-[0] left-[0] z-50">
                <div className="absolute -bottom-[22%]">
                  <p className="font-helveticaNeue500 text-[80px] sm:text-[70px] lg:text-[150px] xl:text-[160px] text-[#2E9A60] font-bold uppercase leading-[0.8]">
                    buy sell repeat
                  </p>
                </div>
              </div>
              <div>
                <Image
                  className="w-[339px] h-[410px] md:w-full md:h-full"
                  src="/assets/images/about-2.jpg"
                  alt="Product image"
                  width={622}
                  height={812}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
