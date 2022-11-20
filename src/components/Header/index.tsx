import { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import LoginAndRegisterModal from "@/components/Modals/LoginAndRegisterModal";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import Search from "@/components/Search";
import NavItem from "@/components/NavItem";
import HeaderLink from "@/components/HeaderLink";
import { useGetMyConversations } from "@/hooks/useGetMyConversations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  DATA_MENU,
  OFFER_STATUS,
  MESSAGE_TYPES,
  STATUS_CONVERSATION_NOT_SHOW,
} from "@/utils/constants";
import { useMarkAsRead } from "@/hooks/useMarkAsRead";
import { reflauntLoader } from "@/utils/imageLoader";
import { useLogout } from "@/hooks/useLogout";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useGetMyUnreadMessages } from "@/hooks/useGetMyUnreadMessages";
import { onEvent } from "@/utils/gtag";
import { useChatBox } from "@/hooks/useChatBox";
import { getExpired } from "@/utils/index";
import { getSlug } from "@/utils/file";
dayjs.extend(relativeTime);

interface Header {
  children?: string;
}

export const Header = ({ children }: Header) => {
  const router = useRouter();
  const { data: conversationsApiData, refetch: refetchConversations } =
    useGetMyConversations();
  const [navMobile, setNavMobile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [conversations, setConversations] = useState<MyConversationApiData[]>(
    []
  );
  const { mutate: markAsRead } = useMarkAsRead();
  const { isLoggedIn, email } = useAuthentication();
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [myCart, setMyCart] = useState<Partial<Checkout> | null>(null);
  const [countUnreadMessage, setCountUnreadMessage] = useState(0);
  const resetPasswordActive = router.query.resetPassword;
  const loginActive = router.query.loginActive;
  const cart = useCart((state) => state.cart);
  const [customer, setCustomer] = useState<CustomerApiData>();
  const [totalUnreadMessage, setTotalUnreadMessage] = useState<number>(0);
  const [totalMessageMyAccount, setTotalMessageMyAccount] = useState<number>(0);
  const [totalUnreadOffers, setTotalUnreadOffers] = useState<number>(0);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const { logout } = useLogout();
  const { data: profileApiData } = useGetMyProfile();
  const { data: unreadMessageDataApi, refetch: refetchUnreadMessages } =
    useGetMyUnreadMessages();
  const { chatData, setChatData, resetChatData } = useChatBox();

  useEffect(() => {
    if (profileApiData) {
      setCustomer(profileApiData.customer.data);
      setChatData({
        ...chatData,
        profileId: profileApiData.id,
      });
    }
  }, [profileApiData]);

  useEffect(() => {
    if (unreadMessageDataApi && conversations.length > 0) {
      const unread_ids = unreadMessageDataApi.reduce_conversation_unread_ids;
      setChatData({
        ...chatData,
        unreadList: unreadMessageDataApi.unreads_message,
      });
      setTotalUnreadMessage(
        unreadMessageDataApi.unread - getCountNotShow(unread_ids)
      );
      setTotalMessageMyAccount(
        unreadMessageDataApi.unread -
          getCountNotShow(unread_ids) +
          getCountOffer(unread_ids)
      );
      setTotalUnreadOffers(getCountOffer(unread_ids));
      setCountUnreadMessage(unreadMessageDataApi.unread);
    }
  }, [unreadMessageDataApi]);

  useEffect(() => {
    if (isLoggedIn && email) setIsLogin(true);
    else setIsLogin(false);
  }, [isLoggedIn, email]);

  useEffect(() => {
    setNavMobile(false);
  }, [router.asPath]);

  useEffect(() => {
    setMyCart(cart);
  }, [cart]);

  useEffect(() => {
    if (resetPasswordActive) {
      setActiveLoginModal(true);
      setOpenResetPassword(true);
    } else {
      setOpenResetPassword(false);
    }
  }, [resetPasswordActive]);
  useEffect(() => {
    if (loginActive) {
      setActiveLoginModal(true);
    }
  }, [loginActive]);

  useEffect(() => {
    if (conversationsApiData) {
      setConversations(conversationsApiData.data as MyConversationApiData[]);
    }
  }, [conversationsApiData]);

  const getCountNotShow = (data: number[]) => {
    let count = 0;
    for (const item of conversations) {
      if (
        data.includes(item.inbox_conversation.data.id) &&
        STATUS_CONVERSATION_NOT_SHOW.includes(item.inbox_message.data.type)
      ) {
        count = count + 1;
      }
    }
    return count;
  };

  const getCountOffer = (data: number[]) => {
    let count = 0;
    for (const item of conversations) {
      if (
        data.includes(item.inbox_conversation.data.id) &&
        OFFER_STATUS.includes(item.inbox_message.data.type)
      ) {
        count = count + 1;
      }
    }
    return count;
  };

  const toggleShowNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleLoginModal = () => {
    if (navMobile) toggleNavMobile();
    setActiveLoginModal(!activeLoginModal);
  };

  const toggleNavMobile = () => {
    setNavMobile(!navMobile);
  };

  const toggleMyAccount = () => {
    setShowMyAccount(!showMyAccount);
  };

  const toggleMenuAccount = () => {
    toggleMyAccount();
    toggleNavMobile();
    resetChatData();
  };

  const getNotificationImage = (conversation: MyConversationApiData) => {
    if (OFFER_STATUS.includes(conversation.inbox_message.data.type)) {
      const image =
        conversation.inbox_conversation.data.product.data.media.data.find(
          (i) => i.main === true
        );
      if (!image) {
        return conversation.inbox_conversation.data.product.data.media.data[0]
          .thumbnail_image_path;
      }
      return image.thumbnail_image_path;
    } else {
      return (
        conversation.inbox_message.data.user.data.customer.data
          .profile_picture || "/assets/images/Default_Profile.svg"
      );
    }
  };

  const navigateToShoppingBag = () => {
    if (
      myCart &&
      myCart.products &&
      myCart.products.data &&
      myCart.products.data.length > 0
    ) {
      // onEvent("checkout_progress", { items: null });
      onEvent("checkout_progress", {
        checkout_progress: {
          checkout_page: "/checkout/shopping-bag",
          items: myCart.products.data.map((prod) => {
            return {
              product_id: prod.id,
              product_name: prod.name,
              product_category: prod.categories[0].name,
              product_brand: prod.designer_name,
              product_price: prod.base_currency_price,
              product_size: prod.size_name,
              product_condition: prod.condition_name,
              product_color: prod.color_name,
              product_quantity: 1,
              list_position: 1,
            };
          }),
        },
      });
    }
    router.push("/checkout/shopping-bag");
  };

  const getContentNotification = (conversation: MyConversationApiData) => {
    const messageData = conversation.inbox_message.data;
    const productData = conversation.inbox_conversation.data.product.data;
    const productName = productData.name;
    const nickname = messageData.user.data.customer.data.nickname;
    switch (messageData.type) {
      case MESSAGE_TYPES.PROCESSING:
        return (
          <>
            {messageData.message === "order after 2 days" ? (
              <>
                {`Don't forget - you still need to ship your item`}{" "}
                <span className="font-helveticaNeue500">{productName}</span> to
                the buyer
              </>
            ) : messageData.message === "order after 4 days" ? (
              <>
                This is the last day to ship your item{" "}
                <span className="font-helveticaNeue500">{productName}</span>{" "}
                before your sale is cancelled
              </>
            ) : (
              <>{messageData.message}</>
            )}
          </>
        );
      case MESSAGE_TYPES.NEW_OFFER:
        return (
          <>
            You have received a new offer for{" "}
            <span className="font-helveticaNeue500">{productName}</span>
          </>
        );
      case MESSAGE_TYPES.PENDING:
        return (
          <>
            {messageData.message === "has expired" ? (
              <>
                Your offer for{" "}
                <span className="font-helveticaNeue500">{productName}</span> was
                rejected by{" "}
                <span className="font-helveticaNeue500 capitalize">
                  {nickname}
                </span>{" "}
              </>
            ) : messageData.message === "one day" ? (
              <>
                One day left to accept the offer received for{" "}
                <span className="font-helveticaNeue500">{productName}</span>
              </>
            ) : messageData.message === "two day" ? (
              <>
                The offer received for STYLE NAME{" "}
                <span className="font-helveticaNeue500">{productName}</span> has
                expired
              </>
            ) : (
              <>
                You have received a new offer for{" "}
                <span className="font-helveticaNeue500">{productName}</span>
              </>
            )}
          </>
        );
      case MESSAGE_TYPES.COUNTERED:
        return (
          <>
            You have received a new counteroffer for{" "}
            <span className="font-helveticaNeue500">{productName}</span>
          </>
        );
      case MESSAGE_TYPES.DECLINED:
        return (
          <>
            {messageData.message === "has sold" ? (
              <>
                Your offer for{" "}
                <span className="font-helveticaNeue500">{productName}</span> was
                rejected by{" "}
                <span className="font-helveticaNeue500 capitalize">
                  {nickname}
                </span>
              </>
            ) : messageData.message === "has expired" ? (
              <>
                Your offer for{" "}
                <span className="font-helveticaNeue500 capitalize">
                  {productName}
                </span>{" "}
                has expired.
              </>
            ) : (
              <>
                Your offer for has been declined{" "}
                <span className="font-helveticaNeue500">{productName}</span>
              </>
            )}
          </>
        );
      case MESSAGE_TYPES.ACCEPTED:
        return (
          <>
            {getExpired(messageData.created_at) < 5 ? (
              <>
                Your offer has been accepted by the seller for{" "}
                <span className="font-helveticaNeue500">{productName}</span>
              </>
            ) : (
              <>
                Reminder on offer being accepted by the seller for{" "}
                <span className="font-helveticaNeue500">{productName}</span>
              </>
            )}
          </>
        );
      case MESSAGE_TYPES.WISHLIST_SOLD:
        return (
          <>
            <span className="font-helveticaNeue500">@{nickname}</span> just sold
            an item you liked
          </>
        );
      case MESSAGE_TYPES.WISHLIST_UPDATED:
      case MESSAGE_TYPES.PRODUCT_UPDATED:
        return (
          <>
            <span className="font-helveticaNeue500">@{nickname}</span> just
            reduced the price of an item
          </>
        );
      case MESSAGE_TYPES.PRODUCT_CREATED:
        return (
          <>
            <span className="font-helveticaNeue500">@{nickname}</span> just
            uploaded a new item
          </>
        );
      default:
        return (
          <>
            <span className="font-helveticaNeue500">@{nickname}</span> has sent
            you a message
          </>
        );
    }
  };

  const markNotificationAsRead = (conversation: MyConversationApiData) => {
    conversation.read_date = new Date();
    markAsRead(
      {
        user_id: conversation.user_id,
        message_id: conversation.message_id,
        conversation_id: conversation.conversation_id,
      },
      {
        onSuccess: () => {
          refetchUnreadMessages();
          refetchConversations();
        },
      }
    );
    if (conversation.inbox_message.data.type === MESSAGE_TYPES.PROCESSING) {
      router.push(`/my-account/sold-items`);
      return;
    }

    if (
      conversation.inbox_message.data.type === MESSAGE_TYPES.WISHLIST_SOLD ||
      conversation.inbox_message.data.type === MESSAGE_TYPES.WISHLIST_UPDATED
    ) {
      router.push(`/my-account/wishlist`);
      return;
    }
    if (
      conversation.inbox_message.data.type === MESSAGE_TYPES.PRODUCT_CREATED
    ) {
      router.push(
        `/product/${getSlug(
          conversation.inbox_conversation?.data.product.data.name,
          conversation.inbox_conversation?.data.product_id
        )}`
      );
      return;
    }
    if (
      conversation.inbox_message.data.type === MESSAGE_TYPES.NEW_OFFER ||
      conversation.inbox_message.data.type === MESSAGE_TYPES.COUNTERED ||
      conversation.inbox_message.data.type === MESSAGE_TYPES.ACCEPTED ||
      conversation.inbox_message.data.type === MESSAGE_TYPES.DECLINED ||
      conversation.inbox_message.data.type === MESSAGE_TYPES.PENDING
    ) {
      router.push(`/my-account/offers`);
      return;
    }
    router.push(
      `/my-account/messages?open_conversation=true&conversationId=${conversation.inbox_conversation.data.id}`
    );
  };

  const onSearch = (value: string) => {
    if (!router.pathname.includes("buy")) {
      router.pathname = "/section/new-in";
    }
    delete router.query["slug"];
    delete router.query["id"];
    router.query.search = value;
    router.push(router);
    setShowSearch(false);
  };

  const onClickSell = () => {
    if (isLoggedIn) {
      toggleNavMobile();
      onEvent("initiate_product_listing", {});
      router.push("/sell/step-1");
    } else {
      setActiveLoginModal(true);
    }
  };

  return (
    <>
      {children}
      <header className="pb-16 lg:pb-0 fixed z-9999 w-full">
        <nav className="flex items-center justify-between py-[4px] lg:py-[0px] pl-3 md:px-5 fixed lg:relative z-50 bg-white w-full">
          {/*Logo*/}
          <div className="logo py-3.5 w-48 xl:w-auto">
            <Link href="/">
              <a className="flex">
                <Image
                  src="/assets/images/GANNIREPEAT.svg"
                  alt=""
                  width={320}
                  height={34}
                />
              </a>
            </Link>
          </div>
          {/*./Logo*/}
          {/*Nav menu*/}
          <div
            className={`nav-menu w-full lg:w-auto lg:flex justify-between flex-wrap items-center flex-1 absolute top-full left-0 bg-white lg:static pt-4 lg:pt-0 h-screen lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-visible lg:overflow-x-visible pb-20 lg:pb-0 ${
              navMobile ? "block" : "hidden"
            }`}
          >
            <ul className="pr-[12px] md:pr-[0px] lg:pt-[4px] relative flex flex-wrap justify-center items-center lg:ml-6 w-full lg:w-auto mb-8 lg:mb-0">
              {DATA_MENU.map((item) => {
                return (
                  <span
                    key={item.label.toString()}
                    className="ml-3 lg:mx-3 group w-full lg:w-auto"
                  >
                    <div
                      onMouseMove={() => {
                        setActiveMenu(item.label);
                        setShowSearch(false);
                        setShowMyAccount(false);
                        setShowNotification(false);
                      }}
                    >
                      <HeaderLink
                        active={activeMenu}
                        onChangeActive={(value) => {
                          setActiveMenu(value);
                        }}
                      >
                        {item.label}
                      </HeaderLink>
                    </div>
                    <div
                      className={`cursor-pointer w-[250vh] h-[100vh] lg:opacity-30 bg-[#111111] fixed lg:absolute lg:top-[30px] lg:-left-[86%] z-9999 ${
                        activeMenu === item.label ? "hidden lg:block" : "hidden"
                      }`}
                      onMouseMove={() => setActiveMenu("")}
                    ></div>
                    <div
                      className={`cursor-pointer w-full h-full lg:w-[250vh] lg:h-auto lg:bg-white lg:absolute lg:top-[30px] lg:-left-[86%] lg:z-9999 ${
                        activeMenu === item.label ? "block" : "hidden"
                      }`}
                    >
                      <div className="w-full bg-white lg:pl-[80px] lg:py-[40px]">
                        <span className="font-helveticaNeue500 text-sm uppercase mb-2">
                          SHOP BY CATEGORY
                        </span>
                        <ul className="mb-4">
                          {item.sub_menu.map((c) => (
                            <NavItem
                              key={(item.label + c).toString()}
                              category={item.label}
                              onChangeStatus={() => setNavMobile(false)}
                            >
                              {c}
                            </NavItem>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </span>
                );
              })}
              <span className="w-[97%] ml-3 md:w-full border-b border-b-dark lg:border-b-0 pb-8 lg:pb-0"></span>
            </ul>

            <ul className={`lg:pt-2 lg:flex relative`}>
              <div
                className={`w-full flex pl-4 lg:pl-0 lg:w-auto cursor-pointer mr-3 font-helveticaNeue500 uppercase text-lg xl:text-xl text-green md:w-[20px] md:h-[20px] ${
                  !isLogin ? "mt-1" : ""
                }`}
                onClick={onClickSell}
                onMouseMove={() => {
                  setActiveMenu("");
                  setShowSearch(false);
                  setShowMyAccount(false);
                  setShowNotification(false);
                }}
              >
                <Image
                  className="w-[16px] h-[10px] md:w-full md:h-full"
                  src="/assets/images/sell-icon.svg"
                  alt=""
                  width={20}
                  height={24}
                />
                <span className="pl-[10px] md:pl-[4px] pt-[8px] md:pt-[2px] text-[20px] md:text-[18px] font-helveticaNeue500">
                  Sell
                </span>
              </div>

              {isLogin ? (
                <div
                  className={`w-[96%] mt-[10px] md:mt-0 lg:w-auto cursor-pointer md:bg-none font-helveticaNeue500 text-lg xl:text-xl md:w-[20px] md:h-[20px]`}
                >
                  <div className="flex">
                    <div
                      className="mx-4 pt-1 lg:pt-0 relative"
                      onMouseMove={() => {
                        setActiveMenu("");
                        setShowSearch(false);
                        setShowNotification(false);
                        setShowMyAccount(true);
                      }}
                    >
                      <Image
                        className="w-full h-full"
                        src="/assets/images/Profile.svg"
                        alt="profile icon"
                        width={20}
                        height={18}
                      />

                      {totalMessageMyAccount > 0 && (
                        <span
                          className={`inline-block text-center text-[8px] text-white absolute bottom-[2px] -right-[5px] rounded-full bg-pink ${
                            totalMessageMyAccount > 100
                              ? "w-[16px] leading-[18px] h-[16px]"
                              : totalMessageMyAccount > 10
                              ? "w-[14px] leading-[16px] h-[14px]"
                              : "w-[12px] leading-[14px] h-[12px] pl-[1px]"
                          }`}
                        >
                          {totalMessageMyAccount < 100
                            ? totalMessageMyAccount
                            : "99+"}
                        </span>
                      )}
                    </div>
                    <div
                      className={`pt-[6px] w-[100%] relative uppercase md:hidden text-[20px] bg-no-repeat bg-right-center font-helveticaNeue500 before:w-[12px] before:h-[7px] before:absolute before:bg-no-repeat before:bg-center before:top-2/4 before:right-0 before:-mt[-3px] before:transition-all before:bg-100% ${
                        !showMyAccount
                          ? "before:bg-dropdown"
                          : "before:bg-collapse-title"
                      }`}
                      onClick={toggleMyAccount}
                    >
                      Account
                    </div>
                  </div>
                  <div
                    className={`opacity-0 fixed lg:absolute lg:top-[24px] lg:-left-[160%] z-9999 lg:mt-5 ${
                      showMyAccount
                        ? "block lg:w-[450px] lg:h-[550px]"
                        : "hidden"
                    }`}
                    onMouseMove={() => {
                      setShowNotification(false);
                      setShowMyAccount(false);
                    }}
                  ></div>
                  <div
                    className={`notification-dropdown w-full pl-4 lg:pl-0 lg:w-[236px] h-screen lg:h-[265px] lg:absolute top-[52%] lg:top-[24px] left-0 lg:-left-[22px] lg:border lg:border-grey z-9999 bg-white lg:mt-5 lg:before:absolute lg:before:bottom-[97%] lg:before:left-[49%] before:w-5 before:h-5 lg:before:transform lg:before:rotate-45 lg:before:border lg:before:border-grey lg:before:border-b-transparent lg:before:border-r-transparent lg:before:bg-white ${
                      showMyAccount ? "block" : "hidden"
                    }`}
                  >
                    <div className="h-full">
                      <div className="notification-header py-4 md:p-3.5">
                        <h3 className="font-helveticaNeue500 text-[18px] pb-[20px] uppercase top-[4px] text-dark">
                          {customer?.first_name}
                        </h3>
                        <ul className="text-[18px]">
                          <li
                            className="hover:text-[#E25B8B] uppercase py-[4px] cursor-pointer"
                            onClick={() => {
                              router.push("/my-account");
                              toggleMenuAccount();
                            }}
                          >
                            my Account
                          </li>
                          <li
                            className="hover:text-[#E25B8B] normal-case py-[4px] cursor-pointer"
                            onClick={() => {
                              router.push("/my-account/listed-items");
                              toggleMenuAccount();
                            }}
                          >
                            Items for sale
                          </li>
                          <li
                            className="hover:text-[#E25B8B] normal-case py-[4px] cursor-pointer"
                            onClick={() => {
                              router.push("/my-account/wishlist");
                              toggleMenuAccount();
                            }}
                          >
                            Wishlist
                          </li>
                          <li
                            className="hover:text-[#E25B8B] normal-case py-[4px] cursor-pointer"
                            onClick={() => {
                              router.push("/my-account/offers");
                              toggleMenuAccount();
                            }}
                          >
                            Offers{" "}
                            {totalUnreadOffers > 0 && (
                              <span className="text-pink">
                                ({totalUnreadOffers})
                              </span>
                            )}
                          </li>
                          <li
                            className="hover:text-[#E25B8B] normal-case py-[4px] cursor-pointer"
                            onClick={() => {
                              router.push("/my-account/messages");
                              toggleMenuAccount();
                            }}
                          >
                            Messages{" "}
                            {totalUnreadMessage > 0 && (
                              <span className="text-pink">
                                ({totalUnreadMessage})
                              </span>
                            )}
                          </li>
                        </ul>
                        <hr className="w-full my-[20px] border-t-black border-l-none border-r-none border-b-black" />
                        <p
                          className="text-[14px] uppercase cursor-pointer underline"
                          onClick={() => {
                            logout();
                            toggleMenuAccount();
                          }}
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="mx-3 font-helveticaNeue500 uppercase text-[20px] leading-[30px] text-left lg:text-[18px] lg:px-0 cursor-pointer"
                  onClick={toggleLoginModal}
                >
                  Login
                </div>
              )}
            </ul>
          </div>
          {/*./Nav menu*/}
          {/*Nav right*/}
          <div className="nav-right pr-[12px] md:pr-[0px]">
            <ul className="flex justify-center items-center">
              <li className="mx-3 lg:mx-3">
                <div
                  className="font-helveticaNeue500 uppercase text-xl cursor-pointer !w-[18px] !h-[18px] flex md:justify-end item-end"
                  onMouseEnter={toggleShowSearch}
                  onMouseMove={() => {
                    setActiveMenu("");
                    setShowMyAccount(false);
                    setShowNotification(false);
                    setShowSearch(true);
                  }}
                >
                  <Image
                    className="w-full h-full"
                    src="/assets/icons/search.svg"
                    alt="Search Button"
                    width={20}
                    height={20}
                  />
                </div>
                <Search
                  open={showSearch}
                  onSearch={onSearch}
                  setShowSearch={setShowSearch}
                  onChangeStatus={() => setShowSearch(false)}
                />
              </li>
              <li className="mx-3 lg:mx-3 relative">
                <div
                  className="font-helveticaNeue500 uppercase text-xl relative cursor-pointer w-6 lg:w-[18px] lg:h-[18px] h-6 flex md:justify-end item-end"
                  onMouseEnter={toggleShowNotification}
                  onMouseMove={() => {
                    setActiveMenu("");
                    setShowSearch(false);
                    setShowMyAccount(false);
                    setShowNotification(true);
                  }}
                >
                  <Image
                    className="object-contain w-full h-full"
                    src="/assets/images/Notification.svg"
                    alt=""
                    width={20}
                    height={20}
                    objectFit="cover"
                  />
                  {isLogin && countUnreadMessage > 0 && (
                    <span
                      className={`inline-block text-center text-[8px] text-white absolute -bottom-[7px] -right-[6px] rounded-full bg-pink ${
                        countUnreadMessage > 99
                          ? "w-[18px] leading-[20px] h-[18px]"
                          : countUnreadMessage > 9
                          ? "w-[14px] leading-[16px] h-[14px]"
                          : "w-[12px] leading-[14px] h-[12px] pl-[1px]"
                      }`}
                    >
                      {countUnreadMessage < 99 ? countUnreadMessage : "99+"}
                    </span>
                  )}
                </div>
                <div
                  className={`notification-dropdown w-full lg:w-[360px] h-screen lg:h-[480px] fixed lg:absolute top-0 lg:top-full left-0 lg:-left-[265px] z-9999 lg:mt-5 ${
                    showNotification ? "" : "hidden"
                  }`}
                  onMouseMove={() => setShowNotification(false)}
                ></div>
                <div
                  className={`notification-dropdown w-full h-full fixed lg:absolute top-0 lg:top-full left-0 lg:-left-[218px] border border-grey z-9999 bg-white lg:mt-5 lg:before:absolute lg:before:left-[218px] before:w-5 before:h-5 lg:before:transform lg:before:rotate-45 lg:before:border lg:before:border-grey lg:before:border-b-transparent lg:before:border-r-transparent lg:before:bg-white ${
                    showNotification ? "" : "hidden"
                  } ${
                    conversations && conversations.length > 0
                      ? "lg:w-[300px] lg:h-[386px] lg:before:bottom-[98%]"
                      : "lg:w-[300px] lg:h-[280px] lg:before:bottom-[97%]"
                  }`}
                >
                  <div className="h-full">
                    <div className="notification-header p-3.5 relative">
                      <span className="font-helveticaNeue500 text-sm uppercase relative top-[4px] text-dark">
                        Notifications
                      </span>
                      <span
                        className="cursor-pointer absolute top-2/4 right-4 z-10 -translate-x-2/4 -mt-[10px] lg:hidden !w-[18px] !h-[18px] flex md:justify-end item-end"
                        onClick={toggleShowNotification}
                      >
                        <Image
                          className="object-contain"
                          src="/assets/images/close.svg"
                          alt="Close Notification Pop-up"
                          width={20}
                          height={20}
                        />
                      </span>
                    </div>
                    {conversations && conversations.length > 0 ? (
                      <div className="border border-t-grey border-r-0 border-l-0 border-b-0 h-[95%] lg:h-[342px] scrollbar-thin scrollbar-thumb-dark scrollbar-track-gray-300 overflow-y-auto">
                        {conversations.map((conversation) => (
                          <>
                            <div
                              className="notification-single border border-l-0 border-b-grey border-r-0 border-t-0 flex px-4 py-3.5 items-center"
                              onClick={toggleShowNotification}
                            >
                              <div className="thumb w-12">
                                <div className="w-12 h-12 relative">
                                  <Image
                                    className="rounded-full object-contain"
                                    loader={reflauntLoader}
                                    src={getNotificationImage(conversation)}
                                    alt=""
                                    layout="fill"
                                  />
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  markNotificationAsRead(conversation)
                                }
                                className="flex-1 font-helveticaNeue400 cursor-pointer text-dark text-xs pl-3"
                              >
                                <p>{getContentNotification(conversation)}</p>
                                <p className="text-mgrey">
                                  {dayjs(
                                    conversation.inbox_message.data.created_at
                                  ).fromNow()}
                                </p>
                              </div>
                              {!conversation.remove_at && (
                                <div className="w-9 text-center">
                                  <span
                                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                                      conversation.read_date
                                        ? "bg-grey"
                                        : "bg-pink"
                                    }`}
                                  ></span>
                                </div>
                              )}
                            </div>
                          </>
                        ))}
                      </div>
                    ) : (
                      <div className="notification-single flex flex-col px-4 py-3.5 justify-center items-center border border-t-grey border-r-0 border-l-0 border-b-0 h-[80vh] lg:h-[230px]">
                        <Image
                          className="object-contain w-full h-full lg:w-[35px]"
                          src="/assets/images/Notification.svg"
                          alt=""
                          width={40}
                          height={40}
                          objectFit="cover"
                        />
                        <p className="text-[14px] leading-[20px] tracking-[0px] font-helveticaNeue pt-[12px]">{`You don't have any notifications yet!`}</p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li className="mx-3 lg:ml-4 lg:mr-3">
                <div
                  onClick={navigateToShoppingBag}
                  className={`cursor-pointer font-helveticaNeue500 uppercase text-xl relative !w-[20px] !h-[20px] lg:!w-[18px] lg:!h-[18px] flex md:justify-end item-end`}
                  onMouseMove={() => {
                    setActiveMenu("");
                    setShowSearch(false);
                    setShowMyAccount(false);
                    setShowNotification(false);
                  }}
                >
                  <Image
                    className="w-full h-full"
                    src="/assets/icons/bag-active.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  {isLoggedIn &&
                    email &&
                    myCart &&
                    myCart.products &&
                    myCart.products.data.length > 0 && (
                      <span
                        className={`inline-block text-center text-[8px] text-white absolute -bottom-[7px] -right-[6px] pt-[1px] rounded-full bg-green ${
                          myCart.products.data.length > 9
                            ? "w-[14px] leading-[16px] h-[14px]"
                            : "w-[12px] leading-[12px] h-[12px]"
                        }`}
                      >
                        {myCart.products.data.length < 99
                          ? myCart.products.data.length
                          : "99+"}
                      </span>
                    )}
                </div>
              </li>
              <li
                className={`pl-3 lg:px-3 pt-[9px] lg:ml-3 flex justify-center items-center relative cursor-pointer ${
                  showNotification ? "hidden" : "lg:hidden"
                } transition-all select-none`}
              >
                <div
                  className="w-[20px]"
                  onClick={() => {
                    setShowMyAccount(false);
                    toggleNavMobile();
                  }}
                >
                  {navMobile ? (
                    <Image
                      src="/assets/images/close.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src="/assets/icons/frame.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </li>
            </ul>
          </div>
          <LoginAndRegisterModal
            active={activeLoginModal}
            toggleLoginModal={toggleLoginModal}
            openResetPassword={openResetPassword}
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
