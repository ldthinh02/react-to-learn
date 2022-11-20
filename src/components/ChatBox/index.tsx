import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useChatBox } from "@/hooks/useChatBox";
import { useGetConversationAndMessageMyAccount } from "@/hooks/useGetConversationAndMessageMyAccount";
import { useFormik } from "formik";
import { messageFormSchema } from "@/utils/validations";
import { usePostMessage } from "@/hooks/usePostMessage";
import { useMarkAsRead } from "@/hooks/useMarkAsRead";
import InputFormik from "../InputFormik";
import dayjs from "dayjs";
import { reflauntLoader } from "@/utils/imageLoader";
import { STATUS_CONVERSATION_NOT_SHOW } from "@/utils/constants";
import { useGetConversationAndMessageProductDetail } from "@/hooks/useGetConversationAndMessageProductDetail";
import { usePostConversation } from "@/hooks/usePostConversation";
import Price from "@/components/Price";
import Rating from "@/components/Rating";

interface Rate {
  count: number;
  total: number;
}

const ConversationBox = () => {
  const { chatData, resetChatData } = useChatBox();
  const [messages, setMessages] = useState<Message[]>([]);
  const [nameChat, setNameChat] = useState<CustomerApiData>(
    chatData.customer as CustomerApiData
  );
  const [rate, setRate] = useState<Rate>({
    count: 5,
    total: 0,
  });

  const { mutate: getConversationAndMessageProductDetail } =
    useGetConversationAndMessageProductDetail();
  const { mutate: createMessage, isLoading: isCreateMessageLoading } =
    usePostMessage();
  const { mutate: createConversation } = usePostConversation();
  const { mutate: markAsRead } = useMarkAsRead();

  const { refetch: refetchConversation } =
    useGetConversationAndMessageMyAccount({
      conversation: chatData.conversation,
      setMessages: setMessages,
    });

  useEffect(() => {
    if (chatData.product && !chatData.conversation.id) {
      getConversationAndMessageProductDetail({
        product: chatData.product,
        customerId: chatData.buyer_id as number,
        setMessages: setMessages,
        setNameChat: setNameChat,
      });
    }
  }, [chatData.product]);

  useEffect(() => {
    if (chatData.product && chatData.conversation.id) {
      refetchConversation();
      const user = chatData.conversation.product.data.user.data;
      const seller = user.customer.data;
      const buyer = chatData.conversation.customer.data.customer.data;

      if (user.id !== chatData.profileId) {
        changeRateData(user.rate, user.number_rate);
      } else {
        changeRateData(buyer.rate, buyer.number_rate);
      }

      if (chatData.customer) setNameChat(chatData.customer);
      else if (
        buyer.id === chatData.profileId ||
        user.id === chatData.profileId
      ) {
        setNameChat(buyer);
      } else setNameChat(seller);
    }
  }, [chatData]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToChatBottom();
    }
  }, [messages]);

  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: messageFormSchema,
    onSubmit: (values: { message: string }) => {
      if (values.message) {
        if (!chatData.conversation.id) {
          createNewConversation(values.message);
        } else createNewMessage(chatData.conversation.id, values.message);
      }
    },
  });

  const changeRateData = (rate: number, total: number) => {
    if (rate > 0) setRate({ count: rate, total: total });
  };

  const createNewConversation = (message: string) => {
    const order = chatData.order;
    const data: ConversationPostData = {
      product_id: String(chatData.product?.id),
      title: !order
        ? (chatData.product?.name as string)
        : `Conversation order number: ${order.order_id}`,
      buyer_id: chatData.buyer_id ? String(chatData.buyer_id) : "",
      order_package_id: order ? String(order.order_package_id) : "",
    };
    createConversation(data, {
      onSuccess: (data) => {
        createNewMessage(data.id, message);
      },
    });
  };

  const createNewMessage = (conversationId: number, message: string) => {
    createMessage(
      {
        conversation_id: conversationId,
        message: message,
      },
      {
        onSuccess: (data) => {
          const newMessages = [...messages];
          newMessages.push(data as Message);
          setMessages(newMessages);
          scrollToChatBottom();
          messageForm.setFieldValue("message", "");

          const result = chatData.unreadList.find(
            (c) => c.conversation_id === chatData.conversation.id
          );
          if (result) {
            markAsRead({
              user_id: result.user_id,
              message_id: result.message_id,
              conversation_id: result.conversation_id,
            });
          }
        },
      }
    );
  };

  const objDiv = useRef<HTMLDivElement>(null);
  const scrollToChatBottom = () => {
    if (objDiv && objDiv.current) {
      objDiv.current.scrollTop = objDiv.current.scrollHeight;
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 z-[60] text-left align-middle transition-all bg-white shadow-xl mx-auto w-full lg:w-[345px] border border-grey h-full lg:h-[450px] ${
        chatData.product && chatData.conversation ? "block" : "hidden"
      }`}
    >
      <div className="border-0 h-full relative flex flex-col w-full bg-white">
        <div className="absolute top-[5px] right-0 items-start justify-end z-10">
          <button
            className="p-2 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => resetChatData(chatData.profileId)}
          >
            <span className="bg-transparent text-black text-2xl flex outline-none focus:outline-none">
              <Image
                src="/assets/images/close.svg"
                alt=""
                width={15}
                height={15}
              />
            </span>
          </button>
        </div>
        <div className="info flex text-sm items-baseline p-3">
          <div className="font-helveticaNeue500 w-[220px] uppercase text-dark">
            <span className="uppercase font-helveticaNeue500 text-[14px]">
              {chatData.order
                ? chatData.order.user.first_name
                : nameChat?.first_name}{" "}
            </span>
            <span className="font-helveticaNeue400 text-[14px] lowercase">
              {`@${
                chatData.order
                  ? chatData.order.user.nickname
                  : nameChat?.nickname
              }`}
            </span>
          </div>
          <div className="pt-1">
            <Rating rate={rate.count} values={rate.total} isHiddenTotal />
          </div>
        </div>
        <div className="flex mb-4 space-x-3 px-3 font-helveticaNeue500">
          {chatData.order ? (
            <>
              <p>
                Order number:{" "}
                <span className="font-helveticaNeue500">
                  {chatData.order.order_id}
                </span>
              </p>
            </>
          ) : (
            <>
              <Image
                loader={reflauntLoader}
                src={chatData.product?.media.data[0].original_image}
                alt="image"
                width={54}
                height={68}
                objectFit="cover"
              />
              <div>
                <p className="uppercase font-helveticaNeue text-[14px]">
                  {chatData.product?.name}
                </p>
                <p className="mb-3 font-helveticaNeue text-[14px]">
                  <Price
                    price={
                      chatData.is_buyer
                        ? chatData.product?.base_currency_price
                        : chatData.product.price
                    }
                  />
                </p>
                {chatData.product?.size?.data?.name && (
                  <p className="uppercase font-helveticaNeue text-[12px]">
                    SIZE:{" "}
                    {chatData.product?.size?.data?.name
                      ? chatData.product?.size?.data?.name
                      : "M"}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-full h-full scrollbar-thin mb-10">
          <div
            className="border border-l-0 border-r-0 border-t-grey bg-lightGrey px-6 h-full scrollbar scrollbar-thin overflow-y-auto pt-3"
            ref={objDiv}
          >
            {messages &&
              messages.length > 0 &&
              messages
                .filter(
                  (item) => !STATUS_CONVERSATION_NOT_SHOW.includes(item.type)
                )
                .map((message) => {
                  return (
                    <div
                      className={`message flex items-start space-x-4 mb-4 ${
                        message.sender_id === chatData.profileId
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                      key={message.id}
                    >
                      <div className="flex-shrink-0">
                        <Image
                          loader={reflauntLoader}
                          src={
                            message.user.data.customer.data.profile_picture ||
                            "/assets/images/Default_Profile.svg"
                          }
                          alt=""
                          width={48}
                          height={48}
                          className="rounded-full"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <p
                          className={`bg-grey p-3 font-helveticaNeue400 text-[14px] ${
                            message.sender_id === chatData.profileId
                              ? "rounded-tr-[10px] rounded-tl-[10px] rounded-bl-[10px]"
                              : "rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px]"
                          }`}
                        >
                          {message.message}
                        </p>
                        <p className="font-helveticaNeue400 pt-[8px] text-[12px] text-[#636363]">
                          {dayjs(message.created_at).format("DD/MM/YY HH:mm")}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className="absolute bottom-0 right-0 w-full">
            <form
              className="flex"
              name="form"
              onSubmit={messageForm.handleSubmit}
            >
              <InputFormik
                name="message"
                classes="w-full placeholder:text-mgrey !h-full border border-l-0 border-r-0 border-t-0 border-b-grey p-4"
                placeholder="Type your message"
                onChange={messageForm.handleChange}
                value={messageForm.values.message}
                wraperClasses="w-full"
                autoComplete="off"
              />
              <button
                className="bg-grey uppercase text-xs px-6 py-5 font-helveticaNeue500"
                type="submit"
                disabled={isCreateMessageLoading}
              >
                {isCreateMessageLoading ? "Sending" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
