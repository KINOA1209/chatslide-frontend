import { useEffect, useMemo, useRef } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import ChatHistory from '@/models/ChatHistory';

const useChatHistoryBear = createBearStore<ChatHistory[]>()('chatHistory', [{ role: 'system', content: 'You are a helpful assistant.' }], true);

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
  }

  const addChatHistory = (chat: ChatHistory) => {
    const newChatHistory = [...chatHistory, chat];
    setChatHistory(newChatHistory);
  }

  const clearChatHistory = () => {
    setChatHistory([]);
  }

  useEffect(() => {
    void init();
  }, []);


  // console.log('-- useUser: ', {user, session, isPaidUser})

  return { chatHistory, addChatHistory, clearChatHistory, chatHistoryStatus };
};
