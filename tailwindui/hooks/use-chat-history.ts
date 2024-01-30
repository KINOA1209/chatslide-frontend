import { useEffect, useMemo, useRef } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import ChatHistory from '@/models/ChatHistory';

const useChatHistoryBear = createBearStore<ChatHistory[]>()('chatHistory', [], true);

export enum ChatHistoryStatus {
  NotInited,
  Initing,
  Inited,
}

let chatHistoryStatus: ChatHistoryStatus = ChatHistoryStatus.NotInited;

export const useChatHistory = () => {
  const { chatHistory, setChatHistory } = useChatHistoryBear();

  const init = async () => {
    if (chatHistoryStatus !== ChatHistoryStatus.NotInited) return;
    chatHistoryStatus = ChatHistoryStatus.Initing;

    setChatHistory([]);

    console.log('-- init chat history: ', { chatHistoryStatus, chatHistory })

    chatHistoryStatus = ChatHistoryStatus.Inited;
  }

  const addChatHistory = (chat: ChatHistory) => {
    console.log('-- add chat history: ', { chat })
    const newChatHistory = [...chatHistory, chat];
    setChatHistory(newChatHistory);
  }

  const clearChatHistory = () => {
    console.log('-- clear chat history: ', { chatHistory })
    setChatHistory([]);
  }

  useEffect(() => {
    void init();
  }, []);


  // console.log('-- useUser: ', {user, session, isPaidUser})

  return { chatHistory, addChatHistory, clearChatHistory, chatHistoryStatus };
};
