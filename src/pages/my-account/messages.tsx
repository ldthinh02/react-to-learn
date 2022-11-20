import Message from "@/components/Message";
import MyAccountSideSection from "@/components/MyAccountSideSection";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetConversationsBySeller } from "@/hooks/useGetConversationsBySeller";
import { useGetMyProfile } from "@/hooks/useProfile";
import { useEffect, useState } from "react";
import ListingEmpty from "@/components/ListingEmpty";
import { useGetMyUnreadMessages } from "@/hooks/useGetMyUnreadMessages";
import { useMarkAsRead } from "@/hooks/useMarkAsRead";
import { useGetMyConversations } from "@/hooks/useGetMyConversations";
import Authenticate from "@/components/Authenticate";
import { STATUS_CONVERSATION_NOT_SHOW } from "@/utils/constants";
import HeaderSeo from "@/components/HeaderSeo";
import { useChatBox } from "@/hooks/useChatBox";

const MyAccountMessages = () => {
  const { isLoggedIn } = useAuthentication();
  const { data: profile } = useGetMyProfile();
  const { data: conversationsApiData, refetch: refetchConversationsApiData } =
    useGetConversationsBySeller({
      seller_id: Number(profile?.id),
    });
  const { data: unreadMessageDataApi, refetch } = useGetMyUnreadMessages();
  const [listConversation, setListConversation] = useState<
    MyConversationApiData[]
  >([]);
  const { chatData } = useChatBox();
  const [unreadList, setUnreadList] = useState<UnreadMessage[]>([]);
  const { mutate: markAsRead } = useMarkAsRead();
  const { data: dataConversations, refetch: refetchConversations } =
    useGetMyConversations();

  useEffect(() => {
    if (unreadMessageDataApi) {
      setUnreadList(unreadMessageDataApi.unreads_message);
    }
  }, [unreadMessageDataApi]);

  useEffect(() => {
    if (dataConversations) {
      setListConversation(dataConversations.data as MyConversationApiData[]);
    }
  }, [dataConversations]);

  const checkConversation = (id: number) => {
    const conversation = listConversation.find(
      (item) => item.inbox_conversation.data.id === id
    );
    if (conversation) {
      const message = conversation.inbox_message.data;
      return !STATUS_CONVERSATION_NOT_SHOW.includes(message.type);
    }
    return true;
  };

  useEffect(() => {
    if (chatData.product && chatData.conversation) {
      const data = unreadList.find(
        (c) => c.conversation_id === chatData.conversation.id
      );
      if (data) {
        markAsRead(
          {
            user_id: data.user_id,
            message_id: data.message_id,
            conversation_id: data.conversation_id,
          },
          {
            onSuccess: () => {
              refetch();
              refetchConversations();
              refetchConversationsApiData();
            },
          }
        );
      }
    }
  }, [chatData]);

  const getListMessage = () => {
    return conversationsApiData
      ? conversationsApiData
          .filter((item) => checkConversation(item.id))
          .filter((item) => item.product.data.user)
      : [];
  };

  if (!isLoggedIn) return <Authenticate />;

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - My Address"
        description="GanniRepeat - My Account - My Address"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={10} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Messages
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {profile && getListMessage().length > 0 ? (
              getListMessage().map((conversation: ConversationApiData) => {
                return (
                  <Message
                    key={conversation.id}
                    conversation={conversation}
                    profile={profile}
                    unreadList={unreadList}
                  />
                );
              })
            ) : (
              <ListingEmpty
                title="You have no messages yet!"
                sub_title="You can view messages sent and received about items you are buying or selling here."
                isNewIn
                isSell
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountMessages;
