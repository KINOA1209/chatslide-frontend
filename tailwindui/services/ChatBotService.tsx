import { Chat, ChatResponse } from '@/models/ChatHistory';
import Slide from '@/models/Slide';

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
					prev_prompts: prevPrompts.filter((p) => p.role === 'user').map((p) => p.content).slice(-5),
					page_index: pageIndex,
					selected_text: selectedText,
				}),
			});
			return {...(await resp.json()).data, role: 'assistant'};
		} catch (error) {
			console.error(error);
			return {
				role: 'assistant',
				content: '😞 Sorry, I do not understand your request, can you try again?',
			}
		}
	}
}

export default ChatBotService;