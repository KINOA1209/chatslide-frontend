'use client';
import { ChatHistoryStatus, useChatHistory } from '@/hooks/use-chat-history';
import { useSlides } from '@/hooks/use-slides';
import { useUser } from '@/hooks/use-user';
import ChatHistory from '@/models/ChatHistory';
import Slide from '@/models/Slide';
import DrlambdaCartoonImage from '@/public/images/AIAssistant/DrLambdaCartoon.png';
import Image from 'next/image';
import { useEffect, useState, useRef, use, ChangeEvent } from 'react';
import { IoSend } from 'react-icons/io5';
import { DeleteIcon } from '@/app/(feature)/icons';
import { FaTimes } from 'react-icons/fa';
import { ScrollBar } from '../ui/ScrollBar';
import { useProject } from '@/hooks/use-project';
import ChatSuggestions from '../language/ChatSuggestions';
import { stopArrowKeyPropagation } from '@/utils/editing';
import './ChatBot.css';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { getBrand, getLogoUrl, isChatslide } from '@/utils/getHost';
import Chats from './Chats';
import ChatBotService from '@/services/ChatBotService';
import { GrayLabel } from '../ui/GrayLabel';
import { BigTitle, Explanation, SmallTitle, SuccessMessage, WarningMessage } from '../ui/Text';
import GPTToggle from '../button/WorkflowGPTToggle';
import { WritableDraft } from '@/types/immer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
} from '@mui/material';

const SearchOnlineEngine = ['none', 'google', 'bing', 'wikipedia', 'news'] as const;
type SearchOnlineType = (typeof SearchOnlineEngine)[number];

export const AIAssistantIcon: React.FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	return (
		<div
			className='rounded-md p-2 bg-white border border-gray-200 border-2 flex items-center justify-center relative'
			onClick={onClick}
		// style={{ animation: 'pulse 0.5s infinite' }}
		>
			{isChatslide() ? (
				<Image
					src={getLogoUrl()}
					alt={'AIAssistantImage'}
					className='w-[2rem] h-[2rem]'
					width={32}
					height={32}
				/>
			) : (
				<Image
					src={DrlambdaCartoonImage}
					alt={'AIAssistantImage'}
					className='w-[1.75rem] h-[2rem]'
					width={28}
					height={32}
				/>
			)}
		</div>
	);
};

interface AIAssistantChatWindowProps {
	onToggle?: () => void;
	slides: Slide[];
	currentSlideIndex: number;
	updateSlidePage?: Function;
	type?: 'script' | 'slide' | 'chart';
	updateChartUrl?: (url: string) => void; // for image chart type
	updateDynamicChart?: (data: any) => void; // for dynamic chart type
}

export const AIAssistantChatWindow: React.FC<AIAssistantChatWindowProps> = ({
	onToggle,
	slides,
	currentSlideIndex,
	updateSlidePage,
	type = 'slide',
	updateChartUrl,
	updateDynamicChart,
}) => {
	const [userInput, setUserInput] = useState('');
	const { chatHistory, addChatHistory, clearChatHistory, chatHistoryStatus } =
		useChatHistory();
	const { updateVersion, setSlides, setSlideIndex, slideIndex } = useSlides();
	const [loading, setLoading] = useState(false);
	const { token, updateCreditsFE, isPaidUser } = useUser();
	const lastMessageRef = useRef<HTMLDivElement>(null); // Ensure you have a ref for the last message
	const { project } = useProject();
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const [model, setModel] = useState(type === 'chart' ? 'GPT-4o' : 'GPT-3.5');
	const [search_online, setSearchOnline] = useState<SearchOnlineType>('google');

	const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevents the newline character in the input field
			handleSend();
		}
	};

	useEffect(() => {
		chatWindowRef.current?.addEventListener('keydown', stopArrowKeyPropagation);
		return () => {
			chatWindowRef.current?.removeEventListener(
				'keydown',
				stopArrowKeyPropagation,
			);
		};
	}, []);

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

	const handleSend = async (extraInput?: string) => {
		console.log(
			'Sending request with userInput:',
			userInput,
			'extraInput:',
			extraInput,
		);

		if (model === 'GPT-4o') {
			const remainingCredits = updateCreditsFE(-5);
			if (remainingCredits < 0) {
				addChatHistory(
					addErrorMessage(
						'😞 Sorry, you have run out of credits. Please upgrade to continue using the AI assistant.',
					),
				);
				return;
			}
		}

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

			const response =
				type === 'chart'
					? await ChatBotService.chatChart(
						inputToSend,
						lastChatMessages,
						token,
						model === 'GPT-3.5' ? 'gpt-3.5-turbo' : 'gpt-4o',
						updateDynamicChart ? 'json' : 'img',
						search_online === 'none' ? '' : search_online,
						project?.id || '',
					)
					: await ChatBotService.chat(
						inputToSend,
						lastChatMessages,
						token,
						slides[currentSlideIndex],
						project?.id || '',
						slideIndex,
						undefined, // selectedText
						type,
						model === 'GPT-3.5' ? 'gpt-3.5-turbo' : 'gpt-4o',
					);

			setLoading(false);

			console.log('responseData structure:', response);

			if (response.slide) {
				console.log('updateSlide content after api call:', response.slide);

				if (response.action === 'add_page') {
					const newSlide = {
						...slides[currentSlideIndex],
						...response.slide,
						layout: 'Col_1_img_0_layout',
						images: [],
					} as Slide;

					setSlides((prevSlides: WritableDraft<Slide>[]) => {
						const newSlides = [...prevSlides];
						newSlides.splice(
							currentSlideIndex + 1,
							0,
							newSlide as WritableDraft<Slide>,
						);
						return newSlides;
					});
					setSlideIndex(currentSlideIndex + 1);
				} else {
					let content = response.slide.content;

					if (content.length >= 6 && JSON.stringify(content).length > 600) {
						const mid = Math.floor(content.length / 2);
						const slidePage1 = {
							...slides[currentSlideIndex],
							...response.slide,
							content: content.slice(0, mid),
						};
						const slidePage2 = {
							...slides[currentSlideIndex],
							...response.slide,
							content: content.slice(mid),
						};
						setSlides((prevSlides) => {
							const newSlides = [...prevSlides];
							newSlides.splice(
								currentSlideIndex,
								1,
								slidePage1 as WritableDraft<Slide>,
								slidePage2 as WritableDraft<Slide>,
							);
							return newSlides;
						});
						setSlideIndex(currentSlideIndex + 1);
						addChatHistory(
							addSuccessMessage(
								'📄 Because of too much content on one page, I have split the content into two pages.',
							),
						);
					} else {
						updateSlidePage &&
							updateSlidePage(currentSlideIndex, response.slide);
						updateVersion();
					}
				}
			} else if (response.action) {
				let action = response.action;
				if (action === 'upload_background') {
					action = 'change_logo';
				}
				if (action === 'change_font') {
					action = 'change_template';
				}
				document.dispatchEvent(new Event(action));
			}

			if (type === 'chart' && updateChartUrl) {
				if (response?.images && response.images.length > 0)
					updateChartUrl(response.images[0]);
			} else if (type === 'chart' && updateDynamicChart) {
				updateDynamicChart(response.chartData);
			}

			addChatHistory(addSuccessMessage(response.chat, response.images));
		} catch (error) {
			console.error('Failed to get AI response');
			const errorMessage = addErrorMessage(
				'😞 Sorry, I do not understand your request, can you try something else?',
			);
			addChatHistory(errorMessage);
		}
	};

	useEffect(() => {
		if (chatHistoryStatus == ChatHistoryStatus.Inited)
			console.log('chatHistory:', chatHistory);
	}, [chatHistoryStatus]);

	const pos =
		type === 'slide'
			? 'sm:fixed xl:relative sm:bottom-0 sm:right-0 sm:z-50 sm:w-[20rem] sm:h-[30rem] xl:h-full'
			: 'sm:relative sm:w-[20rem] sm:h-full';

	const handleSelectEngine = (e: SelectChangeEvent<SearchOnlineType>) => {
		if (
			e.target.value === 'none' ||
			e.target.value === 'google' ||
			e.target.value === 'bing' ||
			e.target.value === 'wikipedia' ||
			e.target.value === 'news'
		) {
			setSearchOnline(e.target.value);
		}
	};

	return (
		<section
			className={`hidden sm:flex ${pos} sm:flex-col bg-white rounded-lg sm:items-center border border-2 border-gray-200`}
			ref={chatWindowRef}
		>
			{/* title and exit button */}
			<div className='flex flex-row w-full justify-between items-center h-[5rem] p-2'>
				{/* drlambda.ai title */}
				<div className='flex flex-row items-center gap-4'>
					<Image
						src={DrlambdaCartoonImage}
						alt={'AIAssistantImage'}
						className='w-[1.75rem] h-[2.15rem]'
					></Image>
					<div className='text-neutral-900 text-sm font-semibold font-inter'>
						{getBrand()}
					</div>
					{/* Round dot */}
					{/* <div className='w-2 h-2 bg-[#0B84FF] rounded-full'></div> */}
				</div>

				<div className='flex flex-row gap-2'>
					{/* {type !== 'slide' && <GrayLabel>Beta</GrayLabel>} */}

					{/* Clear Chat button */}
					<button onClick={() => clearChatHistory()}>
						<DeleteIcon />
					</button>

					{/* exit button */}
					{onToggle && (
						<button onClick={onToggle}>
							<FaTimes color='#5168F6' />
						</button>
					)}
				</div>
			</div>

			{/* GPT version */}
			<div className='w-full p-2 border-t-1 border-b-1 border-gray-200 flex flex-col items-center'>
				<GPTToggle model={model} setModel={setModel} small />
				{model === 'GPT-4o' ? (
					<Explanation>Powerful, 5⭐️ per chat.</Explanation>
				) : (
					<Explanation>Fast, no credit cost.</Explanation>
				)}
			</div>

			{type === 'chart' && (
				<div id='search-engine' className='w-full p-2 border-t-2 border-gray-300 flex flex-col justify-center'>
					<SmallTitle>Search Engine</SmallTitle>
					<FormControl sx={{ minWidth: 200 }} size='small'>
						<Select
							id='search-engine-select'
							value={search_online}
							autoWidth
							onChange={handleSelectEngine}
						>
							{SearchOnlineEngine.map((engine) => (
								<MenuItem key={engine} value={engine}>
									{engine === 'none' ? (
										<em>None</em>
									) : (
										engine.charAt(0).toUpperCase() + engine.slice(1)
									)}
								</MenuItem>
							))}
						</Select>
						<FormHelperText>
							<span className='text-red-500 font-bold'>NEW!</span> Use web
							search for more accurate data
						</FormHelperText>
					</FormControl>
				</div>
			)}
			{/* chat history text area */}
			<div id='chat-history' className='w-full h-full border-t-2 border-gray-300 overflow-y-hidden px-1 flex flex-col flex-grow'>
				<ScrollBar
					axial='y'
					index={chatHistory.length}
					currentElementRef={lastMessageRef}
				>
					{/* welcoming text */}
					<div className='px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200 justify-center items-center gap-2.5 inline-flex'>
						<div className='max-w-[15rem] text-neutral-800 text-base font-normal tracking-tight'>
							{type === 'slide' ? (
								<span>
									Welcome to {getBrand()}! I'm your AI assistant, ready to help
									with slide design 🎨, content ideas ✍️, data organization 📊,
									proofreading, and updating. Just type your request here!
								</span>
							) : type === 'script' ? (
								<span>
									Welcome to {getBrand()}! I'm your AI assistant, ready to help
									with script writing 📝, content ideas ✍️, translation 🌐, etc.
								</span>
							) : (
								<>
									<span>
										Welcome to {getBrand()}! I'm your AI assistant, ready to
										help with creating charts 📈.
									</span>
								</>
							)}
						</div>
					</div>
					{/* chat history render */}
					<Chats
						chatHistory={chatHistory}
						lastMessageRef={lastMessageRef}
						addChatHistory={addChatHistory}
						slides={slides}
						currentSlideIndex={currentSlideIndex}
					></Chats>

					{loading && (
						<div className='px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200  gap-2.5 max-w-[15rem] flex flex-wrap'>
							{/* <div
								className='animate-pulse text-neutral-800 text-base font-normal   text-wrap'
								ref={loading ? lastMessageRef : null}
							>
								🤔 I am thinking...
							</div> */}
							<Image
								src='/images/drlambda-thinking.gif'
								alt='thinking'
								width={50}
								height={50}
							/>
						</div>
					)}
				</ScrollBar>
			</div>
			{/* suggestions */}
			{/* input area */}
			<div className='w-full border-t border-gray-200 border-t-2'>
				{!userInput && !loading && (
					<ChatSuggestions
						type={
							type === 'slide'
								? currentSlideIndex === 0
									? 'cover'
									: 'noncover'
								: type
						}
						sendChat={handleSend}
					/>
				)}
				<div className='flex flex-row justify-between p-2 items-center gap-4'>
					<TextareaAutosize
						value={userInput}
						className='w-full max-h-[30rem] border-0 focus:outline-none focus:ring-0 resize-none'
						onChange={(e: any) => setUserInput(e.target.value)}
						onKeyDown={handleEnter}
						placeholder='Start here...'
					/>

					{/* send text, call api to get response */}
					<button onClick={() => handleSend()} disabled={loading}>
						<IoSend
							fill={!loading ? '#5168f6' : '#E5E7EB'}
							className='w-7 h-7'
						/>
					</button>
				</div>
			</div>
		</section>
	);
};
