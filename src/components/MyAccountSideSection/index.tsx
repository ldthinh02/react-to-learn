import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useGetSellerInfo } from "@/hooks/useGetSellerInfo";
import { reflauntLoader } from "@/utils/imageLoader";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Rating from "@/components/Rating";
import { useGetMyUnreadMessages } from "@/hooks/useGetMyUnreadMessages";
import { DATA_MENU_PROFILE, HAS_SOLD_STATUS } from "@/utils/constants";
import router from "next/router";
import { useGetMyConversations } from "@/hooks/useGetMyConversations";

interface MyAccountSideSection {
  tab: number;
  profile_picture?: string;
}

type ListNav = {
  line: number;
  total: number;
};

const MyAccountSideSection = ({
  tab,
  profile_picture,
}: MyAccountSideSection) => {
  const [navMobile, setNavMobile] = useState(false);
  const { data: unreadMessageDataApi } = useGetMyUnreadMessages();
  const [customer, setCustomer] = useState<CustomerApiData | null>(null);
  const [listConversation, setListConversation] = useState<
    MyConversationApiData[]
  >([]);
  const { data: dataConversations } = useGetMyConversations();
  const [listNav, setListNav] = useState<ListNav[]>([]);

  const [profileInfo, setProfileInfo] = useState<SellerProfile>();

  const { data: profileApiData } = useGetMyProfile();
  const { mutate: getSellerInfo } = useGetSellerInfo();

  useEffect(() => {
    if (!profileInfo && profileApiData)
      getSellerInfo(profileApiData.id, {
        onSuccess: (data) => {
          setProfileInfo(data);
        },
      });
  }, [profileInfo, profileApiData]);

  useEffect(() => {
    if (dataConversations) {
      setListConversation(dataConversations.data as MyConversationApiData[]);
    }
  }, [dataConversations]);

  useMemo(() => {
    if (profileApiData) {
      setCustomer(profileApiData.customer.data);
    }
  }, [profileApiData]);

  const getCountSold = (data: number[]) => {
    let count = 0;
    for (const item of listConversation) {
      if (
        data.includes(item.inbox_conversation.data.id) &&
        HAS_SOLD_STATUS.includes(item.inbox_message.data.type)
      ) {
        count = count + 1;
      }
    }
    return count;
  };

  useEffect(() => {
    if (unreadMessageDataApi && listConversation.length > 0) {
      const check = listNav.find((c) => c.line === 9);
      const totalUnread =
        unreadMessageDataApi.unread -
        getCountSold(unreadMessageDataApi.reduce_conversation_unread_ids);
      if (!check) {
        setListNav([
          ...listNav,
          {
            line: 9,
            total: totalUnread,
          },
        ]);
      } else {
        const newListNav = listNav.map((c) =>
          c.line === 9
            ? {
                ...c,
                total: totalUnread,
              }
            : c
        );
        setListNav(newListNav);
      }
    }
  }, [unreadMessageDataApi]);

  const toggleNavMobile = () => {
    setNavMobile(!navMobile);
  };

  const getTotal = (value: number) => {
    const result = listNav.find((item) => item.line === value);
    return result && result.total > 0 ? result : undefined;
  };

  return (
    <div className="w-full m-auto flex flex-col">
      {/* User Profile */}
      <div className="user-profile-block flex order-2 lg:order-1">
        <div className="thumb mb-8 w-24">
          <Image
            className="w-full"
            loader={reflauntLoader}
            src={
              profile_picture ||
              customer?.profile_picture ||
              "/assets/images/Default_Profile.svg"
            }
            alt=""
            width={96}
            height={96}
            objectFit="cover"
          />
        </div>
        {/* Info */}
        <div className="info mb-8 lg:mb-12 flex-1 pl-4">
          <div className="font-helveticaNeue500 ratings flex items-center text-pink text-sm">
            {profileInfo && profileInfo.rate ? (
              <Rating rate={profileInfo.rate} />
            ) : (
              ""
            )}
          </div>
          <h3 className="font-helveticaNeue500 text-dark uppercase text-2xl mb-1">
            {customer?.first_name || "FirstName"}
          </h3>
          <p className="font-helveticaNeue500 text-dark uppercase text-xl mb-1">
            @{customer?.nickname || "Username"}
          </p>
        </div>
      </div>
      {/* ./User Profile */}

      {/* Aside nav */}
      <div className="aside-nav-wrap order-1 -mx-6 lg:mx-0 mb-8 lg:mb-0 lg:order-2">
        {/* My account nav toggle mobile */}
        <div className="account-nav-toggle-mobile px-6 bg-pink text-white lg:hidden">
          <div
            className="relative bg-pink text-[14px] font-medium leading-none text-white lg:hidden uppercase pt-[25px] pb-[14px] px-[18px] cursor-pointer"
            onClick={toggleNavMobile}
          >
            {
              DATA_MENU_PROFILE.find((item, index) => index + 1 === tab && item)
                ?.label
            }
            <div
              className={`${
                navMobile ? "-rotate-45" : ""
              } absolute top-6 right-[10px] inline-block cursor-pointer transition-all float-right`}
            >
              <Image
                src="/assets/icons/plus-2.svg"
                alt=""
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
        {/* ./My account nav toggle mobile */}
        <div
          id="account-nav"
          className={`inner bg-lightGrey lg:block px-6 lg:px-0 ${
            navMobile ? "" : "hidden"
          }`}
        >
          {DATA_MENU_PROFILE.map((item, index) => {
            return (
              <div
                key={item.label.toString()}
                className={`pr-4 flex cursor-pointer border-b text-dark border-b-dark bg-account-nav bg-no-repeat bg-right-center ${
                  tab === index + 1 && "text-pink border-b-pink bg-none"
                }`}
                onClick={() => router.push(`/my-account${item.path}`)}
              >
                <div className="font-helveticaNeue500 pt-7 pb-6 leading-none tracking-0 uppercase text-[18px]">
                  {item.label}
                </div>
                {getTotal(index) && (
                  <>
                    <div className="text-pink pl-1 pt-9 pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0">
                      (
                    </div>
                    <div className="text-pink pt-[33px] pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0">
                      {getTotal(index)?.total}
                    </div>
                    <div className="text-pink pt-9 pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0">
                      )
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Aside nav */}
    </div>
  );
};

export default MyAccountSideSection;
