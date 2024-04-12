export default interface ChatHistory {
	role: 'user' | 'assistant';
	content: string | JSX.Element | RegenerateSelection;
	choices?: string[];
	imageUrls?: string[]; // Include imageUrls in the chat history entry
}

export interface RegenerateSelection {
	chat:string;
	suggestions: string[][],
}