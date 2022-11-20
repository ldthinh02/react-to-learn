import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { reflauntLoader } from "@/utils/imageLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import Price from "@/components/Price";
import { useRouter } from "next/router";
import { MakeAnOfferModal } from "@/components/Modals/MakeAnOfferModal";
import Link from "next/link";
import { useChatBox } from "@/hooks/useChatBox";
import { useGetConversation } from "@/hooks/useGetConversation";
import { getExpired } from "@/utils/index";
import {
  SellerOfferAccepted,
  SellerOfferCountered,
  SellerOfferPending,
} from "@/components/Offer/seller";
import {
  BuyerOfferAccepted,
  BuyerOfferCountered,
  BuyerOfferSent,
} from "@/components/Offer/buyer";
import { getSlug } from "@/utils/file";

interface OfferType {
  offer: Offer;
  toggleMakeAnOfferModal?: () => void;
  openChatBox?: () => void;
}

const Offer = ({ offer }: OfferType) => {
  const { chatData, setChatData } = useChatBox();
  const [showMakeAnOfferModal, setShowMakeAnOfferModal] = useState(false);
  const [active, setActive] = useState(false);
  const { data: myProfile } = useGetMyProfile();
  const { mutate: getConversation } = useGetConversation();
  const router = useRouter();
  const { offer_id } = router.query;

  useEffect(() => {
    if (offer_id && offer_id == offer.id) setActive(true);
  }, [offer_id]);

  const activePanel = () => {
    setActive(!active);
  };

  const openChatBox = () => {
    getConversation(
      { productId: offer.product.data.id, customerId: offer.user_id },
      {
        onSuccess: (data) => {
          setChatData(getDataChat(data));
        },
        onError: () => {
          setChatData(getDataChat());
        },
      }
    );
  };

  const getDataChat = (conversation?: ConversationApiData) => {
    return {
      ...chatData,
      product: offer.product.data as ProductApiData,
      profileId: myProfile?.id as number,
      conversation: conversation || ({} as ConversationApiData),
      customer:
        myProfile && myProfile.id === offer.seller_id
          ? offer.buyer?.data.customer.data
          : offer.seller?.data.customer.data,
      buyer_id: offer.user_id,
      is_buyer: false,
    };
  };

  const toggleMakeAnOfferModal = () => {
    setShowMakeAnOfferModal(!showMakeAnOfferModal);
  };

  const isCheckExpired = () => {
    return getExpired(offer.created_at) > 1;
  };

  const isExpired = () => {
    const isPending = ["PENDING", "COUNTERED"].includes(offer.status);
    return (isPending && isCheckExpired()) || (isPending && !isSelling());
  };

  const isSelling = () => {
    const status = offer.product.data.process_status.data.name;
    return ["SELLING"].includes(status);
  };

  const isArchive = () => {
    const status = offer.product.data.process_status.data.name;
    return ["ARCHIVED"].includes(status);
  };

  const isActive = () => {
    const selling = isSelling();
    const archived = isArchive();
    if ((!selling && !archived) || archived || !selling) return false;
    return true;
  };

  const getNotificationSeller = () => {
    const link = getLink(offer.user_id, offer.buyer_username);

    switch (offer.status) {
      case "ACCEPTED":
        return (
          <>
            {isActive() ? (
              <>You have accepted the offer from {link} for the below item.</>
            ) : (
              <>
                The offer you received from {link} for the below item has now
                expired.
              </>
            )}
          </>
        );
      case "COUNTERED":
        return (
          <>
            {isActive() ? (
              <>
                You have received a counteroffer from {link} for the below item.
              </>
            ) : (
              `Your offer for the below item has expired.`
            )}
          </>
        );
      case "DECLINED":
        return <>You declined the offer for the below item from </>;
      default:
        return (
          <>
            {!isActive() ? (
              <>You declined the offer for the below item from {link}</>
            ) : isArchive() ? (
              <>
                The offer you received from {link} for the below item has now
                expired.
              </>
            ) : !isExpired() ? (
              <>You have received an offer from {link} for the below item.</>
            ) : (
              `The offer has expired.`
            )}
          </>
        );
    }
  };

  const getNotificationBuyer = () => {
    const link = getLink(offer.seller_id, offer.seller_username);
    const offer_expired = `Your offer for the below item has expired.`;
    switch (offer.status) {
      case "ACCEPTED":
        return (
          <>
            {isActive() ? (
              <>{link} has accepted your offer for the below item.</>
            ) : (
              offer_expired
            )}
          </>
        );
      case "COUNTERED":
        return (
          <>
            {isActive() ? (
              <>
                You have received a counteroffer from {link} for the below item.
              </>
            ) : (
              offer_expired
            )}
          </>
        );
      case "DECLINED":
        return <>{link} has declined your offer for the below item.</>;
      default:
        return (
          <>
            {!isActive() || (isActive() && isCheckExpired()) ? (
              <>{link} has declined your offer for the below item.</>
            ) : isSelling() ? (
              <>You have sent an offer to {link} for the below item.</>
            ) : (
              offer_expired
            )}
          </>
        );
    }
  };

  const getLink = (user_id: number, user_name: string) => {
    return (
      <Link href={`/seller/${user_id}/selling`}>
        <a className="font-bold cursor-pointer">{user_name}</a>
      </Link>
    );
  };

  const showDetail = (isSeller: boolean) => {
    if (
      (offer.status === "PENDING" ||
        (offer.status === "COUNTERED" && !offer.pending_buyer_response)) &&
      isActive()
    ) {
      return isSeller ? (
        <SellerOfferPending
          toggleMakeAnOfferModal={toggleMakeAnOfferModal}
          offer_id={offer.id}
          created_at={offer.created_at}
        />
      ) : (
        <BuyerOfferSent openChatBox={openChatBox} offer={offer} />
      );
    }

    if (offer.status === "ACCEPTED" && isActive()) {
      return isSeller ? (
        <SellerOfferAccepted openChatBox={openChatBox} />
      ) : (
        <BuyerOfferAccepted product_id={offer.product_id} />
      );
    }

    if (offer.status === "COUNTERED" && isActive()) {
      return isSeller ? (
        <SellerOfferCountered openChatBox={openChatBox} />
      ) : (
        <BuyerOfferCountered
          offer={offer}
          toggleMakeAnOfferModal={toggleMakeAnOfferModal}
        />
      );
    }
  };

  return (
    <div>
      <div className="accordion-single type-2 border border-grey px-4 mb-4">
        <div
          className={`${
            active ? "before:bg-minus" : "before:bg-plus-dark"
          } accordion before:w-4 before:h-4 before:-mt-2 before:rotate-180 before:bg-no-repeat before:bg-center before:bg-100% before:absolute before:top-2/4 before:right-0 before:transition-all py-4 font-helveticaNeue500 pr-8 w-full text-left relative flex cursor-pointer`}
          onClick={activePanel}
        >
          <div className="w-2/4 flex">
            <div className="w-9">
              <Image
                loader={reflauntLoader}
                src={
                  (
                    offer.product.data.media.data.find((i) => i.main) ||
                    offer.product.data.media.data[0]
                  ).original_image
                }
                alt=""
                width={96}
                height={115}
                objectFit="cover"
              />
            </div>
            <div className="pl-2">
              <h3 className="font-helveticaNeue500 text-sm uppercase text-dark mb-2 break-all">
                {myProfile && myProfile.id === offer.user_id
                  ? "Offer Sent"
                  : "Offer Received"}
              </h3>
              <p className="text-grey2 text-sm">
                {new Date(offer.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="w-2/4 pl-2">
            <h3 className="font-helveticaNeue500 text-sm uppercase text-dark mb-2 break-all">
              Status
            </h3>
            {myProfile && myProfile.id === offer.seller_id && (
              <p
                className={`text-sm ${
                  offer.status === "COUNTERED" ? "text-[#636363]" : "text-pink"
                } ${offer.status !== "PENDING" && "capitalize"}`}
              >
                {isExpired() || !isActive()
                  ? "Expired"
                  : offer.status === "PENDING"
                  ? "Pending response"
                  : offer.status === "COUNTERED"
                  ? "Counteroffer sent"
                  : offer.status.toLowerCase()}
              </p>
            )}
            {myProfile && myProfile.id === offer.user_id && (
              <p
                className={`text-sm ${
                  offer.status === "PENDING" || isExpired()
                    ? "text-[#636363]"
                    : "text-pink capitalize"
                }`}
              >
                {(!isActive() && offer.status === "PENDING") ||
                (isActive() && offer.status === "PENDING" && isCheckExpired())
                  ? "Declined"
                  : isExpired() || !isActive()
                  ? "Expired"
                  : offer.status === "PENDING"
                  ? "Pending response"
                  : offer.status.toLowerCase()}
              </p>
            )}
          </div>
        </div>
        <div
          className={`panel overflow-hidden transition-all duration-200 ease-out ${
            active ? "max-h-[2800px]" : "max-h-0"
          }`}
        >
          <div className="content pt-8 pb-8 text-sm border-t border-t-grey">
            <p className="mb-6">
              {myProfile && myProfile.id === offer.seller_id
                ? getNotificationSeller()
                : getNotificationBuyer()}
            </p>
            {/* Product */}
            <div className="bg-white mb-4">
              <div className="product-popup flex w-full text-left py-4 px-2">
                <div className="thumb w-100">
                  <Link
                    href={`/product/${getSlug(
                      offer.product.data.name,
                      offer.product.data.id
                    )}`}
                  >
                    <a>
                      <Image
                        loader={reflauntLoader}
                        src={
                          (
                            offer.product.data.media.data.find((i) => i.main) ||
                            offer.product.data.media.data[0]
                          ).original_image
                        }
                        alt=""
                        width={96}
                        height={115}
                        objectFit="cover"
                      />
                    </a>
                  </Link>
                </div>
                <div className="info flex-1 text-sm pl-4">
                  <h3 className="font-helveticaNeue500 uppercase mb-1">
                    {offer.product.data.name}
                  </h3>
                  <p className="mb-2">
                    <Price price={offer.product_original_price} />
                  </p>
                  <p className="mb-2">
                    SIZE: {offer.product.data.size?.data.name}
                  </p>
                  <p className="mt-8 text-green">
                    Offer value:{" "}
                    <span className="font-helveticaNeue500">
                      <Price price={offer.amount || offer.initial_amount} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* ./Product */}

            {/* Line */}
            {!isExpired() && isActive() && (
              <div className="my-8">
                <hr className="border-t-grey my-8" />
              </div>
            )}
            {/* Line */}

            {/*Show button */}
            {myProfile && showDetail(myProfile.id === offer.seller_id)}
            {/*Show button */}

            <MakeAnOfferModal
              toggleMakeAnOfferModal={toggleMakeAnOfferModal}
              active={showMakeAnOfferModal}
              productDetail={{
                ...offer.product.data,
                base_currency_price: offer.product_original_price,
              }}
              counterOffer={true}
              offer={offer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
