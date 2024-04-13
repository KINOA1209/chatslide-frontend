'use client';
import { ChatHistoryStatus, useChatHistory } from '@/hooks/use-chat-history';
import { useSlides } from '@/hooks/use-slides';
import { useUser } from '@/hooks/use-user';
import ChatHistory, { RegenerateSelection } from '@/models/ChatHistory';
import Slide from '@/models/Slide';
import DrlambdaCartoonImage from '@/public/images/AIAssistant/DrLambdaCartoon.png';
import Image from 'next/image';
import { useEffect, useState, useRef, use, ChangeEvent } from 'react';
import { IoSend, IoSendOutline } from 'react-icons/io5';
import { DeleteIcon } from '@/app/(feature)/icons';
import { FaTimes } from 'react-icons/fa';
import { ScrollBar } from './ScrollBar';
import { useProject } from '@/hooks/use-project';
import { useImageStore } from '@/hooks/use-img-store';
import ChatSuggestions from '../language/ChatSuggestions';
import { stopArrowKeyPropagation } from '@/utils/editing';
import './ChatBot.css';
import React from 'react';

export const DrLambdaAIAssistantIcon: React.FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	return (
		<div
			className='rounded-md p-2 bg-white border border-gray-200 border-2 flex items-center justify-center relative'
			onClick={onClick}
		// style={{ animation: 'pulse 0.5s infinite' }}
		>
			<Image
				src={DrlambdaCartoonImage}
				alt={'DrLambdaAIAssistantImage'}
				className='w-[1.75rem] h-[2rem] z-10'
			></Image>
		</div>
	);
};

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
export const Chats: React.FC<ChatsProps> = ({
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
	const { slideIndex } = useSlides()
	const { project } = useProject();
	const [loading, setLoading] = useState(false);
	const { token } = useUser();
	const {
		setChatHistory,
		isChatWindowOpen,
		setIsChatWindowOpen,
		regenerateText,
		setRegenerateText,
		isRegenerateSelected,
		setIsRegenerateSelected,
	} = useChatHistory()
	//const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

	// const handleImageDragStart = (imageUrl: string) => {
	const handleImageDragStart = (imageUrl: string) => {
		setImageSource(imageUrl); // Update the sourceImage in the store
	};
	// const handleImageDragStart = (
	// 	e: React.DragEvent<HTMLImageElement>,
	// 	index: number,
	// ) => {
	// 	e.dataTransfer.setData('index', index.toString());
	// 	setImageSource(imageUrl); // Update the sourceImage in the store
	// };

	const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
		e.preventDefault();
	};

	const handleDrop = (
		e: React.DragEvent<HTMLImageElement>,
		// targetIndex: number,
		imageUrls: string[],
	) => {
		e.preventDefault();
		const sourceIndex = parseInt(e.dataTransfer.getData('index'));
		if (!isNaN(sourceIndex)) {
			const sourceImage = imageUrls[sourceIndex];
			// const targetImage = imageUrls[targetIndex];
			console.log('sourceIndex: ' + sourceIndex);
			console.log('sourceImage: ' + sourceImage);
			// console.log('targetIndex: ' + targetIndex);
			// console.log('targetImage: ' + targetImage);
			console.log('currentSlideIndex is :', currentSlideIndex);
			// if (sourceImage !== undefined && targetImage !== undefined) {
			// 	// Call the updateImgUrlArray function with the dropped image URL
			// 	updateImgUrlArray(currentSlideIndex)(imageUrls, false, {});
			// }
		}
	};

	const addErrorMessage = (content: string): ChatHistory => ({
		role: 'assistant',
		content,
	});

	const addSuccessMessage = (
		content: string | JSX.Element,
		imageUrls?: string[],
	): ChatHistory => ({
		role: 'assistant',
		content,
		imageUrls, // Include imageUrls in the chat history entry
	});

	const addChoicesMessage = (
		chat: string,
		suggestions: string[][],
		selectedSuggestion: number | null
	): ChatHistory => ({
		role: 'assistant',
		content: { chat: chat, suggestions: suggestions, selectedSuggestion: selectedSuggestion } as RegenerateSelection
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
				suggestions: [[suggestion_title,suggestion]],
				selectedSuggestion: index === 'Original' ? index : 0,
			}

			const newChatHistories = [...chatHistory];
			newChatHistories[currentIndex] = {
				...currentEntry,
				content: newContent
			};
			setChatHistory(newChatHistories);
		}
		else{
			console.error('Attempted to update selectedSuggestions on an entry with invalid content type');
		}
		const successMessage = addSuccessMessage(`✅ Replace the text successfully.`)
		addChatHistory(successMessage)
	}

	const regenerateResponseJSX = (
		currentIndex: number,
		chat: string,
		suggestions: string[][],
		selectedSuggestion: number | string | null,
	): JSX.Element => {
		return (
			<div>
				<span>{chat}</span>
				<div className='gap-3 flex flex-col'>
					{suggestions.map((suggestion, index) => (
						selectedSuggestion === null || selectedSuggestion === index ? (
							<button
								key={index}
								disabled={selectedSuggestion !== null}
								onClick={() => handleRegenerateTextClick(currentIndex,suggestion[0],suggestion[1], index)}
								className={`
									gap-3 rounded-lg px-3 py-2 text-left text-xs flex bg-[#EFF4FF] flex flex-col border border-solid border-[#EFF4FF] 
									hover:bg-white
								`}
							>
								<span className='text-gray-700 font-bold'>{index + 1}. {suggestion[0]}</span>
								<span>{suggestion[1]}</span>
							</button>
						) : null
					))}
					{selectedSuggestion === null || selectedSuggestion === 'Original' ? (
						<button
							disabled={selectedSuggestion !== null}
							onClick={() => handleRegenerateTextClick(currentIndex,'Original', regenerateText, 'Original')}
							className={`
								gap-3 rounded-lg px-3 py-2 text-left text-xs flex bg-[#EFF4FF] flex flex-col border border-solid border-[#EFF4FF] 
								hover:bg-white
							`}
						>
							<span className='text-gray-700 font-bold'>Original</span>
							<span>{regenerateText}</span>
						</button>
					) : null}
				</div>
			</div>
		)
	}

	const makeApiCall = async (
		prompt: string,
		prev_prompts: ChatHistory[],
		token: string,
		selected_text: string,
	): Promise<Response> => {
		try {
			return await fetch('/api/ai_gen_slide', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify({
					slide: slides[currentSlideIndex],
					project_id: project?.id || '',
					prompt: prompt,
					prev_prompts: prev_prompts,
					selected_text: selected_text,
				}),
			});
		} catch (error) {
			console.error('Error making API call:', error);
			const errorMessage = addErrorMessage(
				'😞 Sorry, I do not understand your request, can you try again?',
			);
			addChatHistory(errorMessage);
			setLoading(false);
			throw error; // Re-throw the error for the calling function to handle
		}
	};

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
		try {
			setLoading(true)
			const response = await makeApiCall(regenerate_prompt, lastChatMessages, token, regenerateText);
			if (response.ok) {
				const responseData = await response.json();
				console.log('responseData structure:', responseData);
				if (!responseData.data.suggestions && responseData.data.chat) {
					// handle case when response is ok but backend fails to parse suggestion or fails to get result from openai
					const errorMessage = addErrorMessage(responseData.data.chat)
					addChatHistory(errorMessage)
				}
				else {
					const regenerate_choices = addChoicesMessage(responseData.data.chat, responseData.data.suggestions, null)
					addChatHistory(regenerate_choices)
				}
			}
			else {
				console.error('Failed to get AI response');
				const errorMessage = addErrorMessage(
					'😞 Sorry, I do not understand your request, can you try something else?',
				);
				addChatHistory(errorMessage);
			}
		} catch (error) {
			// Error handling is now done in the makeApiCall function
			// No need to duplicate it here
		}
	};
	return (
		<>
			{chatHistory.map((chat, index) => (
				<div
					key={index}
					ref={index === chatHistory.length - 1 ? lastMessageRef : null}
					className={
						chat.role === 'user'
							? 'px-3.5 py-2.5 bg-indigo-500 rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-white gap-2.5 self-end flex flex-wrap max-w-[15rem]'
							: 'px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200 gap-2.5 max-w-[15rem] flex flex-wrap'
					}
				>
					<div
						className={
							chat.role === 'user'
								? 'grow shrink basis-0 text-gray-100 text-base font-normal   text-wrap'
								: 'text-neutral-800 text-base font-normal text-wrap'
						}
					>
						<div className='blue-links'>
							{/* Directly render chat.content if it's a React element */}
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
										className='image-preview-container'
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

						{/* Check if there are imageUrls and render image previews */}
						{/* {chat.imageUrls && chat.imageUrls.length > 0 && (
							<div
								className='flex flex-wrap gap-2 mt-2'
								style={{ width: '100%' }}
							>
								{chat.imageUrls.map((imageUrl, i) => (
									<div
										key={i}
										className='image-preview-container'
										style={{
											width: 'calc(50% - 4px)',
											marginBottom: '4px',
											position: 'relative', // Set position to relative
											paddingTop: '100%', // Set aspect ratio (1:1 for square)
										}}
										draggable // Make the image container draggable
										onDragStart={() => handleImageDragStart(imageUrl)} // Call handleImageDragStart with imageUrl
									>
										<img
											src={imageUrl}
											alt={`Image ${i + 1}`}
											style={{
												position: 'absolute', // Set position to absolute
												top: 0,
												left: 0,
												width: '100%',
												height: '100%',
												objectFit: 'cover', // Cover the container without distortion
											}}
										/>
									</div>
								))}
							</div>
						)} */}
					</div>
				</div>
			))}
		</>
	);
};

interface AIAssistantChatWindowProps {
	onToggle: () => void;
	slides: Slide[];
	currentSlideIndex: number;
	updateSlidePage: Function;
	updateImgUrlArray: Function;
}

export const AIAssistantChatWindow: React.FC<AIAssistantChatWindowProps> = ({
	onToggle,
	slides,
	currentSlideIndex,
	updateSlidePage,
	updateImgUrlArray,
}) => {
	// const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
	// const toggleChatWindow = () => {
	// 	setIsChatWindowOpen(!isChatWindowOpen);
	// };
	// fixed right-0 top-[5rem]
	const [userInput, setUserInput] = useState('');
	const { chatHistory, addChatHistory, clearChatHistory, chatHistoryStatus } =
		useChatHistory();
	const { updateVersion, setSlides, setSlideIndex } = useSlides();
	const [loading, setLoading] = useState(false);
	const { token } = useUser();
	const lastMessageRef = useRef<HTMLDivElement>(null); // Ensure you have a ref for the last message
	const { project } = useProject();
	const chatWindowRef = useRef<HTMLDivElement>(null);

	const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevents the newline character in the input field
			handleSend();
		}
	};

	useEffect(() => {
		chatWindowRef.current?.addEventListener('keydown', stopArrowKeyPropagation);
		return () => {
			chatWindowRef.current?.removeEventListener('keydown', stopArrowKeyPropagation);
		};
	}, []);

	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = e.target;
		setUserInput(textarea.value);

		// Automatically adjust the height to fit the content
		textarea.style.height = 'auto'; // Reset height to recalculate
		const newHeight = Math.min(textarea.scrollHeight, 100);
		textarea.style.height = `${newHeight}px`;
	};

	const updateUserMessage = (content: string): ChatHistory => ({
		role: 'user',
		content,
	});

	const addSuccessMessage = (
		content: string | JSX.Element,
		imageUrls?: string[],
	): ChatHistory => ({
		role: 'assistant',
		content,
		imageUrls, // Include imageUrls in the chat history entry
	});

	const addErrorMessage = (content: string): ChatHistory => ({
		role: 'assistant',
		content,
	});

	const makeApiCall = async (
		prompt: string,
		prev_prompts: ChatHistory[],
		token: string,
	): Promise<Response> => {
		try {
			return await fetch('/api/ai_gen_slide', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify({
					slide: slides[currentSlideIndex],
					project_id: project?.id || '',
					prompt: prompt,
					prev_prompts: prev_prompts,
				}),
			});
		} catch (error) {
			console.error('Error making API call:', error);
			const errorMessage = addErrorMessage(
				'😞 Sorry, I do not understand your request, can you try again?',
			);
			addChatHistory(errorMessage);
			setLoading(false);
			throw error; // Re-throw the error for the calling function to handle
		}
	};

	const handleSend = async (extraInput?: string) => {
		console.log(
			'Sending request with userInput:',
			userInput,
			'extraInput:',
			extraInput,
		);
		const inputToSend =
			extraInput !== undefined ? String(extraInput) : userInput;

		if (inputToSend.trim() === '') return;

		// Update chat history with user's message
		const newUserMessage = updateUserMessage(inputToSend);
		addChatHistory(newUserMessage);

		// Clear user input after sending
		setUserInput('');

		// Get up to 3 previous chat messages, only keep role and content
		const lastChatMessages = chatHistory
			.slice(-3)
			.map((chat) => ({ role: chat.role, content: chat.content }));

		try {
			setLoading(true);

			const response = await makeApiCall(inputToSend, lastChatMessages, token);

			setLoading(false);

			if (response.ok) {
				const responseData = await response.json();

				console.log('responseData structure:', responseData);
				// If the slide is updated, add a success message
				if (responseData.data.slide) {
					// Update the slide at the current index with new data
					console.log(
						'updateSlide content after api call:',
						responseData.data.slide,
					);

					if (responseData.data.action === 'add_page') {
						const newSlide = { ...slides[currentSlideIndex], ...responseData.data.slide, layout: 'Col_1_img_0_layout', images: [] };

						// insert the newSlide after the currentSlideIndex
						setSlides((prevSlides) => {
							const newSlides = [...prevSlides];
							newSlides.splice(currentSlideIndex + 1, 0, newSlide);
							return newSlides;
						});
						setSlideIndex(currentSlideIndex + 1);
					} else {
						// Update state with the new slides
						updateSlidePage(currentSlideIndex, responseData.data.slide);
						updateVersion(); // force rerender when version changes and index does not change
					}
				}

				else if (responseData.data.action) {  // not add_page action with slide 
					// send this as a document signal
					console.log('action:', responseData.data.action);
					document.dispatchEvent(new Event(responseData.data.action));
				}

				// Update chat history with AI's response
				const newAIMessage = addSuccessMessage(
					`${responseData.data.chat}`,
					responseData.data.images, // Include imageUrls in the chat history entry
				);
				addChatHistory(newAIMessage);
			} else {
				console.error('Failed to get AI response');
				const errorMessage = addErrorMessage(
					'😞 Sorry, I do not understand your request, can you try something else?',
				);
				addChatHistory(errorMessage);
			}
		} catch (error) {
			// Error handling is now done in the makeApiCall function
			// No need to duplicate it here
		}
	};

	useEffect(() => {
		if (chatHistoryStatus == ChatHistoryStatus.Inited)
			console.log('chatHistory:', chatHistory);
	}, [chatHistoryStatus]);

	return (
		<section
			className={`hidden sm:flex sm:flex-col sm:fixed xl:relative sm:bottom-0 sm:right-0 sm:w-[20rem] sm:h-[30rem] xl:h-full bg-white rounded-lg sm:items-center border border-2 border-gray-200`}
			ref={chatWindowRef}
		>
			{/* title and exit button */}
			<div className='flex flex-row w-full justify-between items-center h-[5rem] p-2'>
				{/* drlambda.ai title */}
				<div className='flex flex-row items-center gap-4'>
					<Image
						src={DrlambdaCartoonImage}
						alt={'DrLambdaAIAssistantImage'}
						className='w-[1.75rem] h-[2.15rem]'
					></Image>
					<div className='text-neutral-900 text-sm font-semibold font-inter'>
						DrLambda
					</div>
					{/* Round dot */}
					{/* <div className='w-2 h-2 bg-[#0B84FF] rounded-full'></div> */}
				</div>

				<div className='flex flex-row gap-2'>
					{/* Clear Chat button */}
					<button onClick={() => clearChatHistory()}>
						<DeleteIcon />
					</button>

					{/* exit button */}
					<button onClick={onToggle}>
						<FaTimes color='#5168F6' />
					</button>
				</div>
			</div>

			{/* chat history text area */}
			<div className='w-full h-full border-t-2 border-gray-300 overflow-y-scroll p-2 flex flex-col flex-grow'>
				<ScrollBar
					axial='y'
					index={chatHistory.length}
					currentElementRef={lastMessageRef}
				>
					{/* welcoming text */}
					<div className='px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200 justify-center items-center gap-2.5 inline-flex'>
						<div className='max-w-[15rem] text-neutral-800 text-base font-normal tracking-tight'>
							Welcome to DrLambda! I'm your AI assistant, ready to help with
							slide design 🎨, content ideas ✍️, data organization 📊,
							proofreading, and updating. Just type your request here!
						</div>
					</div>
					{/* chat history render */}
					<Chats
						chatHistory={chatHistory}
						lastMessageRef={lastMessageRef}
						addChatHistory={addChatHistory}
						updateImgUrlArray={updateImgUrlArray}
						slides={slides}
						currentSlideIndex={currentSlideIndex}
						updateSlidePage={updateSlidePage}
					></Chats>

					{loading && (
						<div className='px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200  gap-2.5 max-w-[15rem] flex flex-wrap'>
							<div
								className='animate-pulse text-neutral-800 text-base font-normal   text-wrap'
								ref={loading ? lastMessageRef : null}
							>
								🤔 I am thinking...
							</div>
						</div>
					)}
				</ScrollBar>
			</div>
			{/* suggestions */}
			{/* input area */}
			<div className='w-full border-t border-gray-200 border-t-2'>
				{!userInput && !loading && (
					<ChatSuggestions
						isCover={currentSlideIndex === 0}
						sendChat={handleSend}
					/>
				)}
				<div className='flex flex-row justify-between p-2 items-center gap-4'>
					<textarea
						value={userInput}
						className='w-full border-0 focus:outline-none focus:ring-0 resize-none overflow-y-scroll'
						onChange={handleInputChange}
						onKeyDown={handleEnter}
						style={{ minHeight: '32px' }} // Set minimum height to resemble input field
						placeholder='Start here...'
					/>

					{/* send text, call api to get response */}
					<button onClick={() => handleSend()} disabled={loading}>
						<IoSend
							fill={!loading ? '#2943E9' : '#E5E7EB'}
							className='w-7 h-7'
						/>
					</button>
				</div>
			</div>
		</section>
	);
};
