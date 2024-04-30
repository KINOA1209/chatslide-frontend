import { Chat, ChatResponse, RegenerateSelection } from '@/models/ChatHistory';
import Slide from '@/models/Slide';

function formatPrevChat(prevPrompt: Chat): Chat | null {
	if (prevPrompt?.isFeedback) return null;

	const content = prevPrompt.content;

	switch (typeof content) {
		case 'string':
			return prevPrompt;
		case 'object':
			if ('chat' in content) {
				return {
					...prevPrompt,
					content: content.chat,
				};
			}
			return null;
		default:
			return null;
	}
}

class ChatBotService {
	static async chat(
		prompt: string,
		prevPrompts: Chat[],
		token: string,
		slide: Slide,
		projectId: string,
		pageIndex: number,
		selectedText?: string,
	): Promise<ChatResponse> {
		try {
			const resp = await fetch('/api/ai_gen_slide', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify({
					slide: slide,
					project_id: projectId,
					prompt: prompt,
					prev_prompts: prevPrompts
						.map(formatPrevChat)
						.filter((x) => x !== null)
						.slice(-5),
					page_index: pageIndex,
					selected_text: selectedText,
				}),
			});
			return { ...(await resp.json()).data, role: 'assistant' };
		} catch (error) {
			console.error(error);
			return {
				role: 'assistant',
				chat: '😞 Sorry, I do not understand your request, can you try again?',
			};
		}
	}
}

export default ChatBotService;
