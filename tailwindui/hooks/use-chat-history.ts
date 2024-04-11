import { useEffect, useMemo, useRef } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import ChatHistory from '@/models/ChatHistory';

const useChatHistoryBear = createBearStore<ChatHistory[]>()(
	'chatHistory',
	[],
	true,
);

const useIsChatWindowOpenBear = createBearStore<boolean>()('isChatWindowOpen', false, true)
const useRegenerateTextBear = createBearStore<string>()('regenerateText', '', true)
const useIsRegenerateSelectedBear = createBearStore<boolean>()('isRegenerateSelected', false, true)

export enum ChatHistoryStatus {
	NotInited,
	Initing,
	Inited,
}

let chatHistoryStatus: ChatHistoryStatus = ChatHistoryStatus.NotInited;

export const useChatHistory = () => {
	const { chatHistory, setChatHistory } = useChatHistoryBear();
	const { isChatWindowOpen, setIsChatWindowOpen } = useIsChatWindowOpenBear();
	const { regenerateText, setRegenerateText } = useRegenerateTextBear();
	const { isRegenerateSelected, setIsRegenerateSelected } = useIsRegenerateSelectedBear();

	const init = async () => {
		if (chatHistoryStatus !== ChatHistoryStatus.NotInited) return;
		chatHistoryStatus = ChatHistoryStatus.Initing;

		console.log('-- init chat history: ', { chatHistoryStatus, chatHistory });

		chatHistoryStatus = ChatHistoryStatus.Inited;
	};

	const addChatHistory = (chat: ChatHistory) => {
		console.log('-- add chat history: ', { chat });
		setChatHistory((prevChatHistory) => [...prevChatHistory, chat]);
	};

	const clearChatHistory = () => {
		console.log('-- clear chat history: ', { chatHistory });
		setChatHistory([]);
	};

	useEffect(() => {
		void init();
	}, []);

	// console.log('-- useUser: ', {user, session, isPaidUser})

	return {
		chatHistory,
		addChatHistory,
		clearChatHistory,
		chatHistoryStatus,
		isChatWindowOpen,
		setIsChatWindowOpen,
		regenerateText,
		setRegenerateText,
		isRegenerateSelected,
		setIsRegenerateSelected,
	};
};
