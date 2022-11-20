import HeaderSeo from "@/components/HeaderSeo";
import Image from "next/image";
import Link from "next/link";

export default function ReportIssue() {
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Report an Issue"
        description="GanniRepeat - Report an Issue"
      />

      {/*ReportAnIssue*/}
      <div className="pb-20 pt-20">
        <div className="container text-center m-auto px-4">
          <div className="text-center mb-8">
            <Image
              className="inline-block w-24"
              src="/assets/images/GanniRepeat_2.svg"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
          <h2 className="font-helveticaNeue500 text-pink uppercase text-4xl mb-6">
            Thank you for getting in touch!
          </h2>
          <p className="text-sm mb-12">
            We will look into your query as soon as possible.
          </p>
          <div className="w-full lg:w-420 m-auto">
            <Link href="/section/new-in">
              <a className="font-helveticaNeue500 text-2xl group text-center px-3 py-4 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark flex items-center justify-center mb-4 uppercase">
                <svg
                  className="mr-2"
                  width="24"
                  height="15"
                  viewBox="0 0 24 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="group-hover:fill-white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.1219 0.299988V3.77563H4.17069C4.24381 8.20245 6.80482 11.0196 11.4878 10.9463C17.0853 10.9463 19.4268 6.00725 19.4268 0.995038C19.4268 0.762986 19.42 0.53129 19.4099 0.299988H23.9864C23.9955 0.530382 24 0.762118 24 0.995077C24 8.45861 19.3171 14.6781 11.4878 14.6781C8.30481 14.6781 6.07304 13.7634 3.62188 10.983L2.92683 14.0561H0V0.299988H11.1219Z"
                    fill="#111111"
                  />
                </svg>
                Shop new in
              </a>
            </Link>
            <Link href="/sell/step-1">
              <a className="font-helveticaNeue500 text-2xl group text-center px-3 py-4 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark flex items-center justify-center uppercase">
                <svg
                  className="mr-2"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="group-hover:fill-white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3781 19.678V16.2024H20.3293C20.2562 11.7756 17.6952 8.95847 13.0123 9.03178C7.41472 9.03178 5.07327 13.9708 5.07327 18.983C5.07327 19.2151 5.08003 19.4468 5.09012 19.678H0.513632C0.504544 19.4476 0.5 19.2159 0.5 18.983C0.5 11.5195 5.18293 5.3 13.0123 5.3C16.1952 5.3 18.427 6.21461 20.8781 8.99502L21.5732 5.92194H24.5V19.678H13.3781Z"
                    fill="#111111"
                  />
                </svg>
                Sell an item
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/*./ReportAnIssue*/}
    </div>
  );
}
