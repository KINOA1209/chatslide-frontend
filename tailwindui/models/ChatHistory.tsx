import Slide from './Slide';

type ChatHistory = {
	role: 'user' | 'assistant';
	content: string | JSX.Element | RegenerateSelection;
	choices?: string[];
	imageUrls?: string[];
	emoji?: string; // only for assistant messages
	isFeedback?: boolean;
};

export type ChatResponse = {
	role: 'assistant';
	slide?: Slide;
	action?: string;
	suggestions?: string[][]; // used for regenerating the selection
	chat: string; // used for regenerating the selection
	images?: string[]; // url
	chartData?: any;
};

export type Chat = ChatHistory;

export type RegenerateSelection = {
	chat: string;
	suggestions: string[][];
	selectedSuggestion: number | string | null;
};

export default ChatHistory;
