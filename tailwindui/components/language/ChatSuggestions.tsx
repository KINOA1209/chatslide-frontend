import TextSlider, { TextBox } from '../ui/TextSlider';

const CHAT_SUGGESTIONS = {
	cover: [
		'💬 Change topic to be more engaging',
		'🔠 Capitalize the topic',
		'🌐 Translate topic',
		'🌁 Change the image on the slide',
	],
	noncover: [
		'🧠 Add a summarizing page',
		'📊 Add a column to this page',
		'🎨 Add a photo about nature',
		'🔢 Use a list of keywords only',
		'🌄 Change the background of this page',
		'📝 Add an example to the content',
	],
	script: [
		'📝 Add more details in the script',
		'🤣 Make the script funnier',
		'🌐 Translate script',
		'💬 Make the script easier to understand',
	],
	chart: [
		'🇺🇸 Harris VS Trump',
		'📊 Population in European countries',
		'☕️ Coffee consumption per capita in the world',
		'🍎 Largest market cap companies',
	],
};

const ChatSuggestions: React.FC<{
	language?: string;
	type: 'script' | 'cover' | 'noncover' | 'chart';
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
