import TextSlider, { TextBox } from '../ui/TextSlider';

const CHAT_SUGGESTIONS = {
	cover: [
		'💬 Change topic to be more engaging',
		'🔠 Capitalize the topic',
		'🌐 Translate topic to Spanish',
		'🌁 Change the image on the slide',
	],
	noncover: [
		'🧠 Add a summarizing page',
		'📊 Add a column to this page',
		'🎨 Add a photo about nature',
		'📈 Add data to the content',
		'🌄 Change the background of this page',
		'📝 Add an example to the content',
	],
  script: [
    '📝 Add more details in the script',
    '🔠 Make the script funnier',
    '🌐 Translate script to German',
    '💬 Make the script easier to understand',
  ],
};

const ChatSuggestions: React.FC<{
	language?: string;
	type: 'script' | 'cover' | 'noncover';
	sendChat: (chat: string) => void;
}> = ({ language, type, sendChat }) => {
	const suggestions = CHAT_SUGGESTIONS[type];

	return (
		<div className='w-full'>
			<TextSlider slidesToShow={1} rows={2}>
				{suggestions.map((chat) => (
					<div
						className='hover:cursor-pointer'
						key={chat}
						onClick={() => sendChat(chat)}
					>
						<TextBox key={chat}>{chat}</TextBox>
					</div>
				))}
			</TextSlider>
		</div>
	);
};

export default ChatSuggestions;
