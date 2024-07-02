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
    mode?: 'script' | 'slide' | 'chart',
		model?: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4o',
	): Promise<ChatResponse> {
    // console.log('mode', mode)

    if (!mode) mode = 'slide'

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
          mode: mode,
					model: model,
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

  static async chatChart(
    prompt: string,
    prevPrompts: Chat[],
    token: string,
    model: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4o',
	responseType: 'img' | 'json',
  ): Promise<ChatResponse> {
    // console.log('mode', mode)

    const messages = [
			...prevPrompts
				.map(formatPrevChat)
				.filter((x) => x !== null).filter((x) => x?.role === 'user')
				.map((x) => x?.content)
				.slice(-5),
			prompt,
		];

    try {
      if (responseType === 'img') {
		const resp = await fetch('/api/chart/chat', {
        method: 'POST',
        headers: {
          	'Content-Type': 'application/json',
          	Authorization: 'Bearer ' + token,
        	},
        body: JSON.stringify({
			messages: messages,
			model: model,
        	}),
      	});
      	const url = (await resp.json()).data.url;
      	return { chat: '📈 I have updated the chart for you', role: 'assistant', images: [url] };
	} else {
      const chartresp = await fetch('/api/chart/get_chart_json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
			user_input: messages,
			model_name: model,
        }),
      });

	  const chartData = (await chartresp.json()).data;
      return { chat: '📈 I have updated the chart for you', role: 'assistant', chartData: chartData };
	}
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
