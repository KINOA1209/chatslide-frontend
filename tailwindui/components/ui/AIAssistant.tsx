'use client';
import DrlambdaCartoonImage from '@/public/images/AIAssistant/DrLambdaCartoon.png';
import sendTextButtonImage from '@/public/images/AIAssistant/sendTextIcon.png';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const DrLambdaAIAssistantIcon: React.FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	return (
		<div
			className='w-14 h-14 bg-neutral-50 rounded-[50%] shadow border border-black border-opacity-20 z-50 flex items-center justify-center relative'
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

interface AIAssistantChatWindowProps {
	onToggle: () => void;
}
export const AIAssistantChatWindow: React.FC<AIAssistantChatWindowProps> = ({
	onToggle,
}) => {
	// const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
	// const toggleChatWindow = () => {
	// 	setIsChatWindowOpen(!isChatWindowOpen);
	// };
	// fixed right-0 top-[5rem]
	return (
		<section
			className={`max-[1920px]:fixed right-0 top-[10rem] h-[40rem] sm:flex sm:flex-col sm:items-center sm:justify-between z-50 shadow-md bg-white`}
			style={{
				boxShadow:
					'-4px 0 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)',
			}}
		>
			{/* title and exit button */}
			<div className='flex flex-row justify-between items-center px-[0.5rem] w-[20rem] h-[5rem] pb-2'>
				{/* drlambda.ai title */}
				<div className='flex flex-row items-center gap-4'>
					<Image
						src={DrlambdaCartoonImage}
						alt={'DrLambdaAIAssistantImage'}
						className='w-[1.75rem] h-[2.15rem]'
					></Image>
					<div className='text-neutral-900 text-sm font-semibold font-inter'>
						DrLambda.AI
					</div>
					{/* Round dot */}
					<div className='w-2 h-2 bg-[#0B84FF] rounded-full'></div>
				</div>

				{/* exit button */}
				<button
					style={{
						width: '1.25rem',
						height: '1.25rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						cursor: 'pointer',
					}}
					onClick={onToggle}
				>
					<AiOutlineClose color='#5168F6' />
				</button>
			</div>

			{/* chat history text */}
			<div className='h-full w-full border-t-2 border-gray-300 overflow-y-scroll px-2 py-1 font-creato-medium flex flex-col justify-end '>
				{/* welcoming text and options */}
				<div className='flex flex-col items-start gap-3'>
					<div className='px-3.5 py-2.5 bg-indigo-50 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-white justify-center items-center gap-2.5 inline-flex'>
						<div className='w-[18rem] text-neutral-800 text-base font-normal font-creato-medium tracking-tight'>
							Welcome to Dr. Lambda! I'm your AI assistant, ready to help with
							slide design, content ideas, data organization, proofreading, and
							updating. Just type your request, and let's create amazing slides
							together! 🚀📊🎨
						</div>
					</div>
					<div className='flex-col justify-center items-start gap-2 flex'>
						<div className='text-neutral-800 text-sm font-normal font-creato-medium'>
							Here are some ways I can help:
						</div>
						<div className='self-stretch h-40 flex-col justify-start items-start gap-2 inline-flex'>
							<div className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex'>
								<div className='w-56 text-blue-700 text-sm font-normal font-creato-medium'>
									Add another slide
								</div>
							</div>
							<div className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex'>
								<div className='w-56 text-blue-700 text-sm font-normal font-creato-medium'>
									Format this as a table
								</div>
							</div>
							<div className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex'>
								<div className='w-56 text-blue-700 text-sm font-normal font-creato-medium'>
									Make this sound more professional
								</div>
							</div>
							<div className='self-stretch px-4 py-2 bg-white rounded-lg border border-black border-opacity-20 justify-between items-start inline-flex'>
								<div className='w-56 text-blue-700 text-sm font-normal font-creato-medium'>
									Underline all the nouns
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* input area */}
			<div className='h-[5rem] w-full'>
				<div className='flex flex-row justify-between py-3 px-2 items-center'>
					{/* input area */}
					<input
						type='input'
						className='px-2 py-1 w-64 bg-zinc-100 rounded-3xl'
					/>

					<button className='w-7 h-7'>
						<Image
							src={sendTextButtonImage}
							alt={'sendText'}
							className='h-full'
						></Image>
					</button>
				</div>
			</div>
		</section>
	);
};
