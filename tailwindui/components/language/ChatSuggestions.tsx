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
		'💹 Japanese stock market from 2014 to 2020',
		'📊 Population in European countries',
		'📈 40% YoY growth of company XYZ',
		'🥧 Three companies in the market, with 50%, 35%, 15% market shares',
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
