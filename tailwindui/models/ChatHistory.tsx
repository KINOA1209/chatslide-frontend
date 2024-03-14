export default interface ChatHistory {
	role: 'user' | 'assistant';
	content: string | JSX.Element;
	choices?: string[];
	imageUrls?: string[]; // Include imageUrls in the chat history entry
}
