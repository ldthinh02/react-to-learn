import HeaderSeo from "@/components/HeaderSeo";

const Contact = () => {
  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Contact us"
        description="Get in touch with us about GANNIREPEAT: A space to Buy and Sell Pre-loved GANNI Clothes, Shoes and Accessories. Contact us."
      />

      <div className="w-full pt-[48px] md:pt-[80px]">
        <p className="text-[48px] font-helveticaNeue500 leading-[53px] tracking-[0px] text-center uppercase">
          Contact us
        </p>
      </div>
      <div className="w-full px-[10px] sm:px-[60px] md:px-[190px] lg:px-[240px] py-[48px] md:py-[80px] text-[14px]">
        <p className="pb-[20px]">
          {`We love to hear from you, so if there's anything you'd like to ask us
          about resale, we're here and ready to help in every way we can.`}
        </p>
        <p className="pb-[20px]">
          For general enquiries, please see our{" "}
          <a
            className="underline cursor-pointer"
            href="https://ganni-customerservice.zendesk.com/hc/en-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQs.
          </a>
        </p>
        <p className="pb-[20px]">
          {`If you'd like to get in touch with us directly, email: `}
          <span className="underline">
            <a
              href="mailto:customerservice@gannirepeat.com"
              target="_blank"
              rel="noreferrer"
            >
              customerservice@gannirepeat.com
            </a>
          </span>
        </p>
        <p>We will get back to you within 2 business days.</p>
      </div>
    </div>
  );
};
export default Contact;
