'use client';
import { ChatHistoryStatus, useChatHistory } from '@/hooks/use-chat-history';
import { useSlides } from '@/hooks/use-slides';
import { useUser } from '@/hooks/use-user';
import ChatHistory, { RegenerateSelection } from '@/models/ChatHistory';
import Slide from '@/models/Slide';
import { useEffect, useState, useRef, use, ChangeEvent } from 'react';
import { useProject } from '@/hooks/use-project';
import { useImageStore } from '@/hooks/use-img-store';
import './ChatBot.css';
import React from 'react';
import UserService from '@/services/UserService';
import ChatBotService from '@/services/ChatBotService';


type ChatsProps = {
	chatHistory: ChatHistory[];
	lastMessageRef: React.MutableRefObject<HTMLDivElement | null>;
	addChatHistory: (chat: ChatHistory) => void; // Change setChatHistory to addChatHistory
	updateImgUrlArray: Function;
	slides: Slide[];
	currentSlideIndex: number;
	updateSlidePage: Function;
};

// Component definition using an arrow function
const Chats: React.FC<ChatsProps> = ({
	chatHistory,
	lastMessageRef,
	addChatHistory, // Replace setChatHistory with addChatHistory
	updateImgUrlArray,
	slides,
	currentSlideIndex,
	updateSlidePage,
}) => {
	const setImageSource = useImageStore((state) => state.setSourceImage);
	// const setImageUrl = useImageStore((state) => state.setImageUrl);
	const [currentImageUrls, setCurrentImageUrls] = useState<string[]>([]);
	useEffect(() => {
		// Find the current chat's image URLs and set them in state
		const currentChat = chatHistory[chatHistory.length - 1];
		if (currentChat && currentChat.imageUrls) {
			setCurrentImageUrls(currentChat.imageUrls);
		} else {
			setCurrentImageUrls([]);
		}
	}, [chatHistory]);
	// const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [sourceImage, setSourceImage] = useState<string>('');
	const [selectedRegenerateTone, setSelectedRegenerateTone] = useState<string>('');
	const { slideIndex } = useSlides();
	const { project } = useProject();
	const [loading, setLoading] = useState(false);
	const { token, username } = useUser();
	const {
		setChatHistory,
		regenerateText,
		setRegenerateText,
		setIsRegenerateSelected,
		addEmojiToChatHistory
	} = useChatHistory()
	//const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

	// const handleImageDragStart = (imageUrl: string) => {
	const handleImageDragStart = (imageUrl: string) => {
		setImageSource(imageUrl); // Update the sourceImage in the store
	};

	const addErrorMessage = (content: string): ChatHistory => ({
		role: 'assistant',
		content,
	});

	const addSuccessMessage = (
		content: string | JSX.Element,
		imageUrls?: string[],
		isFeeedback?: boolean
	): ChatHistory => ({
		role: 'assistant',
		content,
		imageUrls, // Include imageUrls in the chat history entry
		isFeedback: isFeeedback,
	});

	const addChoicesMessage = (
		chat: string,
		suggestions: string[][],
		selectedSuggestion: number | null,
		isFeedback?: boolean
	): ChatHistory => ({
		role: 'assistant',
		content: { chat: chat, suggestions: suggestions, selectedSuggestion: selectedSuggestion } as RegenerateSelection,
		isFeedback: isFeedback,
	})

	const handleRegenerateTextClick = (
		currentIndex: number,
		suggestion_title: string,
		suggestion: string,
		index: number | string,
	) => {
		setRegenerateText(suggestion)
		setIsRegenerateSelected(true)

		//update the current chathistory
		const currentEntry = chatHistory[currentIndex]

		if (typeof currentEntry.content === 'object' && 'suggestions' in currentEntry.content && 'selectedSuggestion' in currentEntry.content) {
			const newContent = {
				...currentEntry.content,
				suggestions: [[suggestion_title, suggestion]],
				selectedSuggestion: index === 'Original' ? index : 0,
			}

			const newChatHistories = [...chatHistory];
			newChatHistories[currentIndex] = {
				...currentEntry,
				content: newContent
			};
			setChatHistory(newChatHistories);
		}
		else {
			console.error('Attempted to update selectedSuggestions on an entry with invalid content type');
		}
		const successMessage = addSuccessMessage(`✅ Replaced the text successfully.`)
		addChatHistory(successMessage)
	}

	const regenerateResponseJSX = (
		currentIndex: number,
		chat: string,
		suggestions: string[][],
		selectedSuggestion: number | string | null,
	): JSX.Element => {

		const isThumbDownFollowUp = chat.includes('Sorry to hear that')

		return (
			<div>
				<span>{chat}</span>
				<div className='gap-3 flex flex-col'>
					{suggestions.map((suggestion, index) => (
						selectedSuggestion === null || selectedSuggestion === index ? (
							<button
								key={index}
								disabled={selectedSuggestion !== null}
								onClick={() => {
									if (isThumbDownFollowUp) {
										const message = addSuccessMessage(`😉 Thank you for your feedback, we will improve!`, undefined, true);
										addChatHistory(message);
										UserService.submitFeedback(1, username + ' said ' + suggestion[0], project?.id || '', token);
									} else {
										handleRegenerateTextClick(currentIndex, suggestion[0], suggestion[1], index);
									}
								}}
								className={`
									gap-3 rounded-lg px-3 py-2 text-left text-xs flex bg-[#EFF4FF] flex flex-col border border-solid border-[#EFF4FF] 
									hover:bg-white
								`}
							>
								<span className='text-gray-700 font-bold'>{index + 1}. {suggestion[0]}</span>
								{
									suggestion.length > 1 &&
									<span>{suggestion[1]}</span>
								}
							</button>
						) : null
					))}
					{(selectedSuggestion === null || selectedSuggestion === 'Original') && !isThumbDownFollowUp && (
						<button
							disabled={selectedSuggestion !== null}
							onClick={() => handleRegenerateTextClick(currentIndex, 'Original', regenerateText, 'Original')}
							className={`
								gap-3 rounded-lg px-3 py-2 text-left text-xs flex bg-[#EFF4FF] flex flex-col border border-solid border-[#EFF4FF] 
								hover:bg-white
							`}
						>
							<span className='text-gray-700 font-bold'>Original</span>
							<span>{regenerateText}</span>
						</button>
					)}
				</div>
			</div>
		)
	}

	const handleChatFeedback = (index: number, emoji: string) => {
		addEmojiToChatHistory(index, emoji)
		UserService.submitFeedback(emoji === '👍' ? 5 : 0, username + ' said ' + emoji, project?.id || '', token);
		if (emoji === '👍') {
			const successMessage = addSuccessMessage(`✌️ Thank you for your feedback!`, undefined, true);
			addChatHistory(successMessage)
		} else if (emoji === '👎') {
			const undoMessage = addSuccessMessage('↩ You can say "undo" to undo the last action. Or click the button in the tool bar.', undefined, true);
			addChatHistory(undoMessage);

			const message = addChoicesMessage('🤕 Sorry to hear that. May I know what went wrong?',
				[
					['Assistant did not understand my request'],
					['The content is not accurate'],
					['Assistant is too slow'],
					['Others']
				],
				null,
				true
			)
			addChatHistory(message);
		}
	}

	const handleToneClick = async (choice: string) => {
		setSelectedRegenerateTone(choice)
		const regenerate_prompt = `Rewrite this text to be more ${choice.toLowerCase()}.`
		addChatHistory({
			role: 'user',
			content: regenerate_prompt
		})
		addChatHistory({
			role: 'assistant',
			content: `Sure, I'll start to rewrite...`
		})
		const lastChatMessages = chatHistory
			.slice(-3)
			.map((chat) => ({ role: chat.role, content: chat.content }));
		setLoading(true);
		const chatResponse = await ChatBotService.chat(
			regenerate_prompt,
			lastChatMessages,
			token,
			slides[currentSlideIndex],
			project?.id || '',
			slideIndex,
			regenerateText,
		);
		console.log('responseData structure:', chatResponse);
		if (!chatResponse.chat || !chatResponse.suggestions) {
			// network fails, backend fails
			addChatHistory(addErrorMessage(chatResponse.chat));
		} else if (!chatResponse.suggestions) {
			// ai does not understand
			const errorMessage = addErrorMessage('😞 Sorry, I do not understand your request, can you try again?')
			addChatHistory(errorMessage)
		} else {
			const regenerate_choices = addChoicesMessage(chatResponse.chat, chatResponse.suggestions, null)
			addChatHistory(regenerate_choices)
		}
	}

	return (
		<>
			{chatHistory.map((chat, index) => (
				<>
					<div
						key={index}
						ref={index === chatHistory.length - 1 ? lastMessageRef : null}
						className={
							chat.role === 'user'
								? 'px-3.5 py-2.5 bg-indigo-500 rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-white gap-2.5 self-end flex flex-wrap max-w-[15rem]'
								: 'px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200 gap-2.5 max-w-[15rem] flex flex-wrap relative'
						}
					>
						<div
							className={
								chat.role === 'user'
									? 'grow shrink basis-0 text-gray-100 text-base font-normal   text-wrap'
									: 'text-neutral-800 text-base font-normal text-wrap'
							}
						>
							{/* Directly render chat.content if it's a React element */}
							<div className='blue-links'>
								{/* {React.isValidElement(chat.content) ? chat.content
								: <span dangerouslySetInnerHTML={{ __html: chat.content }}></span>} */}
								{typeof chat.content === 'object' && 'chat' in chat.content && 'suggestions' in chat.content && 'selectedSuggestion' in chat.content ?
									regenerateResponseJSX(index, chat.content.chat, chat.content.suggestions, chat.content.selectedSuggestion) :
									<span dangerouslySetInnerHTML={{ __html: chat.content }}></span>
								}
							</div>

							{/* Check if there are choices and render choices */}
							{chat.choices && chat.choices.length > 0 && (
								<div className='w-full flex flex-wrap gap-2 mt-2'>
									{chat.choices.map((choice, index) => (
										<button
											className="bg-white text-[#5168F6] text-sm px-3 py-2 rounded-lg border border-solid border-[#5168F6]
												   hover:bg-[#ECF1FE] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
												  "
											key={index}
											onClick={() => handleToneClick(choice)}>
											{choice}
										</button>
									))}
								</div>
							)}

							{/* Check if there are imageUrls and render image previews */}
							{chat.imageUrls && chat.imageUrls.length > 0 && (
								<div
									className='flex flex-wrap gap-2 mt-2'
									style={{ width: '100%' }}
								>
									{chat.imageUrls.map((imageUrl, i) => (
										<div
											key={i}
											className='image-preview-container cursor-grab'
											style={{ width: 'calc(50% - 4px)', marginBottom: '4px' }}
											draggable // Make the image container draggable
											onDragStart={() => handleImageDragStart(imageUrl)} // Call handleImageDragStart with imageUrl
										>
											<img
												src={imageUrl}
												alt={`Image ${i + 1}`}
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'contain',
												}}
											/>
										</div>
									))}
								</div>
							)}

							{/* selected emoji */}
							{chat.emoji &&
								<div className='absolute drop-shadow-md bottom-[-10px] right-2 cursor-default'>
									<span>{chat.emoji}</span>
								</div>
							}
						</div>

					</div>
					{index === chatHistory.length - 1 && chat.role === 'assistant' &&
						<div className='flex flex-row gap-2 ml-2'>
							<div className='text-xl cursor-pointer drop-shadow-lg' id='chat-thumbs-up'
								onClick={() => handleChatFeedback(index, '👍')}>
								👍
							</div>
							<div className='text-xl cursor-pointer drop-shadow-lg' id='chat-thumbs-down'
								onClick={() => handleChatFeedback(index, '👎')}>
								👎
							</div>
						</div>
					}
				</>
			))}
		</>
	);
};

export default Chats;
