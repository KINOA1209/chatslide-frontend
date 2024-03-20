'use client';
import { ChatHistoryStatus, useChatHistory } from '@/hooks/use-chat-history';
import { useSlides } from '@/hooks/use-slides';
import { useUser } from '@/hooks/use-user';
import ChatHistory from '@/models/ChatHistory';
import Slide from '@/models/Slide';
import DrlambdaCartoonImage from '@/public/images/AIAssistant/DrLambdaCartoon.png';
import Image from 'next/image';
import { useEffect, useState, useRef, use } from 'react';
import { InputBox } from './InputBox';
import { IoSend, IoSendOutline } from 'react-icons/io5';
import { DeleteIcon } from '@/app/(feature)/icons';
import { FaTimes } from 'react-icons/fa';
import { ScrollBar } from './ScrollBar';
import { useProject } from '@/hooks/use-project';
import { useImageStore } from '@/hooks/use-img-store';
export const DrLambdaAIAssistantIcon: React.FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	return (
		<div
			className='w-14 h-14 bg-neutral-50 rounded-[50%] shadow border border-black border-opacity-20 z-40 flex items-center justify-center relative'
			onClick={onClick}
			// style={{ animation: 'pulse 0.5s infinite' }}
		>
			<div className='absolute inset-0 bg-gradient-to-b from-[#0B84FF] via-[#0B84FF] to-transparent rounded-[50%] opacity-0 animate-pulse'></div>
			<Image
				src={DrlambdaCartoonImage}
				alt={'DrLambdaAIAssistantImage'}
				className='w-[1.75rem] h-[2.15rem] z-10'
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

	return (
		<>
			{chatHistory.map((chat, index) => (
				<div
					key={index}
					ref={index === chatHistory.length - 1 ? lastMessageRef : null}
					className={
						chat.role === 'user'
							? 'px-3.5 py-2.5 bg-indigo-500 rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-white gap-2.5 self-end flex flex-wrap max-w-[15rem]'
							: 'px-3.5 py-2.5 bg-indigo-50 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-white gap-2.5 max-w-[15rem] flex flex-wrap'
					}
				>
					<div
						className={
							chat.role === 'user'
								? 'grow shrink basis-0 text-gray-100 text-base font-normal   text-wrap'
								: 'text-neutral-800 text-base font-normal   text-wrap'
						}
					>
						{chat.content}
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
											style={{ width: '100%', height: 'auto' }}
										/>
									</div>
								))}
							</div>
						)}
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
	const { updateVersion, slideIndex } = useSlides();
	const [loading, setLoading] = useState(false);
	const { token } = useUser();
	const lastMessageRef = useRef<HTMLDivElement>(null); // Ensure you have a ref for the last message
	const { project } = useProject();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevents the newline character in the input field
			handleSend();
		}
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

		try {
			setLoading(true);

			const response = await makeApiCall(inputToSend, token);

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

					// Update state with the new slides
					updateSlidePage(currentSlideIndex, responseData.data.slide);
					updateVersion(); // force rerender when version changes and index does not change

					// Add success message to chat history
					const successMessage = addSuccessMessage(
						'✅ I updated the current slide for you.',
					);
					addChatHistory(successMessage);
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
      className={`hidden sm:flex sm:flex-col sm:fixed xl:relative sm:bottom-0 sm:right-0 sm:w-[15rem] sm:h-[30rem] xl:h-full xl:w-full bg-white rounded-lg sm:items-center border border-2 border-gray-200`}
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
					<div className='px-3.5 py-2.5 bg-indigo-50 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-white justify-center items-center gap-2.5 inline-flex'>
						<div className='max-w-[15rem] text-neutral-800 text-base font-normal tracking-tight'>
							Welcome to DrLambda! I'm your AI assistant, ready to help with
							slide design 🎨, content ideas ✍️, data organization 📊,
							proofreading, and updating. Just type your request here!
						</div>
					</div>
					{/* welcoming options */}
					<div className='flex-col justify-center items-start gap-2 flex shrink'>
						<div className='text-neutral-800 text-sm font-normal  '>
							Here are some ways I can help:
						</div>
						<div className='self-stretch flex-col justify-start items-start gap-2 inline-flex'>
							{slideIndex == 0 ? (
								<>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() =>
											handleSend('Change topic to be more engaging')
										}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Change topic to be more engaging
										</div>
									</div>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() => handleSend('Translate topic to Spanish')}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Translate topic to Spanish
										</div>
									</div>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() => handleSend('Change the image on the slide')}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Change the image on the slide
										</div>
									</div>
								</>
							) : (
								<>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() => handleSend('Add data to the content')}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Add data to the content
										</div>
									</div>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() => handleSend('Change the image on the slide')}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Change the image on the slide
										</div>
									</div>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() =>
											handleSend('Change subtopic to be more engaging')
										}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Change subtopic to be more engaging
										</div>
									</div>
									<div
										className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex cursor-pointer'
										onClick={() => handleSend('Add an example to the content')}
									>
										<div className='max-w-[15rem] text-blue-700 text-sm font-normal'>
											Add an example to the content
										</div>
									</div>
								</>
							)}
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
						<div className='px-3.5 py-2.5 bg-indigo-50 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-white  gap-2.5 max-w-[15rem] flex flex-wrap'>
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
			{/* input area */}
			<div className='w-full bg-blue-100'>
				<div className='flex flex-row justify-between py-3 px-4 items-center gap-4'>
					{/* input area */}
					<InputBox>
						<input
							type='input'
							value={userInput}
							className='w-full border-0 focus:outline-none focus:ring-0 bg-gray-100'
							onChange={(e) => setUserInput(e.target.value)}
							onKeyDown={handleKeyDown} // Add the event listener for Enter key
						/>
					</InputBox>

					{/* send text, call api to get response */}
					<button onClick={() => handleSend()}>
						<IoSend fill='#2943E9' className='w-7 h-7' />
					</button>
				</div>
			</div>
		</section>
	);
};
