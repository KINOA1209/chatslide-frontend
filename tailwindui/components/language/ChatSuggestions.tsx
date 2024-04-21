import TextSlider, { TextBox } from "../ui/TextSlider";

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
};


const ChatSuggestions: React.FC<{
	language?: string;
	isCover: boolean;
	sendChat: (chat: string) => void;
}> = ({
	language,
	isCover,
	sendChat
}) => {
		const suggestions = isCover ? CHAT_SUGGESTIONS.cover : CHAT_SUGGESTIONS.noncover;

		return (
			<div className='w-full'>
				<TextSlider slidesToShow={1} rows={2}>
					{suggestions.map((chat) => (
						<div className='hover:cursor-pointer' key={chat} onClick={() => sendChat(chat)}>
							<TextBox key={chat}>{chat}</TextBox>
						</div>
					))}
				</TextSlider>
			</div>
		)
	};

export default ChatSuggestions;
