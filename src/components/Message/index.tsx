import { useChatBox } from "@/hooks/useChatBox";
import { reflauntLoader } from "@/utils/imageLoader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Price from "@/components/Price";
import { getSlug } from "@/utils/file";
interface Message {
  conversation: ConversationApiData;
  profile: ProfileApiData;
  unreadList: UnreadMessage[];
}

const Message = ({ conversation, profile, unreadList }: Message) => {
  const product = conversation.product.data;
  const seller = conversation.product.data.user.data.customer.data;
  const buyer = conversation.customer.data.customer.data;
  const isProductSeller = conversation.product.data.user.data.id === profile.id;
  const order = conversation.order_package?.data?.order?.data;

  const router = useRouter();
  const { chatData, setChatData } = useChatBox();

  const { message_id } = router.query;

  useEffect(() => {
    if (message_id && Number(message_id) === conversation.id) {
      onClick();
    }
  }, [message_id]);

  const onClick = () => {
    let newChatData = {
      ...chatData,
      product: { ...product, seller_info: seller },
      conversation: conversation,
      profileId: profile.id,
      is_buyer: false,
    };

    if (order) {
      newChatData = {
        ...newChatData,
        order: {
          order_id: String(order.order_id),
          order_package_id: conversation.order_package.data.id,
          user: {
            first_name: !isProductSeller ? seller.first_name : buyer.first_name,
            nickname: !isProductSeller ? seller.nickname : buyer.nickname,
          },
        },
      };
    }
    setChatData(newChatData);
  };

  return (
    <div
      className="message-single relative border border-grey p-4 pr-8 mb-4 flex cursor-pointer before:absolute before:top-2/4 before:right-4 before:w-4 before:h-4 before:bg-message-arrow before:bg-no-repeat before:bg-center before:bg-100% before:-mt-2"
      onClick={onClick}
    >
      <div className="w-2/3 lg:w-2/4">
        <div className="user-profile-block flex order-2 lg:order-1">
          <div className="thumb w-16">
            <Image
              className="w-full h-16 rounded-full object-cover"
              loader={reflauntLoader}
              src={
                (!isProductSeller
                  ? seller.profile_picture
                  : buyer.profile_picture) ||
                "/assets/images/Default_Profile.svg"
              }
              alt=""
              width={64}
              height={64}
            />
          </div>
          <div className="info pl-2 lg:pl-4 w-100 lg:w-auto">
            {unreadList
              .map((item) => item.conversation_id)
              .includes(conversation.id) && (
              <p className="font-helveticaNeue500 text-pink uppercase text-[12px] mb-1">
                New message!
              </p>
            )}
            <h3 className="font-helveticaNeue500 text-dark uppercase text-lg mb-0.5 break-all">
              {!isProductSeller ? seller.first_name : buyer.first_name}
            </h3>
            <p className="font-helveticaNeue500 text-dark uppercase text-sm mb-0.5">
              {!isProductSeller ? `@${seller.nickname}` : `@${buyer.nickname}`}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 lg:w-2/4">
        {order ? (
          <div className="pt-6">
            Order number:{" "}
            <span className="font-helveticaNeue500">{order.order_id}</span>
          </div>
        ) : (
          <div className="product-popup flex w-full text-left">
            <div className="thumb w-16">
              <Link href={`/product/${getSlug(product.name, product.id)}`}>
                <a>
                  <Image
                    loader={reflauntLoader}
                    className="w-full"
                    src={product.media.data[0].original_image}
                    alt=""
                    width={64}
                    height={76}
                    objectFit="cover"
                  />
                </a>
              </Link>
            </div>
            <div className="info flex-1 text-sm pl-4 hidden lg:block">
              <h3 className="font-helveticaNeue500 uppercase mb-1">
                {product.name}
              </h3>
              <p className="mb-2">
                <Price price={product.price} />
              </p>
              {product?.size?.data.name && (
                <p className="mb-2">SIZE: {product?.size?.data.name}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
