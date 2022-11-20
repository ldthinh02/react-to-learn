import create from "zustand";
import { persist } from "zustand/middleware";

export const useChatBox = create<{
  chatData: ChatBoxType;
  setChatData: (value: ChatBoxType) => void;
  resetChatData: (profileId?: number) => void;
}>(
  persist(
    (set) => ({
      chatData: {} as ChatBoxType,
      resetChatData: (profileId) => {
        if (profileId)
          set({ chatData: { profileId: profileId } as ChatBoxType });
        else set({ chatData: {} as ChatBoxType });
      },
      setChatData: (chatData) => set({ chatData: chatData }),
    }),
    {
      name: "chatBoxState", // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
