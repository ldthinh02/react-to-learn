import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { getHeader } from "@/utils/index";
import React from "react";
import HeaderSeo from "@/components/HeaderSeo";
import SellerPageSideSection from "@/components/SellerPageSideSection";

interface SellerComponent {
  id: string;
  title: string;
  children: React.ReactNode;
  onChangeProfile: (value: CheckProfile) => void;
}

const SellerComponent = ({
  id,
  title,
  onChangeProfile,
  children,
}: SellerComponent) => {
  const { data: profile } = useGetMyProfile();
  return (
    <div className="w-full">
      <HeaderSeo
        title="Buy and Sell the Best of GANNI Pre-loved Fashion on GANNIREPEAT"
        description="Visit our GANNI Community's Profiles and Shop the latest Pre-Loved Clothes, Shoes and Accessories uploaded by our GANNI community."
      />
      <main>
        <section className="py-6 lg:py-16">
          <div className="flex flex-wrap">
            <div className="overflow-title overflow-hidden mb-6 order-2 lg:order-1">
              <h2 className="text-[#2E9A60] leading-[50px] tracking-[0px] font-extrabold pt-3 helveticaNeueLTCom85Heavy text-3xl xl:text-[56px] whitespace-nowrap uppercase animate-horizontalScroll inline-block relative pl-0">
                {getHeader(200, title)}
              </h2>
            </div>
            <SellerPageSideSection
              seller_id={id}
              userProfile={profile}
              onChange={(value) => {
                const data: CheckProfile = {
                  is_myself: value.id === profile?.id,
                  first_name: value.first_name,
                };
                onChangeProfile(data);
              }}
            />
            <div className="flex flex-wrap mb-4 order-3 w-full lg:w-3/4 px-4 lg:px-12">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerComponent;
